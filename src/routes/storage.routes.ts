import { FastifyInstance } from 'fastify/types/instance';
import fp from 'fastify-plugin';
import { Mongo } from '../mongo/mongo';
import { Readable } from 'stream';
import { ObjectId } from 'mongodb';

const routes = async (fastify: FastifyInstance) => {
  fastify.get('/file/:id', async (req, reply) => {
    const { id } = req.params as any;
    const objectId = new ObjectId(id);
    const file = await Mongo.bucket.find({ _id: objectId })
      .toArray()
      .then((files) => files[0]);

    if (!file) {
      return reply.code(404).send({
        success: false,
        msg: 'The file with the given id does not exist'
      });
    }

    if (!file.contentType) {
      return reply.code(404).send({ success: false, msg: 'The content type is not set for the file' });
    }

    const downloadStream = Mongo.bucket.openDownloadStream(objectId);

    return reply.type(file.contentType).send(downloadStream);
  });

  fastify.post('/file', async (req, reply) => {
    const data = await req.file();
    const { filename, mimetype } = data;

    const buff = await data.toBuffer();
    const readablePhotoStream = new Readable();

    readablePhotoStream.push(buff);
    readablePhotoStream.push(null);

    const uploadStream = Mongo.bucket.openUploadStream(filename, { contentType: mimetype });
    const fileId = uploadStream.id;

    readablePhotoStream.pipe(uploadStream);

    uploadStream.on('error', (err) => {
      return reply.status(500).send({
        msg: err.message,
        success: false
      });
    });

    uploadStream.on('finish', () => {
      return reply.status(201).send({
        fileId,
        msg: "File uploaded successfully",
      });
    });
  });

  fastify.delete('/file/:id', async (req, reply) => {
    const { id } = req.params as any;
    await Mongo.bucket.delete(new ObjectId(id));
    return { success: true, msg: 'The file has been removed' };
  });
};

export default fp(routes);
