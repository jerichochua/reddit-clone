const pool = require('../db/db');
const router = require('express').Router();
const verify_token = require('../middleware/verify_token');

router.get('/', (req, res) => {
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
  pool.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving posts');
    }
    res.send(result.rows);
  });
});

router.post('/', verify_token, async (req, res) => {
  const author_id = req.user;
  const { title, content } = req.body;
  query = `INSERT INTO posts (author_id, title, content, post_type)
    VALUES ($1, $2, $3, 'text')
    RETURNING *
  `;
  pool.query(query, [author_id, title, content], (err, result) => {
    if (err) {
      res.status(500).send('Error creating post');
    }
    res.status(201).send(result.rows[0]);
  });
});

router.get('/:id', (req, res) => {
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
  pool.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving post');
    }
    if (result.rows.length === 0) {
      return res.status(404).send('Post not found');
    }
    res.send(result.rows[0]);
  });
});

router.post('/:id', verify_token, async (req, res) => {
  const author_id = req.user;
  const post_id = req.params.id;
  const { content } = req.body;
  query = `
    INSERT INTO comments (post_id, author_id, content)
    VALUES ($1, $2, $3)
  `;
  pool.query(query, [post_id, author_id, content], (err, result) => {
    if (err) {
      res.status(500).send('Error creating comment');
    }
    res.status(201).json({ message: 'Comment created' });
  });
});

router.get('/:id/comments', (req, res) => {
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
    ORDER BY comments.created_at DESC
  `;
  pool.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving comments');
    }
    res.send(result.rows);
  });
});

module.exports = router;
