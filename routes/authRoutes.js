const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, updateUserRole } = require('../controllers/authController');
// const { register, login } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
// const { getAllUsers } = require('../controllers/authController');
const requireRole = require('../middleware/roleMiddleware');
const cache = require('../middleware/cacheMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/all', verifyToken, requireRole('Admin'), cache, getAllUsers);

router.patch('/role/:userId', verifyToken, requireAdmin, updateUserRole);

module.exports = router;

