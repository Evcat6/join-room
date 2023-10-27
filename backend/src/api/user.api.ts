import express, { type Request, type Response } from 'express';

import { HttpCode, UsersApiPath } from '@/common/enums/enums.js';
import { HttpError } from '@/common/exceptions/exceptions.js';
import { validateSchema } from '@/common/middlewares/middlewares.js';
import { UserUpdateValidationSchema } from '@/common/validation-schemas/validation-schemas.js';
import { userService } from '@/services/services.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      CurrentUserDto:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          email:
 *            type: string
 *            format: email
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          userName:
 *            type: string
 *          phoneNumber:
 *            type: string
 *            pattern: '^[+]?[0-9]{1,3}[-]?[0-9]{1,14}$'
 *          isFullyRegistered:
 *            type: boolean
 *          birth:
 *            type: string
 *            format: date
 *          avatarUrl:
 *            type: string
 *            format: url
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      UserDto:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          email:
 *            type: string
 *            format: email
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          userName:
 *            type: string
 *          phoneNumber:
 *            type: string
 *            pattern: '^[+]?[0-9]{1,3}[-]?[0-9]{1,14}$'
 *          birth:
 *            type: string
 *            format: date
 *          avatarUrl:
 *            type: string
 *            format: url
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      DeleteUserResponseDto:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 */

/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Returns list of all users
 *     description: Returns list of all users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/UserDto'
 */
router.get(UsersApiPath.ALL, async (_request: Request, response: Response) => {
  const users = await userService.findAll();
  const usersObjects = users.map((entity) => entity.toObject());
  response.send(usersObjects);
});

/**
 * @swagger
 * /api/user:
 *   delete:
 *     summary: Delete user and return id
 *     description: Delete user and return id
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: user id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/DeleteUserResponseDto'
 */

router.delete(
  UsersApiPath.INDEX,
  async (request: Request, response: Response) => {
    const { userId } = request;
    const { id } = await userService.delete({ id: userId });
    response.send({ id });
  }
);

/**
 * @swagger
 * /api/user:
 *   delete:
 *     summary: Updates user
 *     description: Updates user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: user schema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/CurrentUserDto'
 */

router.put(
  UsersApiPath.INDEX,
  validateSchema(UserUpdateValidationSchema),
  async (request: Request, response: Response) => {
    const { userId, body } = request;
    const user = await userService.findById(userId);
    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: 'User Not Found',
      });
    }
    const updatedUser = await userService.updateOne(userId, body);
    const userObject = updatedUser.toObject();
    const isFullyRegistered = userService.isFullyRegistered(userObject);
    const payload = { ...userObject, isFullyRegistered };
    response.send(payload);
  }
);

export { router };
