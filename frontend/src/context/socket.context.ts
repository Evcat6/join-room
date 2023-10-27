import React from 'react';
import { type Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import { config } from '@/common/config/config';

const socket = io(config.API_URL);
const SocketContext = React.createContext<Socket>(socket);

const useSocket = (): Socket => {
  return React.useContext(SocketContext);
};

export { socket, SocketContext, useSocket };
