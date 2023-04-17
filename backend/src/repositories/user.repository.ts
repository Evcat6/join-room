import { UserEntity } from '@/common/entities/user.entity.js';
import { type UserModel } from '@/common/models/models.js';

class UserRepository {
  private userModel: typeof UserModel;

  public constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.query().execute();

    return users.map((it) => UserEntity.initialize(it));
  }
}

export { UserRepository };
