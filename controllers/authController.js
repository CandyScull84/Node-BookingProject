const User = require('../models/User'); // Importera användarmodellen
const jwt = require('jsonwebtoken');

// Registrera en ny användare
const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = new User({ username, password, email, role : 'User' });
    await user.save();

    res.status(201).json({ message: 'Användare registrerad' });
  } catch (err) {
    res.status(400).json({ error: 'Registrering misslyckades', details: err.message });
  }
};

// Logga in och få token
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Fel användarnamn eller lösenord' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Inloggning misslyckades', details: err.message });
  }
};

module.exports = { register, login };

