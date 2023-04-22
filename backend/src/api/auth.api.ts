import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';

import { ApiRoutes, HttpCode } from '@/common/enums/enums.js';
import { validateSchema } from '@/common/middlewares/middlewares.js';
import {
  SignInValidationSchema,
  SignUpValidationSchema,
} from '@/common/validation-schemas/validation-schemas.js';
import { authService } from '@/services/services.js';

const router = express.Router();

router.post(
  ApiRoutes.SIGN_UP,
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
  ApiRoutes.SIGN_IN,
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

export { router };
