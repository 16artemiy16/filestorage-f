import {
  GridFSBucketReadStream,
  GridFSBucketReadStreamOptions, GridFSBucketWriteStream,
  GridFSBucketWriteStreamOptions,
  ObjectId
} from 'mongodb';
import { MongoService } from '@services/mongo.service';
import isString from '@utils/is-string.util';

type ID = string | ObjectId;

class FilesService {
  private static _instance: FilesService | undefined;

  private constructor() {}

  static get instance(): FilesService {
    if (!this._instance) {
      this._instance = new FilesService();
    }
    return this._instance;
  }

  async getById(id: ID): Promise<any> {
    const _id = isString(id) ? new ObjectId(id) : id as ObjectId;
    return await MongoService.bucket.find({ _id })
      .toArray()
      .then((items) => items[0]);
  }

  async delete(id: ID): Promise<any> {
    const _id = isString(id) ? new ObjectId(id) : id as ObjectId;
    return await MongoService.bucket.delete(_id);
  }

  openDownloadStream(id: ID, options?: GridFSBucketReadStreamOptions): GridFSBucketReadStream {
    const _id = isString(id) ? new ObjectId(id) : id as ObjectId;
    return MongoService.bucket.openDownloadStream(_id, options);
  }

  openUploadStream(filename: string, options?: GridFSBucketWriteStreamOptions): GridFSBucketWriteStream {
    return MongoService.bucket.openUploadStream(filename, options);
  }
}

export default FilesService.instance;
