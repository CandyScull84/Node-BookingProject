const Booking = require('../models/Booking');
const { getIo } = require('../utils/socket');
const Rooms = require('../models/Rooms');

const getBooking = async (req, res) => {
  console.log('Användare som försöker boka:', req.user);

  try {
    const query = req.user.role === 'Admin' ? {} : { userId: req.user.id };
    const bookings = await Booking.find(query).populate('roomId');

    const bookingsWithPrice = bookings.map(booking => {
      const room = booking.roomId;
      let totalPrice = 0;

      if (!room) return booking;

      if (['Single', 'Double', 'Suite'].includes(room.type) && booking.startDate && booking.endDate) {
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        totalPrice = room.pricePerNight * nights;
      }

      if (room.type === 'Conference' && booking.startTime && booking.endTime) {
        const start = parseInt(booking.startTime.split(':')[0], 10);
        const end = parseInt(booking.endTime.split(':')[0], 10);
        const hours = end - start;
        totalPrice = room.pricePerHour * hours;
      }

      return {
        ...booking.toObject(),
        totalPrice
      };
    });

    res.json(bookingsWithPrice);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta bokningar' });
  }
};

const createBooking = async (req, res) => {
  console.log('POST /api/booking körs');
  console.log('Innehåll i req.body:', req.body);
  console.log('Inloggad användare:', req.user);

  try {
    const { roomId, startDate, endDate, guests, date, startTime, endTime } = req.body;

    const room = await Rooms.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Rummet kunde inte hittas' });
    }

    if (guests > room.capacity) {
      return res.status(400).json({ error: `Rummet rymmer max ${room.capacity} personer` });
    }

    const bookingData = {
      roomId,
      userId: req.user.id,
      guests
    };

    let totalPrice = 0;

    if (['Single', 'Double', 'Suite'].includes(room.type)) {
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start- och slutdatum krävs för hotellbokning' });
      }

      const overlapping = await Booking.findOne({
        roomId,
        startDate: { $lte: endDate },
        endDate: { $gte: startDate }
      });
      if (overlapping) {
        return res.status(400).json({ error: 'Rummet är redan bokat för den valda perioden' });
      }

      bookingData.startDate = startDate;
      bookingData.endDate = endDate;

      const start = new Date(startDate);
      const end = new Date(endDate);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      totalPrice = room.pricePerNight * nights;

    } else if (room.type === 'Conference') {
      if (!date || !startTime || !endTime) {
        return res.status(400).json({ error: 'Datum + Start- och sluttid krävs för konferensrum' });
      }

      if (startTime >= endTime) {
        return res.status(400).json({ error: 'Ogiltig tidsintervall' });
      }

      const overlapping = await Booking.findOne({
        roomId,
        date,
        $or: [
          { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
        ]
      });
      if (overlapping) {
        return res.status(400).json({ error: 'Rummet är redan bokat för den valda tiden' });
      }

      bookingData.date = date;
      bookingData.startTime = startTime;
      bookingData.endTime = endTime;

      const start = parseInt(startTime.split(':')[0], 10);
      const end = parseInt(endTime.split(':')[0], 10);
      const hours = end - start;
      totalPrice = room.pricePerHour * hours;
    } else {
      return res.status(400).json({ error: 'Bokningen måste vara antingen hotell eller konferens' });
    }

    const booking = new Booking(bookingData);
    await booking.save();

    const io = getIo();
    io.emit('bookingCreated', {
      userId: req.user.id,
      roomId,
      type: room.type,
      ...( ['Single', 'Double', 'Suite'].includes(room.type) && { startDate, endDate }),
      ...( room.type === 'Conference' && { date, startTime, endTime })
    });

    res.status(201).json({ booking, totalPrice });

  } catch (err) {
    console.error('❌ Fel vid skapande av bokning:', err);
    res.status(400).json({ error: 'Kunde inte skapa bokning', details: err.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Bokning hittades inte' });

    if (booking.userId.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'Du får inte ändra denna bokning' });
    }

    booking.startDate = req.body.startDate;
    booking.endDate = req.body.endDate;
    await booking.save();

    const io = getIo();
    io.emit('bookingUpdated', { bookingId: booking._id, updatedBy: req.user.username });

    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: 'Kunde inte uppdatera bokning', details: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Bokning hittades inte' });

    if (booking.userId.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'Du får inte ta bort denna bokning' });
    }
    await booking.deleteOne();

    const io = getIo();
    io.emit('bookingDeleted', { bookingId: booking._id, deletedBy: req.user.username });

    res.json({ message: 'Bokning borttagen' });
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte ta bort bokning', details: err.message });
  }
};

module.exports = { getBooking, createBooking, updateBooking, deleteBooking };
