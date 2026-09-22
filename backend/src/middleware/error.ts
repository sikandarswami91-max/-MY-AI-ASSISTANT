import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error('Unhandled Server Exception:', err);

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    errorResponse(res, `A record with that ${field} already exists.`, 409);
    return;
  }

  // Mongoose CastError (e.g. invalid ObjectId format)
  if (err.name === 'CastError') {
    errorResponse(res, `Resource not found with id: ${err.value}`, 404);
    return;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    errorResponse(res, 'Invalid token provided.', 401);
    return;
  }
  if (err.name === 'TokenExpiredError') {
    errorResponse(res, 'Authentication token expired.', 401);
    return;
  }

  const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500;
  const message = err.message || 'Internal server error';

  errorResponse(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : undefined);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  errorResponse(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
};
