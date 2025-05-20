const express = require('express');
const router = express.Router();

const { createBooking, getBookings, updateBooking, deleteBooking } = require('../controllers/bookingController');

const verifyToken = require('../middleware/authMiddleware');

// Alla bokningar kräver att man är inloggad
router.use(verifyToken);

router.post('/', verifyToken, createBooking); // Skapa bokning
router.get('/', verifyToken, getBookings); // Hämta bokningar
router.put('/:id', verifyToken, updateBooking); // Uppdatera bokning
router.delete('/:id', verifyToken, deleteBooking); // Ta bort bokning

module.exports = router;

