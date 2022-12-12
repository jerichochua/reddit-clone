const jwt = require('jsonwebtoken');

const generate_token = (user_id) => {
  const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
  return token;
};

module.exports = generate_token;
