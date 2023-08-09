import { UserEntity } from '@/common/entities/user.entity.js';
import {
  type UserDeleteRequestDto,
  type UserDeleteResponseDto,
  type UserSignUpRequestDto,
} from '@/common/types/types.js';
import { type UserRepository } from '@/repositories/user.repository.js';

import { type Crypt } from '../crypt/crypt.service';

class User {
  private userRepository: UserRepository;
  private cryptService: Crypt;

  public constructor(userRepository: UserRepository, cryptService: Crypt) {
    this.userRepository = userRepository;
    this.cryptService = cryptService;
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  private async find(data: object): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne(data);
  }

  public async findById(id: string): Promise<UserEntity | undefined> {
    return await this.find({ id });
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.find({ email });
  }

  public async create(payload: UserSignUpRequestDto): Promise<UserEntity> {
    const { hash, salt } = this.cryptService.encryptSync(payload.password);
    return await this.userRepository.create(
      UserEntity.initializeNew({
        email: payload.email,
        passwordSalt: salt,
        passwordHash: hash,
      })
    );
  }

  public async delete(
    payload: UserDeleteRequestDto
  ): Promise<UserDeleteResponseDto> {
    const { id } = payload;
    return await this.userRepository.deleteOne(id);
  }
}

export { User };
