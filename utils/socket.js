const socketIo = require('socket.io');
let ioInstance;

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

const getIo = () => ioInstance;
ioInstance = ioInstance || io; // Ensure only one instance of io is created

module.exports = setupSocketIO;
module.exports.getIo = getIo;
