const client = require('./db/db');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const generate_token = require('./auth/generate_token');

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
    const token = generate_token(username);
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
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, hash]
    );
    const token = generate_token(username);
    return res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.get('/posts', (req, res) => {
  query = `
    SELECT
      posts.id,
      posts.title,
      users.username AS author,
      posts.score,
      posts.created_at,
      COUNT(comments.id) AS comments
    FROM posts
    INNER JOIN users ON posts.author_id = users.id
    LEFT JOIN comments ON posts.id = comments.post_id
    GROUP BY posts.id, users.username
    ORDER BY score DESC
  `;
  client.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving posts');
    }
    res.send(result.rows);
  });
});

router.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  query = `
    SELECT
      posts.id,
      posts.title,
      users.username AS author,
      posts.score,
      posts.created_at,
      posts.content,
      COUNT(comments.id) AS comments
    FROM posts
    INNER JOIN users ON posts.author_id = users.id
    LEFT JOIN comments ON posts.id = comments.post_id
    WHERE posts.id = $1
    GROUP BY posts.id, users.username
  `;
  client.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving post');
    }
    res.send(result.rows[0]);
  });
});

router.get('/posts/:id/comments', (req, res) => {
  const id = req.params.id;
  query = `
    SELECT
      comments.id,
      comments.post_id,
      users.username AS author,
      comments.created_at,
      comments.content
    FROM comments
    INNER JOIN users ON comments.author_id = users.id
    WHERE comments.post_id = $1
  `;
  client.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving comments');
    }
    res.send(result.rows);
  });
});

module.exports = router;
