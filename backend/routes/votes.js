const router = require('express').Router();
const pool = require('../db/db');

router.get('/', async (req, res) => {
  const query = 'SELECT * FROM votes';
  try {
    const result = await pool.query(query);
    res.status(200).send(result.rows);
  } catch (err) {
    res.status(500).send('Error retrieving votes');
  }
});

module.exports = router;
