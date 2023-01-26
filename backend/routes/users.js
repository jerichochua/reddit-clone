const pool = require('../db/db');
const router = require('express').Router();

router.get('/:username', async (req, res) => {
  const username = req.params.username;

  const userQuery = 'SELECT * FROM users WHERE username = $1';
  try {
    const result = await pool.query(userQuery, [username]);
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving user');
  }

  const postsQuery = `
    SELECT
      posts.id,
      posts.title,
      users.username AS author,
      COALESCE(SUM(votes.vote), 0) AS score,
      posts.created_at,
      COUNT(comments.id) AS comments,
      posts.post_type,
      posts.post_url
    FROM posts
    INNER JOIN users ON posts.author_id = users.id
    LEFT JOIN comments ON posts.id = comments.post_id
    LEFT JOIN votes ON posts.id = votes.post_id
    WHERE users.username = $1
    GROUP BY posts.id, users.username
    ORDER BY score DESC
  `;
  try {
    const result = await pool.query(postsQuery, [username]);
    if (result.rows.length === 0) {
      return res.status(404).send('No posts found');
    }
    res.status(200).send(result.rows);
  } catch (err) {
    res.status(500).send('Error retrieving posts');
  }
});

module.exports = router;
