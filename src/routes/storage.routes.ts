import { FastifyInstance } from 'fastify/types/instance';
import fp from 'fastify-plugin';
import { getById, create, remove } from '@controllers/storage.controller';

const routes = async (fastify: FastifyInstance) => {
  fastify.get('/file/:id', getById);
  fastify.post('/file', create);
  fastify.delete('/file/:id', remove);
};

export default fp(routes);
