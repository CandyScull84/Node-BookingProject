const Booking = require('../models/booking');

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

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('accommodationId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta bokningar' });
  }
};

module.exports = { createBooking, getBookings };

