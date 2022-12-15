const client = require('../db/db');
const router = require('express').Router();

router.get('/:username', (req, res) => {
  const username = req.params.username;
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
    WHERE users.username = $1
    GROUP BY posts.id, users.username
    ORDER BY score DESC
  `;
  client.query(query, [username], (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving posts');
    }
    res.send(result.rows);
  });
});

module.exports = router;
