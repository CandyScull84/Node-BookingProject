const socketIo = require('socket.io');

function setupSocketIO(server) {
  const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected to server');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

module.exports = setupSocketIO;

