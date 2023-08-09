import { type IEntity } from '@/common/interfaces/interfaces';

class ChatEntity implements IEntity {
  private 'id': string | null;

  private 'chatAdminId': string;

  private 'chatAvatarUrl'?: string;

  private 'name': string;

  private 'defaultBackgroundColor'?: string;

  private 'description'?: string;

  private constructor({
    id,
    chatAdminId,
    chatAvatarUrl,
    name,
    description,
    defaultBackgroundColor,
  }: {
    id: string | null;
    chatAdminId: string;
    chatAvatarUrl?: string;
    name: string;
    description?: string;
    defaultBackgroundColor?: string;
  }) {
    this.id = id;
    this.chatAdminId = chatAdminId;
    this.chatAdminId = chatAdminId;
    this.chatAvatarUrl = chatAvatarUrl;
    this.name = name;
    this.description = description;
    this.defaultBackgroundColor = defaultBackgroundColor;
  }

  public static initialize({
    id,
    chatAdminId,
    chatAvatarUrl,
    name,
    description,
    defaultBackgroundColor,
  }: {
    id: string;
    chatAdminId: string;
    chatAvatarUrl?: string;
    name: string;
    description?: string;
    defaultBackgroundColor: string;
  }): ChatEntity {
    return new ChatEntity({
      id,
      chatAdminId,
      chatAvatarUrl,
      name,
      description,
      defaultBackgroundColor,
    });
  }

  public static initializeNew({
    chatAdminId,
    chatAvatarUrl,
    name,
    description,
    defaultBackgroundColor,
  }: {
    chatAdminId: string;
    chatAvatarUrl?: string;
    name: string;
    description?: string;
    defaultBackgroundColor?: string;
  }): ChatEntity {
    return new ChatEntity({
      id: null,
      chatAdminId,
      chatAvatarUrl,
      name,
      description,
      defaultBackgroundColor,
    });
  }

  public toObject(): {
    id: string;
    chatAdminId: string;
    chatAvatarUrl?: string;
    name: string;
    description?: string;
    defaultBackgroundColor?: string;
  } {
    return {
      id: this.id as string,
      chatAdminId: this.chatAdminId,
      chatAvatarUrl: this.chatAvatarUrl,
      name: this.name,
      description: this.description,
      defaultBackgroundColor: this.defaultBackgroundColor,
    };
  }

  public toNewObject(): {
    chatAdminId: string;
    chatAvatarUrl?: string;
    name: string;
    description?: string;
    defaultBackgroundColor?: string;
  } {
    return {
      chatAdminId: this.chatAdminId,
      chatAvatarUrl: this.chatAvatarUrl,
      description: this.description,
      name: this.name,
      defaultBackgroundColor: this.defaultBackgroundColor,
    };
  }
}

export { ChatEntity };
