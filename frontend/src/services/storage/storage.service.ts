import { type StorageKey } from '@/common/enums/storage-key.enum';

class Storage {
  private store: globalThis.Storage;

  public constructor(store: globalThis.Storage) {
    this.store = store;
  }

  public set(key: StorageKey, value: string): void {
    this.store.setItem(key, value);
  }

  public get(key: StorageKey): string | null {
    return this.store.getItem(key);
  }

  public drop(key: StorageKey): void {
    this.store.removeItem(key);
  }

  public has(key: StorageKey): boolean {
    const value = this.get(key);

    return Boolean(value);
  }

  public clear(): void {
    this.store.clear();
  }
}

export { Storage };
