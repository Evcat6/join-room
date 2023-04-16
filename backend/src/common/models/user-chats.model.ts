import { Model, type RelationMappings } from 'objection';

import { ModelNames } from '../enums/enums';
import { ChatModel, UserModel } from './models';

class UserChatsModel extends Model {
  public static get tableName(): string {
    return ModelNames.USERS_CHATS;
  }

  public static override relationMappings = (): RelationMappings => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'users_chats.user_id',
        to: 'users.id',
      },
    },
    chat: {
      relation: Model.BelongsToOneRelation,
      modelClass: ChatModel,
      join: {
        from: 'users_chats.chat_id',
        to: 'chats.id',
      },
    },
  });
}

export { UserChatsModel };
