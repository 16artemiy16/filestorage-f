import { FastifyInstance } from 'fastify/types/instance';
import fp from 'fastify-plugin';

const routes = async (fastify: FastifyInstance) => {
  fastify.get('/file', async () => {
    return { success: true, msg: 'GET file' };
  });
  fastify.post('/file', async () => {
    return { success: true, msg: 'POST file' };
  });
  fastify.delete('/file', async () => {
    return { success: true, msg: 'DELETE file' };
  });
};

export default fp(routes);
