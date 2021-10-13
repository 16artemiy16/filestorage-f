import { FastifyInstance } from 'fastify/types/instance';
import fp from 'fastify-plugin';
import utilRoutes from '@routes/util.routes';
import storageRoutes from '@routes/storage.routes';

const allRoutes = async (fastify: FastifyInstance) => {
  fastify.register(utilRoutes);
  fastify.register(storageRoutes);
};

export default fp(allRoutes);
