import { UserEntity } from '@/common/entities/user.entity.js';
import { type UserModel } from '@/common/models/models.js';
import { type UserDeleteResponseDto } from '@/common/types/types.js';

class UserRepository {
  private userModel: typeof UserModel;

  public constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.query().execute();

    return users.map((it) => UserEntity.initialize(it));
  }

  public async findOne(data: object): Promise<UserEntity | undefined> {
    const user = await this.userModel.query().where(data).first().execute();
    if (!user) {
      return undefined;
    }
    return UserEntity.initialize(user);
  }

  public async create(payload: UserEntity): Promise<UserEntity> {
    const { email, passwordHash, passwordSalt } = payload.toNewObject();
    const user = await this.userModel
      .query()
      .insert({ email, passwordHash, passwordSalt })
      .returning('*')
      .execute();
    return UserEntity.initialize(user);
  }

  public async deleteOne(id: string): Promise<UserDeleteResponseDto> {
    await this.userModel.query().deleteById(id).execute();
    return { id };
  }
}

export { UserRepository };
