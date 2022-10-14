import Dexie, { Table } from 'dexie';

export interface RoutesDbType {
  _id: string;
  state: string;
  access: boolean;
  update: boolean;
  delete: boolean;
  create: boolean;
}

export class MySubClassedDexie extends Dexie {
  routesDb!: Table<RoutesDbType>;

  constructor() {
    super('routesDatabase');
    this.version(1).stores({
      routesDb: '_id, state, access, update ,delete, create', // Primary key and indexed props
    });
  }
}
export const db = new MySubClassedDexie();
