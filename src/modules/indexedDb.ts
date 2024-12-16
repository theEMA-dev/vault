import data from '../data/metadata.json';

interface Asset {
  id: number;
  src: string;
  title: string;
  release: string;
  author: string;
  resolution: string;
  sgdb?: string;
  sdb?: string;
  attributes?: string[];
  tags: string[];
}

export class IndexedDbService {
  private dbName = 'vaultDb';
  private storeName = 'assets';
  private db: IDBDatabase | null = null;

  async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        this.populateStore().then(resolve).catch(reject);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  private async populateStore(): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(this.storeName, 'readwrite');
    const store = transaction.objectStore(this.storeName);

    for (const asset of data as Asset[]) {
      store.put(asset);
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log('All assets have been added to the store.');
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getAllAssets(): Promise<Asset[]> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}