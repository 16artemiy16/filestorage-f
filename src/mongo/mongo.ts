import { Collection, Db, MongoClient } from 'mongodb';

export class Mongo {
  static db: Db | undefined;

  static collection(name: string): Collection | undefined {
    return Mongo.db?.collection(name);
  }

  static async connect(uri: string) {
    const client = new MongoClient(uri);
    await client.connect();
    Mongo.db = client.db();
  }
}
