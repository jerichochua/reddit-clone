const { body, validationResult } = require('express-validator');
const router = require('express').Router();
const pool = require('../db/db');
const verify_token = require('../middleware/verify_token');

const validate_title = body('title')
  .trim()
  .exists()
  .withMessage('Title is required')
  .isLength({ min: 3 })
  .withMessage('Title must have at least 3 characters')
  .isLength({ max: 128 })
  .withMessage('Title must have at most 128 characters');

const validate_content = body('content')
  .trim()
  .exists()
  .withMessage('Content is required')
  .isLength({ min: 3 })
  .withMessage('Content must have at least 3 characters');

const validate_comment = body('content')
  .trim()
  .exists()
  .withMessage('Comment is required')
  .isLength({ min: 1 })
  .withMessage('Comment cannot be empty')
  .isLength({ max: 2048 })
  .withMessage('Comment must have at most 2048 characters');

const validate_post = [validate_title, validate_content];

router.get('/', async (req, res) => {
  const query = `
    SELECT
      posts.id,
      posts.title,
      users.username AS author,
      COALESCE(SUM(votes.vote), 0) AS score,
      posts.created_at,
      COUNT(comments.id) AS comments
    FROM posts
    INNER JOIN users ON posts.author_id = users.id
    LEFT JOIN comments ON posts.id = comments.post_id
    LEFT JOIN votes ON posts.id = votes.post_id
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

router.post('/', verify_token, validate_post, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(400).send(error.msg);
  }
  const author_id = req.user;
  const { title, content } = req.body;
  const query = `INSERT INTO posts (author_id, title, content, post_type)
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
  const query = `
    SELECT
      posts.id,
      posts.title,
      users.username AS author,
      SUM(votes.vote) AS score,
      posts.created_at,
      posts.content,
      COUNT(comments.id) AS comments
    FROM posts
    INNER JOIN users ON posts.author_id = users.id
    LEFT JOIN comments ON posts.id = comments.post_id
    LEFT JOIN votes ON posts.id = votes.post_id
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
  const query = `DELETE FROM posts WHERE id = $1 AND author_id = $2`;
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

router.post('/:id', verify_token, validate_comment, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(400).send(error.msg);
  }
  const author_id = req.user;
  const post_id = req.params.id;
  const { content } = req.body;
  const query = `
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
  const query = `
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

router.put(
  '/:id/comments/:comment_id',
  verify_token,
  validate_comment,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()[0];
      return res.status(400).send(error.msg);
    }
    const post_id = req.params.id;
    const comment_id = req.params.comment_id;
    const author_id = req.user;
    const { content } = req.body;
    const query = `
    UPDATE comments
    SET content = $1
    WHERE id = $2 AND post_id = $3 AND author_id = $4
  `;
    try {
      const result = await pool.query(query, [
        content,
        comment_id,
        post_id,
        author_id,
      ]);
      if (result.rowCount === 0) {
        return res.status(404).send('Comment not found');
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).send('Error updating comment');
    }
  }
);

router.delete('/:id/comments/:comment_id', verify_token, async (req, res) => {
  const post_id = req.params.id;
  const comment_id = req.params.comment_id;
  const author_id = req.user;
  const query = `
    DELETE FROM comments
    WHERE id = $1 AND post_id = $2 AND author_id = $3
  `;
  try {
    const result = await pool.query(query, [comment_id, post_id, author_id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Comment not found');
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Error deleting comment');
  }
});

module.exports = router;
