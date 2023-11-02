import { ChatEntity } from '@/common/entities/chat.entity.js';
import {
  type ChatModel,
  type UserChatsModel,
  type UserModel,
} from '@/common/models/models.js';

class UserChats {
  private userModel: typeof UserModel;
  private chatModel: typeof ChatModel;
  private userChatsModel: typeof UserChatsModel;

  public constructor(
    userModel: typeof UserModel,
    chatModel: typeof ChatModel,
    userChatsModel: typeof UserChatsModel
  ) {
    this.chatModel = chatModel;
    this.userModel = userModel;
    this.userChatsModel = userChatsModel;
  }

  private async createChat(payload: ChatEntity): Promise<ChatEntity> {
    const newChat = payload.toNewObject();
    const chat = await this.chatModel
      .query()
      .insert(newChat)
      .returning('*')
      .execute();
    return ChatEntity.initialize(chat);
  }

  public async createUserChat(
    payload: ChatEntity,
    userId: string
  ): Promise<ChatEntity> {
    const chat = await this.createChat(payload);
    const { id: chatId } = chat.toObject();
    await this.addUserChat(chatId, userId);
    return chat;
  }

  private async hasUserChat(chatId: string, userId: string): Promise<boolean> {
    const chat = await this.chatModel
      .query()
      .findById(chatId)
      .where({ userId });
    return Boolean(chat);
  }

  public async joinUserChat(
    chatId: string,
    userId: string
  ): Promise<ChatEntity | undefined> {
    const checkIsChatExist = await this.hasUserChat(chatId, userId);
    if (checkIsChatExist) {
      return;
    }
    await this.addUserChat(chatId, userId);
    return await this.getOneUserChat(chatId, userId);
  }

  private async addUserChat(chatId: string, userId: string): Promise<void> {
    await this.userChatsModel
      .query()
      .insert({ userId, chatId })
      .returning('*')
      .execute();
  }

  public async getAllUserChats(
    userId: string
  ): Promise<ChatEntity[] | undefined> {
    const user = await this.userModel
      .query()
      .findById(userId)
      .withGraphFetched('chats')
      .execute();

    if (user) {
      return user.chats.map((it) => ChatEntity.initialize(it));
    }

    return undefined;
  }

  public async getOneUserChat(
    chatId: string,
    userId: string
  ): Promise<ChatEntity | undefined> {
    const user = await this.userModel
      .query()
      .findById(userId)
      .withGraphFetched('chats')
      .first()
      .execute();

    if (!user?.chats) {
      return undefined;
    }
    const chat = user.chats.find((chat) => chat.id === chatId);
    if (chat) {
      return ChatEntity.initialize(chat);
    }

    return undefined;
  }

  public async deleteOneUserChat(
    chatId: string,
    userId: string
  ): Promise<number> {
    return await this.chatModel
      .query()
      .findById(chatId)
      .where({ chatAdminId: userId })
      .delete();
  }
}

export { UserChats };
