import { Model, type RelationMappings } from 'objection';

import { ModelNames } from '../enums/models.enum';
import { ChatModel, UserModel } from './models';

class MessageModel extends Model {
  public static override get tableName(): string {
    return ModelNames.MESSAGES;
  }

  public static override relationMappings = (): RelationMappings => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'messages.user_id',
        to: 'users.id',
      },
    },
    chats: {
      relation: Model.ManyToManyRelation,
      modelClass: ChatModel,
      join: {
        from: 'messages.id',
        through: {
          from: 'chat_messages.message_id',
          to: 'chat_messages.chat_id',
        },
        to: 'chats.id',
      },
    },
  });
}

export { MessageModel };
