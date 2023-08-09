import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from '@/common/config/config.js';
import {
  chatMessagesRepository,
  userChatsRepository,
  userRepository,
} from '@/repositories/repositories.js';

import { Auth } from './auth/auth.service.js';
import { ChatMessages } from './chat-messages/chat-messages.service.js';
import { Crypt } from './crypt/crypt.service.js';
import { Token } from './token/token.service.js';
import { User } from './user/user.service.js';
import { UserChats } from './user-chats/user-chats.service.js';

const cryptService = new Crypt(bcrypt);
const tokenService = new Token(jwt, config);
const userService = new User(userRepository, cryptService);
const authService = new Auth(cryptService, userService, tokenService);
const userChatsService = new UserChats(userChatsRepository);
const chatMessagesService = new ChatMessages(chatMessagesRepository);

export {
  authService,
  chatMessagesService,
  cryptService,
  tokenService,
  userChatsService,
  userService,
};
