import { type Request, type Response } from 'express';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/init:
 *   get:
 *     summary: Returns greeting
 *     description: Returns greeting
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/', (_request: Request, response: Response) => {
  response.send('<h1>Hello, World!</h1>');
});

export { router };
