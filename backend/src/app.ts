import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { ENV } from './config/env.js';
import apiRouter from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';

export const createApp = (): Application => {
  const app = express();

  // 1. Security & Core Middleware
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow all local development origins & preview URLs
        if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('run.app')) {
          callback(null, true);
        } else {
          callback(null, true);
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // 2. Logging
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // 3. Body Parsing
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // 4. Static Uploads
  const uploadPath = path.resolve(process.cwd(), ENV.UPLOAD_DIR);
  app.use('/uploads', express.static(uploadPath));

  // 5. REST API routes
  app.use('/api', apiRouter);

  // 6. Error & Not Found Handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
