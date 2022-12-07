const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

client.connect();

app.use(cors());

app.get('/api/v1/posts', (req, res) => {
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

app.get('/api/v1/posts/:id', (req, res) => {
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

app.get('/api/v1/posts/:id/comments', (req, res) => {
  const id = req.params.id;
  // get comments for post with id and author username
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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
