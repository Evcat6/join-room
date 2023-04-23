import { type NextFunction, type Request, type Response } from 'express';

import { WHITE_ROUTES } from '@/common/constants/constants.js';
import { HttpCode } from '@/common/enums/enums.js';
import { HttpError } from '@/common/exceptions/exceptions.js';
import { getToken } from '@/common/helpers/helpers.js';

const authorization = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  try {
    const routeConfig = {
      path: request.path,
      method: request.method,
    };

    const isWhiteRoute = WHITE_ROUTES.some(
      (route) => JSON.stringify(route) === JSON.stringify(routeConfig)
    );

    if (isWhiteRoute) {
      next();
    }

    if (!request.headers.authorization) {
      throw new HttpError({
        message: 'Unauthorized',
        status: HttpCode.UNAUTHORIZED,
      });
    }

    const token = getToken(request.headers.authorization);

    request.headers.authorization = token;

    next();
  } catch (error: unknown) {
    next(error);
  }
};

export { authorization };
