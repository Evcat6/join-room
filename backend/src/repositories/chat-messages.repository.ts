import { MessageEntity } from '@/common/entities/entities.js';
import {
  type ChatMessagesModel,
  type ChatModel,
  type MessageModel,
} from '@/common/models/models.js';

class ChatMessages {
  private chatModel: typeof ChatModel;
  private chatMessagesModel: typeof ChatMessagesModel;
  private messageModel: typeof MessageModel;

  public constructor(
    chatModel: typeof ChatModel,
    chatMessagesModel: typeof ChatMessagesModel,
    messageModel: typeof MessageModel
  ) {
    this.chatModel = chatModel;
    this.chatMessagesModel = chatMessagesModel;
    this.messageModel = messageModel;
  }

  private async createMessage(payload: MessageEntity): Promise<MessageEntity> {
    const newMessage = payload.toNewObject();
    const message = await this.messageModel
      .query()
      .insert(newMessage)
      .returning('*')
      .execute();
    return MessageEntity.initialize(message);
  }

  public async createChatMessage(
    payload: MessageEntity,
    chatId: string
  ): Promise<MessageEntity> {
    const message = await this.createMessage(payload);

    const { id: messageId } = message.toObject();
    await this.chatMessagesModel
      .query()
      .insert({ messageId, chatId })
      .execute();
    return message;
  }

  public async getAllChatMessages(
    chatId: string
  ): Promise<MessageEntity[] | undefined> {
    const chat = await this.chatModel
      .query()
      .findById(chatId)
      .withGraphFetched('messages')
      .execute();
    return chat?.messages.map((it) => MessageEntity.initialize(it));
  }

  public async getLastChatMessage(
    chatId: string
  ): Promise<MessageEntity | undefined> {
    const chat = await this.chatModel
      .query()
      .findById(chatId)
      .joinRelated('messages')
      .orderBy('messages.created_at', 'desc')
      .limit(1)
      .withGraphFetched('messages')
      .execute();

    return chat?.messages[0]
      ? MessageEntity.initialize(chat.messages[0])
      : undefined;
  }
}

export { ChatMessages };
