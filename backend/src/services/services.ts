import { userRepository } from '@/repositories/repositories.js';

import { UserService } from './user.service.js';

const userService = new UserService(userRepository);

export { userService };
