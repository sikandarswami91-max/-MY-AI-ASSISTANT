import { Request, Response } from 'express';
import { getDBStatus } from '../config/db.js';
import { successResponse } from '../utils/response.js';

const startTime = Date.now();

export const healthCheck = (_req: Request, res: Response) => {
  const dbStatus = getDBStatus();
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  return successResponse(
    res,
    {
      status: 'healthy',
      server: 'NOVA AI Virtual Assistant Backend',
      version: '1.0.0',
      uptime: `${uptimeSeconds}s`,
      database: dbStatus,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    },
    'NOVA AI Backend is online and operational'
  );
};
