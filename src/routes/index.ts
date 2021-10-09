import utilRoutes from './util.routes';
import storageRoutes from './storage.routes';
import { FastifyInstance } from 'fastify/types/instance';
import fp from 'fastify-plugin';

const allRoutes = async (fastify: FastifyInstance) => {
  fastify.register(utilRoutes);
  fastify.register(storageRoutes);
};

export default fp(allRoutes);
