import { Model, type RelationMappings } from 'objection';

import { ModelNames } from '../enums/enums';
import { Abstract, ChatModel, MessageModel } from './models';

class UserModel extends Abstract {
  public 'name': string;

  public 'username': string;

  public 'email': string;

  public 'phoneNumber': string;

  public 'birth': string;

  public 'isPrivate': boolean;

  public 'avatarUrl': string;

  public 'passwordHash': string;

  public 'passwordSalt': string;

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
