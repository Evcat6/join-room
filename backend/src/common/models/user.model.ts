import { Model, type RelationMappings } from 'objection';

import { ModelNames } from '../enums/enums';
import { ChatModel, MessageModel } from './models';

class UserModel extends Model {
  public static get tableName(): string {
    return ModelNames.USERS;
  }

  public static override relationMappings = (): RelationMappings => ({
    chats: {
      relation: Model.ManyToManyRelation,
      modelClass: ChatModel,
      join: {
        from: 'users.id',
        through: {
          from: 'users_chats.user_id',
          to: 'users_chats.chat_id',
        },
        to: 'chats.id',
      },
    },
    messages: {
      relation: Model.HasManyRelation,
      modelClass: MessageModel,
      join: {
        from: 'users.id',
        to: 'messages.user_id',
      },
    },
  });
}

export { UserModel };
