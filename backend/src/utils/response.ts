import { Response } from 'express';
import { ApiResponse } from '../types/index.js';

export const successResponse = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
): Response => {
  const body: ApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(body);
};

export const errorResponse = (
  res: Response,
  message = 'Internal server error',
  statusCode = 500,
  error?: any
): Response => {
  const body: ApiResponse = {
    success: false,
    message,
    error: error instanceof Error ? error.message : error,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(body);
};
