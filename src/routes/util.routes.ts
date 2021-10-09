import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify/types/instance';

const routes = async (fastify: FastifyInstance) => {
  fastify.get('/ping', async () => {
    return { success: true, msg: 'Pong!' };
  });
};

export default fp(routes);
