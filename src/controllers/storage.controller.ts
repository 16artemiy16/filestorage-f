import { FastifyRequest } from 'fastify/types/request';
import { FastifyReply } from 'fastify/types/reply';
import { Readable } from 'stream';
import filesService from '@services/files.service';

export const getById = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as any;

  const file = await filesService.getById(id);

  if (!file) {
    return reply.code(404).send({
      success: false,
      msg: 'The file with the given id does not exist'
    });
  }

  if (!file.contentType) {
    return reply.code(404).send({ success: false, msg: 'The content type is not set for the file' });
  }

  const downloadStream = filesService.openDownloadStream(id);

  return reply.type(file.contentType).send(downloadStream);
};

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  const data = await req.file();
  const { filename, mimetype } = data;

  const buff = await data.toBuffer();
  const readablePhotoStream = new Readable();

  readablePhotoStream.push(buff);
  readablePhotoStream.push(null);

  const uploadStream = filesService.openUploadStream(filename, { contentType: mimetype });
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
};

export const remove = async (req: FastifyRequest) => {
  const { id } = req.params as any;
  await filesService.delete(id);

  return { success: true, msg: 'The file has been removed' };
}
