import { type IEntity } from '@/common/interfaces/interfaces';

class MessageEntity implements IEntity {
  private 'id': string | null;

  private 'userId': string;

  private 'text'?: string;

  private 'imageUrl'?: string;

  private 'createdAt': string | null;

  private 'updatedAt': string | null;

  private constructor({
    id,
    userId,
    text,
    imageUrl,
    createdAt,
    updatedAt,
  }: {
    id: string | null;
    userId: string;
    text?: string;
    imageUrl?: string;
    createdAt: string | null;
    updatedAt: string | null;
  }) {
    this.id = id;
    this.userId = userId;
    this.text = text;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    userId,
    text,
    imageUrl,
    createdAt,
    updatedAt,
  }: {
    id: string | null;
    userId: string;
    text?: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
  }): MessageEntity {
    return new MessageEntity({
      id,
      userId,
      text,
      imageUrl,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    userId,
    text,
    imageUrl,
  }: {
    userId: string;
    text?: string;
    imageUrl?: string;
  }): MessageEntity {
    return new MessageEntity({
      id: null,
      userId,
      text,
      imageUrl,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: string;
    userId: string;
    text?: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
  } {
    return {
      id: this.id as string,
      userId: this.userId,
      text: this.text,
      imageUrl: this.imageUrl,
      createdAt: this.createdAt as string,
      updatedAt: this.updatedAt as string,
    };
  }

  public toNewObject(): {
    userId: string;
    text?: string;
    imageUrl?: string;
  } {
    return {
      userId: this.userId,
      text: this.text,
      imageUrl: this.imageUrl,
    };
  }
}

export { MessageEntity };
