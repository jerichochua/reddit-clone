const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const app = express();
const swaggerDocument = require('./swagger.json');

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/v1', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
