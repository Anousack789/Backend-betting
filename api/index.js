'use strict';
const { server } = require('./src/app');
const config = require('./config');
const port = config.port;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
