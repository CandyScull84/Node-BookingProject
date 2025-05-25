const requireAdmin = (req, res, next) => {
   console.log('🛡️ Kontrollerar roll för:', req.user);
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Endast admin har behörighet' });
  }
  next();
};

module.exports = requireAdmin;

