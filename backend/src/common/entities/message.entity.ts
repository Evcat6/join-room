import { type IEntity } from '@/common/interfaces/interfaces';

class MessageEntity implements IEntity {
  private 'id': string | null;

  private 'userId': string;

  private 'text'?: string;

  private 'imageUrl'?: string;

  private constructor({
    id,
    userId,
    text,
    imageUrl,
  }: {
    id: string | null;
    userId: string;
    text?: string;
    imageUrl?: string;
  }) {
    this.id = id;
    this.userId = userId;
    this.text = text;
    this.imageUrl = imageUrl;
  }

  public static initialize({
    id,
    userId,
    text,
    imageUrl,
  }: {
    id: string | null;
    userId: string;
    text?: string;
    imageUrl?: string;
  }): MessageEntity {
    return new MessageEntity({
      id,
      userId,
      text,
      imageUrl,
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
    });
  }

  public toObject(): {
    id: string;
    userId: string;
    text?: string;
    imageUrl?: string;
  } {
    return {
      id: this.id as string,
      userId: this.userId,
      text: this.text,
      imageUrl: this.imageUrl,
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
