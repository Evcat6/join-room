import { ChatEntity } from '@/common/entities/chat.entity.js';
import { type UserChatCreateRequestDto } from '@/common/types/types.js';
import { type UserChats as UserChatsRepository } from '@/repositories/user-chats.repository.js';

class UserChats {
  private userChatsRepository: UserChatsRepository;
  public constructor(userChatsRepository: UserChatsRepository) {
    this.userChatsRepository = userChatsRepository;
  }

  public async createUserChat(
    payload: UserChatCreateRequestDto,
    id: string
  ): Promise<ChatEntity> {
    return await this.userChatsRepository.createUserChat(
      ChatEntity.initializeNew({
        chatAdminId: id,
        chatAvatarUrl: payload.chatAvatarUrl,
        name: payload.name,
        description: payload.description,
      }),
      id
    );
  }

  public async joinChat(
    chatId: string,
    userId: string
  ): Promise<ChatEntity | undefined> {
    return await this.userChatsRepository.joinUserChat(chatId, userId);
  }

  public async getAllUserChats(id: string): Promise<ChatEntity[] | undefined> {
    return await this.userChatsRepository.getAllUserChats(id);
  }

  public async getOneUserChat(
    chatId: string,
    userId: string
  ): Promise<ChatEntity | undefined> {
    return await this.userChatsRepository.getOneUserChat(chatId, userId);
  }

  public async deleteOneUserChat(
    chatId: string,
    userId: string
  ): Promise<number> {
    return await this.userChatsRepository.deleteOneUserChat(chatId, userId);
  }
}

export { UserChats };
