import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';

import { ChatMessageApiPath, HttpCode } from '@/common/enums/enums.js';
import { chatMessagesService } from '@/services/services.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      ChatMessageCreateResponseDto:
 *        type: object
 *        properties:
 *          text:
 *            anyOf:
 *              - type: string
 *              - type: null
 *          userId:
 *              type: string
 *          imageUrl:
 *            anyOf:
 *              - type: string
 *              - type: null
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      ChatMessageCreateRequestDto:
 *        type: object
 *        properties:
 *          text:
 *            anyOf:
 *              - type: string
 *              - type: undefined
 *          userId:
 *              type: string
 *          imageUrl:
 *            anyOf:
 *              - type: string
 *              - type: undefined
 *          chatId:
 *            type: string
 *            format: uuid
 */

/**
 * @swagger
 * /api/chat/messages/:id:
 *   get:
 *     summary: Returns list of all messages by chat id
 *     description: Returns list of all messages by chat id
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all messages by chat id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/ChatMessageCreateResponseDto'
 */

router.get(
  ChatMessageApiPath.$ID,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const messages = await chatMessagesService.getAllMessages(id);
      response.status(HttpCode.OK).send(messages);
    } catch (error: unknown) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/chat/messages/last/:id:
 *   get:
 *     summary: Returns last message by chat id
 *     description: Returns last message by chat id
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A last message by chat id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/ChatMessageCreateResponseDto'
 */

router.get(
  ChatMessageApiPath.LAST_$ID,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const message = await chatMessagesService.getLastMessage(id);
      response.status(HttpCode.OK).send(message);
    } catch (error: unknown) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/chat/messages:
 *   post:
 *     summary: Create a message
 *     description: Returns last message by chat id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/ChatMessageCreateRequestDto'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A last message by chat id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ChatMessageCreateResponseDto'
 */

router.post(
  ChatMessageApiPath.INDEX,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body, userId } = request;
      const message = await chatMessagesService.createChatMessage(body, userId);
      response.status(HttpCode.CREATED).send(message);
    } catch (error: unknown) {
      next(error);
    }
  }
);

export { router };
