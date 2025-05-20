const socketIo = require('socket.io');
let ioInstance;

function setupSocketIO(server) {
  const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  ioInstance = io; // Store the instance for later use

  io.on('connection', (socket) => {
    console.log('User connected to server', socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
    });
  });
}

function getIo() {
  if (!ioInstance) {
    throw new Error('❌ Socket.io är inte initierad');
  }
  return ioInstance;
}

module.exports = {
  setupSocketIO,
  getIo
};

