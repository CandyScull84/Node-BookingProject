const express = require('express');
const router = express.Router();

const { createBooking, getBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');

const verifyToken = require('../middleware/authMiddleware');

// Alla bokningar kräver att man är inloggad
router.use(verifyToken);

/**
 * Bokningsrutter
 * - User: får skapa, läsa, ändra och ta bort sina egna bokningar
 * - Admin: får hantera alla bokningar
 */
router.post('/', createBooking); 
router.get('/', getBooking); 
router.put('/:id', updateBooking); 
router.delete('/:id', deleteBooking); 

module.exports = router;

