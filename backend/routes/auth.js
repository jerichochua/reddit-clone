const client = require('../db/db');
const bcrypt = require('bcrypt');
const generate_token = require('../auth/generate_token');
const router = require('express').Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await client.query('SELECT * FROM users WHERE username = $1', [
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

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await client.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    if (user.rows.length > 0) {
      return res.status(400).send('Username already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await client.query(
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
