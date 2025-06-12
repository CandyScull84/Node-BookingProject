const requireRole = (...allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Otillräcklig behörighet' });
  }
  next();
};

module.exports = requireRole;
