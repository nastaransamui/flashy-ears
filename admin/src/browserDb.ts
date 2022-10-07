import Dexie, { Table } from 'dexie';

export interface RoutesDbType {
  id?: string;
  name: string;
  access: boolean;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  routesDb!: Table<RoutesDbType>;

  constructor() {
    super('routesDatabase');
    this.version(1).stores({
      routesDb: '++id, name, access', // Primary key and indexed props
    });
  }
}
export const db = new MySubClassedDexie();
