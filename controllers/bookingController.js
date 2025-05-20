const Booking = require('../models/booking');
const {getIo}  = require('../utils/socket');
const Accommodation = require('../models/Accommodation');

const getBookings = async (req, res) => {
  console.log('Användare som försöker boka:', req.user);

  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('accommodationId');
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
    const { accommodationId, startDate, endDate, guests } = req.body;

    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) {
      return res.status(404).json({ error: 'Boendet kunde inte hittas' });
    }
    
    if (accommodation.type === 'Cabin' && guests > accommodation.capacity) {
      return res.status(400).json({ error: `Stugan rymmer max ${accommodation.capacity} personer` });
    }

    const overlapping = await Booking.findOne({
      accommodationId,
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) }
        }
      ]
    });

    if (overlapping) {
      return res.status(400).json({ error: 'Boendet är redan bokat för vald period' });
    }

    const booking = new Booking({
      accommodationId,
      userId: req.user.id,
      startDate,
      endDate,
      guests
    });

    await booking.save();

    const io = getIo();
    io.emit('bookingCreated', {
      userId: req.user.id,
      accommodationId,
      startDate,
      endDate
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error('❌ Fel vid skapande av bokning:', err);
    res.status(400).json({ error: 'Kunde inte skapa bokning', details: err.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { startDate, endDate },
      { new: true, runValidators: true }
    );
    if (!updatedBooking) return res.status(404).json({ error: 'Bokning hittades inte' });
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ error: 'Kunde inte uppdatera bokning', details: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ error: 'Bokning hittades inte' });  
     
    res.json({ message: 'Bokning borttagen' });
  }
  catch (err) {
    res.status(500).json({ error: 'Kunde inte ta bort bokning', details: err.message });
  }   

};


module.exports = { getBookings, createBooking, updateBooking, deleteBooking };

