const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const User = require('../models/User');
const requireAdmin = require('../middleware/roleMiddleware');
const Cache = require('../middleware/cacheMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/all', verifyToken, requireAdmin, caches, async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta användare' });
  }
});

module.exports = router;

