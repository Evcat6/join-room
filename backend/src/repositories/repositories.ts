import { UserModel } from '@/common/models/models.js';

import { UserRepository } from './user.repository.js';

const userRepository = new UserRepository(UserModel);

export { userRepository };
