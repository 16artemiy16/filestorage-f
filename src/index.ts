import Fastify from 'fastify';
import { config } from 'dotenv';
import allRoutes from './routes';

config();

export const { APP_PORT } = process.env as Record<string, string | number>;

const fastify = Fastify();

fastify.register(allRoutes);

fastify.listen(APP_PORT, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})
