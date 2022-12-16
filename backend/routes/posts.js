const pool = require('../db/db');
const router = require('express').Router();
const verify_token = require('../middleware/verify_token');

router.get('/', async (req, res) => {
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
  try {
    const result = await pool.query(query);
    res.status(200).send(result.rows);
  } catch (err) {
    res.status(500).send('Error retrieving posts');
  }
});

router.post('/', verify_token, async (req, res) => {
  const author_id = req.user;
  const { title, content } = req.body;
  query = `INSERT INTO posts (author_id, title, content, post_type)
    VALUES ($1, $2, $3, 'text') RETURNING *
  `;
  try {
    const result = await pool.query(query, [author_id, title, content]);
    res.status(201).send(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error creating post');
  }
});

router.get('/:id', async (req, res) => {
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
  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Post not found');
    }
    res.status(200).send(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error retrieving post');
  }
});

router.delete('/:id', verify_token, async (req, res) => {
  const id = req.params.id;
  const author_id = req.user;
  query = `DELETE FROM posts WHERE id = $1 AND author_id = $2`;
  try {
    const result = await pool.query(query, [id, author_id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Post not found');
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Error deleting post');
  }
});

router.post('/:id', verify_token, async (req, res) => {
  const author_id = req.user;
  const post_id = req.params.id;
  const { content } = req.body;
  query = `
    INSERT INTO comments (post_id, author_id, content)
    VALUES ($1, $2, $3)
  `;
  try {
    const result = await pool.query(query, [post_id, author_id, content]);
    if (result.rowCount === 1) {
      return res.status(201).json({ message: 'Comment created' });
    }
    return res.status(404).send('Post not found');
  } catch (err) {
    res.status(500).send('Error creating comment');
  }
});

router.get('/:id/comments', async (req, res) => {
  const id = req.params.id;
  query = `
    SELECT
      comments.id,
      comments.post_id,
      users.username AS author,
      comments.created_at,
      comments.content
    FROM comments INNER JOIN users ON comments.author_id = users.id
    WHERE comments.post_id = $1 ORDER BY comments.created_at DESC
  `;
  try {
    const result = await pool.query(query, [id]);
    res.status(200).send(result.rows);
  } catch (err) {
    res.status(500).send('Error retrieving comments');
  }
});

module.exports = router;
