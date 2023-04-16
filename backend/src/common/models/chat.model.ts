import { Model, type RelationMappings } from 'objection';

import { ModelNames } from '../enums/enums';
import { MessageModel, UserModel } from './models';

class ChatModel extends Model {
  public static override get tableName(): string {
    return ModelNames.CHATS;
  }

  public static override relationMappings = (): RelationMappings => ({
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: UserModel,
      join: {
        from: 'chats.id',
        through: {
          from: 'users_chats.chat_id',
          to: 'users_chats.user_id',
        },
        to: 'users.id',
      },
    },
    messages: {
      relation: Model.ManyToManyRelation,
      modelClass: MessageModel,
      join: {
        from: 'chats.id',
        through: {
          from: 'chat_messages.chat_id',
          to: 'chat_messages.message_id',
        },
        to: 'messages.id',
      },
    },
  });
}

export { ChatModel };
