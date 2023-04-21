import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from '@/common/config/config.js';
import { userRepository } from '@/repositories/repositories.js';

import { Crypt } from './crypt/crypt.service.js';
import { Token } from './token/token.service.js';
import { User } from './user/user.service.js';

const cryptService = new Crypt(bcrypt);
const tokenService = new Token(jwt, config);
const userService = new User(userRepository, cryptService);

export { cryptService, tokenService, userService };
