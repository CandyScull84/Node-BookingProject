const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const User = require('../models/User');
router.use(verifyToken); // ✅ bra att ha för att skydda hela routen


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

