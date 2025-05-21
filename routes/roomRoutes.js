const express = require('express');
const router = express.Router();

const {
  createRooms,
  getAllRooms,
  updateRooms,
  deleteRooms
} = require('../controllers/roomController');

const verifyToken = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/roleMiddleware');

router.get('/', getAllRooms);// Alla får läsa

// Endast admin får skapa, ändra, ta bort
router.post('/', verifyToken, requireAdmin, createRooms);
router.put('/:id', verifyToken, requireAdmin, updateRooms);
router.delete('/:id', verifyToken, requireAdmin, deleteRooms);

module.exports = router;

