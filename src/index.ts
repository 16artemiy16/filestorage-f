import 'module-alias/register';

import Fastify from 'fastify';
import { config } from 'dotenv';
import multipart from 'fastify-multipart';

import allRoutes from '@routes/index';
import { MongoService } from '@services/mongo.service';

config();

const {
  APP_PORT,
  MONGODB_URI
} = process.env as Record<string, string | number>;

const fastify = Fastify()
  .register(multipart)
  .register(allRoutes);

MongoService.connect(MONGODB_URI as string).then(() => {
  fastify.listen(APP_PORT, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
});
