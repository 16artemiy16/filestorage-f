import fastify from 'fastify';
import { config } from 'dotenv';

config();

export const { APP_PORT } = process.env as Record<string, string | number>;

const server = fastify();

server.get('/ping', async (req, reply) => {
  return 'pong!';
});

server.listen(APP_PORT, (err, address) => {
  console.log('server', err, address);
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})
