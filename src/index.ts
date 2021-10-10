import Fastify from 'fastify';
import { config } from 'dotenv';
import allRoutes from './routes';
import mongo, { MongoClient } from 'mongodb';
import multipart from 'fastify-multipart';
import { Mongo } from './mongo/mongo';

config();

const {
  APP_PORT,
  MONGODB_URI
} = process.env as Record<string, string | number>;

const fastify = Fastify()
  .register(multipart)
  .register(allRoutes);

Mongo.connect(MONGODB_URI as string).then(() => {
  fastify.listen(APP_PORT, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
});
