import { type Request, type Response } from 'express';

import { HttpCode } from '@/common/enums/enums.js';

const notFound = (_request: Request, response: Response): void => {
  response.status(HttpCode.NOT_FOUND).json({
    message: 'Not Found',
    status: HttpCode.NOT_FOUND,
  });
};

export { notFound };
