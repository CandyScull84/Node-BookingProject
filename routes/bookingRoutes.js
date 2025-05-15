const express = require('express');
const router = express.Router();

const { createBooking, getBookings, updateBooking, deleteBooking } = require('../controllers/bookingController');

const verifyToken = require('../middleware/authMiddleware');

// Alla bokningar kräver att man är inloggad
router.use(verifyToken);

router.post('/', createBooking); // Skapa bokning
router.get('/', getBookings); // Hämta bokningar
router.put('/:id', updateBooking); // Uppdatera bokning
router.delete('/:id', deleteBooking); // Ta bort bokning

module.exports = router;

