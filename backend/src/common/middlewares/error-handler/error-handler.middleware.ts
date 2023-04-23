import { type NextFunction, type Request, type Response } from 'express';

import { HttpCode } from '@/common/enums/enums.js';
import { type HttpError } from '@/common/exceptions/exceptions.js';

// eslint-disable-next-line max-params
function errorMiddleware(
  error: HttpError,
  _request: Request,
  response: Response,
  next: NextFunction
): void {
  if (!response.headersSent) {
    response.status(error.status ?? HttpCode.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      status: error.status ?? HttpCode.INTERNAL_SERVER_ERROR,
    });
    return next(error);
  }
  response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    status: HttpCode.INTERNAL_SERVER_ERROR,
  });
  return next(error);
}

export { errorMiddleware };
