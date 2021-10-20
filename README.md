# filestorage-f

Simple file server uses 
[Fastify](https://www.fastify.io), 
[MongoDB](https://www.mongodb.com/) + [GridFS](https://docs.mongodb.com/manual/core/gridfs/).

## Set up
### Environment  variables
Create `.env` in the root directory and set the next fields:

- `APP_PORT` - port in which the app will run

- `MONGODB_URI` - mongodb URI

You can use the example below for local environment:
```
APP_PORT=3001
MONGODB_URI=mongodb://localhost:27017/filestorage-f
```

### Packages installation
Run `npm i` to install all dependencies.

## Run
Run `npm start` to start the app in watch mode.

