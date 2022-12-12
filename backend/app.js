const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');
const app = express();
const port = 3001;

app.use(cors());
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
