const jwt = require('jsonwebtoken');

const verify_token = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(403).json({ msg: 'Authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = verify_token;
