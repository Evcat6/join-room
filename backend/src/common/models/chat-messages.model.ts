import { Model, type RelationMappings } from 'objection';

import { ModelNames } from '../enums/enums';
import { ChatModel, MessageModel } from './models';

class ChatMessagesModel extends Model {
  public static override get tableName(): string {
    return ModelNames.CHAT_MESSAGES;
  }

  public static override relationMappings = (): RelationMappings => ({
    chat: {
      relation: Model.BelongsToOneRelation,
      modelClass: ChatModel,
      join: {
        from: 'chat_messages.chat_id',
        to: 'chats.id',
      },
    },
    message: {
      relation: Model.BelongsToOneRelation,
      modelClass: MessageModel,
      join: {
        from: 'chat_messages.message_id',
        to: 'messages.id',
      },
    },
  });
}

export { ChatMessagesModel };
