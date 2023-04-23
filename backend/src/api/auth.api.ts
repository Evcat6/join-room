import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';

import { AuthApiPath, HttpCode } from '@/common/enums/enums.js';
import { HttpError } from '@/common/exceptions/exceptions.js';
import { getIdFromToken } from '@/common/helpers/helpers.js';
import { validateSchema } from '@/common/middlewares/middlewares.js';
import {
  SignInValidationSchema,
  SignUpValidationSchema,
} from '@/common/validation-schemas/validation-schemas.js';
import { authService, userService } from '@/services/services.js';

const router = express.Router();

router.post(
  AuthApiPath.SIGN_UP,
  validateSchema(SignUpValidationSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = await authService.signUp(request.body);
      response.status(HttpCode.CREATED).send(token);
    } catch (error: unknown) {
      next(error);
    }
  }
);

router.post(
  AuthApiPath.SIGN_IN,
  validateSchema(SignInValidationSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = await authService.signIn(request.body);
      response.status(HttpCode.CREATED).send(token);
    } catch (error: unknown) {
      next(error);
    }
  }
);

router.get(
  AuthApiPath.USER,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = getIdFromToken(request.headers.authorization as string);
      const user = await userService.findById(id);
      if (!user) {
        throw new HttpError({
          status: HttpCode.NOT_FOUND,
          message: 'User Not Found',
        });
      }
      response.status(HttpCode.OK).send(user);
    } catch (error: unknown) {
      next(error);
    }
  }
);

export { router };
