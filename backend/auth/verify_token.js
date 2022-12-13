const jwt = require('jsonwebtoken');

const verify_token = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(403).json({ message: 'Authorization denied' });
  }
  try {
    const token = req.header('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verify_token;
