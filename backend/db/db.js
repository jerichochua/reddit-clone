const { Pool } = require('pg');

let config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
}

if (process.env.NODE_ENV === 'test') {
  config.database = process.env.DB_TEST_DATABASE;
}

const pool = new Pool(config);

module.exports = pool;
