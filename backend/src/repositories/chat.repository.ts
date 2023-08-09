import { ChatEntity } from '@/common/entities/entities.js';
import { type ChatModel } from '@/common/models/models.js';

class ChatRepository {
  private chatModel: typeof ChatModel;

  public constructor(chatModel: typeof ChatModel) {
    this.chatModel = chatModel;
  }

  public async findAll(): Promise<ChatEntity[]> {
    const users = await this.chatModel.query().execute();

    return users.map((it) => ChatEntity.initialize(it));
  }

  public async findOne(data: object): Promise<ChatEntity | undefined> {
    const user = await this.chatModel.query().where(data).first().execute();
    if (!user) {
      return undefined;
    }
    return ChatEntity.initialize(user);
  }

  public async create(payload: ChatEntity): Promise<ChatEntity> {
    const data = payload.toNewObject();
    const user = await this.chatModel
      .query()
      .insert(data)
      .returning('*')
      .execute();
    return ChatEntity.initialize(user);
  }
}

export { ChatRepository };
