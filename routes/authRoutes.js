const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

const User = require('../models/User');

router.get('/all', async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta användare' });
  }
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;

