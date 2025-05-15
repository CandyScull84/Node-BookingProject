const Booking = require('../models/booking');

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('accommodationId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta bokningar' });
  }
};

const createBooking = async (req, res) => {
  try {
    const { accommodationId, startDate, endDate } = req.body;

    const booking = new Booking({
      accommodationId,
      userId: req.user.id,
      startDate,
      endDate
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
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

