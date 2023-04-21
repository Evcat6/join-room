// eslint-disable-next-line no-restricted-syntax
import type Bcrypt from 'bcrypt';

import { USER_PASSWORD_SALT_ROUNDS } from '@/common/constants/constants.js';

type EncryptSyncReturnType = {
  salt: string;
  hash: string;
};

class Crypt {
  private bcrypt: typeof Bcrypt;

  public constructor(bcrypt: typeof Bcrypt) {
    this.bcrypt = bcrypt;
  }

  public createSaltSync(): string {
    return this.bcrypt.genSaltSync(USER_PASSWORD_SALT_ROUNDS);
  }

  public encryptSync(data: string): EncryptSyncReturnType {
    const salt = this.createSaltSync();
    const hash = this.bcrypt.hashSync(data, salt);
    return { salt, hash };
  }

  public compareSyncPassword(password: string, hash: string): boolean {
    return this.bcrypt.compareSync(password, hash);
  }
}

export { Crypt };
