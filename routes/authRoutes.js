const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const User = require('../models/User');
const requireAdmin = require('../middleware/roleMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/all', verifyToken, requireAdmin, async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta användare' });
  }
});

module.exports = router;

