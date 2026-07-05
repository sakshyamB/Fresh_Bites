const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'user has not been authenticated' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only Admins can perform this action' });
  }
  next();
};

module.exports = isAdmin;
