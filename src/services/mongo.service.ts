import { Collection, Db, MongoClient, GridFSBucket } from 'mongodb';

export class MongoService {
  static db: Db;
  static bucket: GridFSBucket;

  static collection(name: string): Collection | undefined {
    return MongoService.db?.collection(name);
  }

  static async connect(uri: string) {
    const client = new MongoClient(uri);
    await client.connect();
    MongoService.db = client.db();
    MongoService.bucket = new GridFSBucket(MongoService.db, { bucketName: 'files' });
  }
}
