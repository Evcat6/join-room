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

/**
 * @swagger
 * components:
 *    schemas:
 *      AuthResponseDto:
 *        type: object
 *        properties:
 *          token:
 *            type: string
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      SignUpRequestDto:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 *          repeatPassword:
 *            type: string
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      SignInRequestDto:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/SignUpRequestDto'
 *     summary: Returns bearer token
 *     description: Returns bearer token
 *     responses:
 *       201:
 *         description: created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AuthResponseDto'
 */
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

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/SignInRequestDto'
 *     summary: Returns bearer token
 *     description: Returns bearer token
 *     responses:
 *       200:
 *         description: authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AuthResponseDto'
 */
router.post(
  AuthApiPath.SIGN_IN,
  validateSchema(SignInValidationSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = await authService.signIn(request.body);
      response.status(HttpCode.OK).send(token);
    } catch (error: unknown) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/auth/user:
 *   get:
 *     summary: Returns current user details
 *     description: Returns current user details
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/UserDto'
 */
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
