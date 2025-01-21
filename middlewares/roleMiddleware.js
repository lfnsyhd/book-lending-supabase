// Middleware untuk memastikan pengguna memiliki role "admin"
const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, admin only' });
  }
  next();
};

// Middleware untuk memastikan pengguna memiliki role "user"
const authorizeUser = (req, res, next) => {
  if (!req.user || req.user.role !== 'user') {
    return res.status(403).json({ message: 'Access denied, user only' });
  }
  next();
};

module.exports = {
  authorizeAdmin,
  authorizeUser
}
