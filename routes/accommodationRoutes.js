const express = require('express');
const router = express.Router();
const {
  createAccommodation,
  getAllAccommodations,
  updateAccommodation,
  deleteAccommodation
} = require('../controllers/accommodationController');

const verifyToken = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/roleMiddleware');

router.use(verifyToken); // Alla kräver inloggning

// Alla får läsa
router.get('/', getAllAccommodations);

// Endast admin får skapa, ändra, ta bort
router.post('/', requireAdmin, createAccommodation);
router.put('/:id', requireAdmin, updateAccommodation);
router.delete('/:id', requireAdmin, deleteAccommodation);

module.exports = router;

