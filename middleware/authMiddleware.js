const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token is needed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Innehåller id och role
    console.log('✅ Token verifierad:', decoded);
    next();
  } catch (err) {
    console.error('❌ Ogiltig token:', err.message);
    res.status(403).json({ error: 'Ogiltig token' });

  }
};

module.exports = verifyToken;
