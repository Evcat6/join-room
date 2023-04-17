import { type UserEntity } from '@/common/entities/user.entity.js';
import { type userRepository as UserRepository } from '@/repositories/repositories.js';

class UserService {
  private userRepository: typeof UserRepository;

  public constructor(userRepository: typeof UserRepository) {
    this.userRepository = userRepository;
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }
}

export { UserService };
