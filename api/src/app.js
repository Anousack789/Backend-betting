'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const api = require('./api');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});

const rootPath = path.join(__dirname, '/public/images');
app.use('/files', express.static(rootPath));
app.use(morgan('dev'));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/homepage.html'));
});

const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
app.use(errorHandler);
app.use(notFound);

app.use('/api/v1', api);

module.exports = app;
