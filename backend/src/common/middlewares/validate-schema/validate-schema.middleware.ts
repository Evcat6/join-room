import { type NextFunction, type Request, type Response } from 'express';
import { type Schema } from 'joi';

import { HttpCode } from '@/common/enums/enums.js';
import { HttpError } from '@/common/exceptions/exceptions.js';

const validateSchema = (schema: Schema) => {
  return (request: Request, _response: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(request.body);
    if (error) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: error.message,
      });
    }
    request.body = value;
    next();
  };
};

export { validateSchema };
