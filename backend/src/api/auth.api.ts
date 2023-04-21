import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';

import { ApiRoutes, HttpCode } from '@/common/enums/enums.js';
import { HttpError } from '@/common/exceptions/exceptions.js';
import { validateSchema } from '@/common/middlewares/middlewares.js';
import { SignUpValidationSchema } from '@/common/validation-schemas/validation-schemas.js';
import { userService } from '@/services/services.js';

const router = express.Router();

router.post(
  ApiRoutes.SIGN_UP,
  validateSchema(SignUpValidationSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const ifUserWithEmail = await userService.findByEmail(request.body.email);
      if (ifUserWithEmail) {
        throw new HttpError({
          status: HttpCode.BAD_REQUEST,
          message: 'Email already exists',
        });
      }
      const user = await userService.create(request.body);
      response.status(HttpCode.CREATED).send(user);
    } catch (error: unknown) {
      next(error);
    }
  }
);

export { router };
