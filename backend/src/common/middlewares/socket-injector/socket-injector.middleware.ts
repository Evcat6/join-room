import { type NextFunction, type Request, type Response } from 'express';
import { type Server } from 'socket.io';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      io: Server;
    }
  }
}

const socketInjector = (io: Server) => {
  return (request: Request, _response: Response, next: NextFunction): void => {
    request.io = io;
    next();
  };
};

export { socketInjector };
