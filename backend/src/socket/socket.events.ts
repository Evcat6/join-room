import { type Server } from 'socket.io';

const socketEventsHandler = (io: Server): void => {
  io.on('connection', (socket) => {
    socket.emit('Hello, world');
  });
};

export { socketEventsHandler };
