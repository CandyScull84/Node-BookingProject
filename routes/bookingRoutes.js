const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/bookingController');

const verifyToken = require('../middleware/authMiddleware');

// Alla bokningar kräver att man är inloggad
router.use(verifyToken);

router.post('/', createBooking); // Skapa bokning
router.get('/', getBookings); // Hämta bokningar

module.exports = router;

