const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const generate_token = require('../auth/generate_token');
const pool = require('../db/db');

const validate = () => {
  const rules = [
    body('username')
      .exists()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage('Username must be greater than 3 characters')
      .isLength({ max: 32 })
      .withMessage('Username must be less than 32 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain alphanumeric characters')
      .trim()
      .withMessage('Username cannot start or end with whitespaces'),
    body('password')
      .exists()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be greater than 8 characters')
      .isLength({ max: 64 })
      .withMessage('Password must be less than 64 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
  ];
  return rules;
};

router.post('/login', validate(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;
    return res.status(400).send(firstError);
  }

  try {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).send('Username or password is incorrect');
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).send('Username or password is incorrect');
    }
    const token = generate_token(user.rows[0].id, username);
    return res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/register', validate(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;
    return res.status(400).send(firstError);
  }

  try {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    if (user.rows.length > 0) {
      return res.status(400).send('Username already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hash]
    );
    const token = generate_token(newUser.rows[0].id, username);
    return res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
