import express, { type Request, type Response } from 'express';

import { UsersApiPath } from '@/common/enums/enums.js';
import { userService } from '@/services/services.js';

const router = express.Router();

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
 *          passwordSalt:
 *            type: string
 *          passwordHash:
 *            type: string
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
 * /api/users:
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
router.get(
  UsersApiPath.INDEX,
  async (_request: Request, response: Response) => {
    const users = await userService.findAll();
    response.send(users);
  }
);

/**
 * @swagger
 * /api/users:
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

export { router };
