'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const api = require('./api');
const http = require('http');

const app = express();
require('./utils/passport');
require('./middleware/auth')(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials'
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

app.use('/api/v1', api);

const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
app.use(errorHandler);
app.use(notFound);
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: true });

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.handshake.auth);
  require('./plugins/io')(socket);
});

module.exports = { server };
