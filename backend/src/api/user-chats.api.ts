import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';

import { HttpCode, UserChatsApiPath } from '@/common/enums/enums.js';
import { validateSchema } from '@/common/middlewares/middlewares.js';
import { CreateChatValidationSchema } from '@/common/validation-schemas/validation-schemas.js';
import { userChatsService } from '@/services/services.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      UserChatCreateRequestDto:
 *        type: object
 *        properties:
 *          chatAvatarUrl:
 *            anyOf:
 *              - type: string
 *              - type: undefined
 *          name:
 *              type: string
 *          description:
 *            anyOf:
 *              - type: string
 *              - type: undefined
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      UserChatCreateResponseDto:
 *        type: object
 *        properties:
 *          id:
 *              type: string
 *          chatAdminId:
 *              type: string
 *          chatAvatarUrl:
 *            anyOf:
 *              - type: string
 *              - type: undefined
 *          name:
 *              type: string
 *          description:
 *            anyOf:
 *              - type: string
 *              - type: undefined
 */

/**
 * @swagger
 * /api/user/chats:
 *   get:
 *     summary: Returns list of all users chats
 *     description: Returns list of all users chats
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all users chats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/UserChatCreateResponseDto'
 */

router.get(
  UserChatsApiPath.INDEX,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { userId } = request;
      const chats = await userChatsService.getAllUserChats(userId);
      response.status(HttpCode.OK).send(chats);
    } catch (error: unknown) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/user/chats/:id:
 *   get:
 *     summary: Return user chat by id
 *     description: Return user chat by id
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User chat by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/UserChatCreateResponseDto'
 */

router.get(
  UserChatsApiPath.$ID,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {
        userId,
        params: { id: chatId },
      } = request;
      const chat = await userChatsService.getOneUserChat(chatId, userId);
      response.status(HttpCode.OK).send(chat);
    } catch (error: unknown) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/user/chats:
 *   post:
 *     summary: create user chat
 *     description: create user chat
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/UserChatCreateRequestDto'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: return new user chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/UserChatCreateResponseDto'
 */

router.post(
  UserChatsApiPath.INDEX,
  validateSchema(CreateChatValidationSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { userId, body } = request;
      const chat = await userChatsService.createUserChat(body, userId);
      response.status(HttpCode.CREATED).send(chat);
    } catch (error: unknown) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/user/chats/join/:id:
 *   post:
 *     summary: join to existing chat
 *     description: join to existing chat
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: return chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/UserChatCreateResponseDto'
 */

router.post(
  UserChatsApiPath.JOIN_$ID,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {
        userId,
        params: { id: chatId },
      } = request;
      const chat = await userChatsService.joinChat(chatId, userId);
      response.status(HttpCode.CREATED).send(chat);
    } catch (error: unknown) {
      next(error);
    }
  }
);

export { router };
