const mongoose = require('mongoose');
const app = require('./app');
// const config = require('./config/config');
const logger = require('./config/logger');

let server;
const PORT = process.env.PORT || 3000;
const mongooseOptions = {};
mongoose
  .connect(process.env.MONGODB_URL, mongooseOptions)
  .then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(PORT, () => {
      logger.info(`Listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
