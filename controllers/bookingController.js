const Booking = require('../models/Booking');
const {getIo}  = require('../utils/socket');
const Rooms = require('../models/Rooms');

const getBooking = async (req, res) => {
  console.log('Användare som försöker boka:', req.user);

  try {
    const query = req.user.role === 'Admin' ? {} : { userId: req.user.id };
    const bookings = await Booking.find(query).populate('roomId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta bokningar' });
  }
};

const createBooking = async (req, res) => {
  console.log('📦 POST /api/booking körs');
  console.log('🧾 Innehåll i req.body:', req.body);
  console.log('🔐 Inloggad användare:', req.user);

  try {
    const { roomId, startDate, endDate, guests, date, startTime, endTime } = req.body;

    const room = await Rooms.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Rummet kunde inte hittas' });
    }
    
    if (guests > room.capacity) {
      return res.status(400).json({ error: `Rummet rymmer max ${room.capacity} personer` });
    }

    if (room.type === 'hotel') {
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
    }

    if (room.type === 'conference') {
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
      if (overlapping) return res.status(400).json({ error: 'Rummet är redan bokat för den valda tiden' });
    }

    const bookingData = {
      roomId,
      userId: req.user.id,
      guests
    };

    if (room.type === 'hotel') {
      bookingData.startDate = startDate;
      bookingData.endDate = endDate;
    }

    if (room.type === 'conference') {
      bookingData.date = date;
      bookingData.startTime = startTime;
      bookingData.endTime = endTime;
    }

    const booking = new Booking(bookingData);
    await booking.save();

    let notificationData = {
      userId: req.user.id,
      roomId,
      type: room.type
    };

    if (room.type === 'hotel') {
      notificationData.startDate = startDate;
      notificationData.endDate = endDate;
    }

    if (room.type === 'conference') {
      notificationData.date = date;
      notificationData.startTime = startTime;
      notificationData.endTime = endTime;
    }

    const io = getIo();
    io.emit('bookingCreated', notificationData);

    res.status(201).json(booking);
  } catch (err) {
    console.error('❌ Fel vid skapande av bokning:', err);
    res.status(400).json({ error: 'Kunde inte skapa bokning', details: err.message });
  }
}

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

