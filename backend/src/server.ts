import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
  const app = createApp();

  // Attempt database connection
  await connectDB();

  const server = app.listen(ENV.PORT, () => {
    logger.info(`====================================================`);
    logger.info(` NOVA AI Assistant Backend running in [${ENV.NODE_ENV}] mode`);
    logger.info(` Listening on Port: ${ENV.PORT}`);
    logger.info(` Health check endpoint: http://localhost:${ENV.PORT}/api/health`);
    logger.info(`====================================================`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    logger.info('Received termination signal. Closing HTTP server gracefully...');
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer().catch((err) => {
  console.error('Fatal initialization error:', err);
  process.exit(1);
});
