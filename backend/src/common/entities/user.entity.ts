import { type IEntity } from '@/common/interfaces/interfaces';

class UserEntity implements IEntity {
  private 'id': string | null;

  private 'firstName'?: string;

  private 'lastName'?: string;

  private 'userName'?: string;

  private 'email': string;

  private 'phoneNumber'?: string;

  private 'birth'?: string;

  private 'passwordSalt': string;

  private 'passwordHash': string;

  private 'avatarUrl'?: string;

  private constructor({
    id,
    firstName,
    lastName,
    userName,
    email,
    phoneNumber,
    birth,
    passwordHash,
    passwordSalt,
    avatarUrl,
  }: {
    id: string | null;
    firstName?: string;
    lastName?: string;
    userName?: string;
    email: string;
    phoneNumber?: string;
    birth?: string;
    passwordHash: string;
    passwordSalt: string;
    avatarUrl?: string;
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.birth = birth;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.avatarUrl = avatarUrl;
  }

  public static initialize({
    id,
    firstName,
    lastName,
    userName,
    email,
    phoneNumber,
    birth,
    passwordHash,
    passwordSalt,
    avatarUrl,
  }: {
    id: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    email: string;
    phoneNumber?: string;
    birth?: string;
    passwordHash: string;
    passwordSalt: string;
    avatarUrl?: string;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
      userName,
      phoneNumber,
      birth,
      avatarUrl,
    });
  }

  public static initializeNew({
    firstName,
    lastName,
    userName,
    email,
    phoneNumber,
    birth,
    passwordHash,
    passwordSalt,
    avatarUrl,
  }: {
    firstName?: string;
    lastName?: string;
    userName?: string;
    email: string;
    phoneNumber?: string;
    birth?: string;
    passwordHash: string;
    passwordSalt: string;
    avatarUrl?: string;
  }): UserEntity {
    return new UserEntity({
      id: null,
      email,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
      phoneNumber,
      birth,
      avatarUrl,
      userName,
    });
  }

  public toObject(): {
    id: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    email: string;
    phoneNumber?: string;
    birth?: string;
    avatarUrl?: string;
  } {
    return {
      id: this.id as string,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      birth: this.birth,
      userName: this.userName,
      phoneNumber: this.phoneNumber,
      avatarUrl: this.avatarUrl,
    };
  }

  public toNewObject(): {
    firstName?: string;
    lastName?: string;
    userName?: string;
    email: string;
    phoneNumber?: string;
    birth?: string;
    passwordHash: string;
    passwordSalt: string;
    avatarUrl?: string;
  } {
    return {
      email: this.email,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
      firstName: this.firstName,
      lastName: this.lastName,
      birth: this.birth,
      phoneNumber: this.phoneNumber,
      avatarUrl: this.avatarUrl,
      userName: this.userName,
    };
  }
}

export { UserEntity };
