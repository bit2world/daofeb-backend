const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const { notFound, errorHandler } = require('./middlewares');

const app = express();

require('dotenv').config();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app. use(cors())

// const employees = require('./routes/employees');
const daofeb = require('./routes/daofeb');


// app.use('/api/employees', employees);
app.use('/api/daofeb', daofeb);


app.use(notFound);
app.use(errorHandler);

module.exports = app;
