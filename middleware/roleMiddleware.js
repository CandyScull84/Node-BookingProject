const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Endast admin har behörighet' });
  }
  next();
};

module.exports = requireAdmin;

