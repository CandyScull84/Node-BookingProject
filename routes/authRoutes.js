const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, updateUserRole } = require('../controllers/authController');
// const { register, login } = require('../controllers/authController');
// const verifyToken = require('../middleware/authMiddleware');
// const User = require('../models/User');
// const requireAdmin = require('../middleware/roleMiddleware');
// const cache = require('../middleware/cacheMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/all', verifyToken, requireAdmin, cache, getAllUsers);

router.patch('/role/:userId', verifyToken, requireAdmin, updateUserRole);
// router.get('/all', verifyToken, requireAdmin, cache, async (req, res) => {
//   try {
//     const Users = await User.find();
//     res.json(Users);
//   } catch (err) {
//     res.status(500).json({ error: 'Kunde inte hämta användare' });
//   }
// });

// // routes/authRoutes.js
// router.patch('/role/:userId', verifyToken, requireAdmin, async (req, res) => {
//   const { userId } = req.params;
//   const { role } = req.body;

//   if (!['User', 'Admin'].includes(role)) {
//     return res.status(400).json({ error: 'Ogiltig roll' });
//   }

//   try {
//     const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
//     if (!user) return res.status(404).json({ error: 'Användare ej hittad' });

//     res.json({ message: 'Roll uppdaterad', user });
//   } catch (err) {
//     res.status(500).json({ error: 'Misslyckades med att uppdatera roll' });
//   }
// });

module.exports = router;

