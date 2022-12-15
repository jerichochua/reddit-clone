const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const routes = require('./routes');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
