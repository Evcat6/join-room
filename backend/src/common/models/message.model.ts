import { Model, type RelationMappings } from 'objection';

import { ModelNames } from '../enums/models.enum.js';
import { Abstract, ChatModel, UserModel } from './models.js';

class MessageModel extends Abstract {
  public 'userId': string;

  public 'text': string;

  public 'imageUrl': string;

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
