import { type NextFunction, type Request, type Response } from 'express';

import { WHITE_ROUTES } from '@/common/constants/constants.js';
import { HttpCode } from '@/common/enums/enums.js';
import { HttpError } from '@/common/exceptions/exceptions.js';
import { getIdFromToken, getToken } from '@/common/helpers/helpers.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const authorization = (
  request: Request,
  _response: Response,
  next: NextFunction
): void => {
  try {
    const isDocumentationRoute = request.path.includes('/api-docs');

    if (request.url.startsWith('/socket.io/')) {
      return next();
    }

    if (isDocumentationRoute) {
      return next();
    }

    const routeConfig = {
      path: request.path,
      method: request.method,
    };

    const isWhiteRoute = WHITE_ROUTES.some(
      (route) => JSON.stringify(route) === JSON.stringify(routeConfig)
    );

    if (isWhiteRoute) {
      return next();
    }

    if (!request.headers.authorization) {
      throw new HttpError({
        message: 'Unauthorized',
        status: HttpCode.UNAUTHORIZED,
      });
    }

    const token = getToken(request.headers.authorization);

    const { id } = getIdFromToken(token);

    request.userId = id;

    next();
  } catch (error: unknown) {
    next(error);
  }
};

export { authorization };
