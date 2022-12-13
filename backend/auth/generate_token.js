const jwt = require('jsonwebtoken');

const generate_token = (id, username) => {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
  return token;
};

module.exports = generate_token;
