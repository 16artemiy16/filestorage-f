import Fastify from 'fastify';
import { config } from 'dotenv';
import allRoutes from './routes';
import { MongoClient } from 'mongodb';

config();

const {
  APP_PORT,
  MONGODB_URI
} = process.env as Record<string, string | number>;

const fastify = Fastify();

fastify.register(allRoutes);

const mongoClient = new MongoClient(MONGODB_URI as string);

mongoClient.connect().then(() => {
  fastify.listen(APP_PORT, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
