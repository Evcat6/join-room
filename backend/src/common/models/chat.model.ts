import { Model, type RelationMappings } from 'objection';

import { ModelNames } from '../enums/enums.js';
import { getRandomPastelHexColor } from '../helpers/helpers.js';
import { Abstract, MessageModel, UserModel } from './models.js';

class ChatModel extends Abstract {
  public 'chatAdminId': string;

  public 'chatAvatarUrl': string;

  public 'name': string;

  public 'description': string;

  public 'isPrivate': boolean;

  public 'defaultBackgroundColor': string;

  public 'messages': MessageModel[];

  public static override get tableName(): string {
    return ModelNames.CHATS;
  }

  public override $beforeInsert(): void {
    const insertDate = new Date().toISOString();

    this.createdAt = insertDate;
    this.updatedAt = insertDate;
    this.defaultBackgroundColor = getRandomPastelHexColor();
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
