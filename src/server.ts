import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import AuthorRoutes from './routes/AuthorRoutes';
import BookRoutes from './routes/BookRoutes';

const router = express();

mongoose
  .connect(config.mongo.uri, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log('Connected');
    startServer();
  })
  .catch((error) => {
    console.log(error);
  });

const startServer = () => {
  router.use((req, res, next) => {
    console.log(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      console.log(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  // RULES OF API
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  // ROUTES
  router.use('/author', AuthorRoutes);
  router.use('/book', BookRoutes);

  // HEALTH CHECK
  router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

  // ERROR HANDLING
  router.use((req, res, next) => {
    const error = new Error('Not Found');
    console.log(error);

    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => console.log(`SERVER IS RUNNING ON PORT ${config.server.port}`));
};
