import { MessageEntity } from '@/common/entities/entities.js';
import { type ChatMessageCreateRequestDto } from '@/common/types/types.js';
import { type ChatMessages as ChatMessagesRepository } from '@/repositories/chat-messages.repository.js';

class ChatMessages {
  private chatMessagesRepository: ChatMessagesRepository;

  public constructor(chatMessagesRepository: ChatMessagesRepository) {
    this.chatMessagesRepository = chatMessagesRepository;
  }

  public async createChatMessage(
    payload: ChatMessageCreateRequestDto,
    userId: string
  ): Promise<MessageEntity> {
    return await this.chatMessagesRepository.createChatMessage(
      MessageEntity.initializeNew({
        userId,
        text: payload.text,
        imageUrl: payload.imageUrl,
      }),
      payload.chatId
    );
  }

  public async getAllMessages(
    chatId: string
  ): Promise<MessageEntity[] | undefined> {
    return await this.chatMessagesRepository.getAllChatMessages(chatId);
  }

  public async getLastMessage(
    chatId: string
  ): Promise<MessageEntity | undefined> {
    return await this.chatMessagesRepository.getLastChatMessage(chatId);
  }
}

export { ChatMessages };
