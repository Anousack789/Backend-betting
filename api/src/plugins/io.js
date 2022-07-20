'use strict';
module.exports = (socket) => {
  socket.on('test-msg', (data) => {
    console.log(data);
  });

  socket.on('open-detail', (data) => {
    console.log(data);
  });
};
