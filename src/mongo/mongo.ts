import { Collection, Db, MongoClient, GridFSBucket } from 'mongodb';

export class Mongo {
  static db: Db;
  static bucket: GridFSBucket;

  static collection(name: string): Collection | undefined {
    return Mongo.db?.collection(name);
  }

  static async connect(uri: string) {
    const client = new MongoClient(uri);
    await client.connect();
    Mongo.db = client.db();
    Mongo.bucket = new GridFSBucket(Mongo.db, { bucketName: 'files' });
  }
}
