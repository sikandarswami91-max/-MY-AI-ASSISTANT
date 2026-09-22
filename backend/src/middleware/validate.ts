import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { errorResponse } from '../utils/response.js';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const issues = (err as any).errors || (err as any).issues || [];
        const details = issues.map((e: any) => ({
          field: e.path ? e.path.join('.') : 'root',
          message: e.message,
        }));
        errorResponse(res, 'Validation failed for request payload', 400, details);
        return;
      }
      next(err);
    }
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query) as any;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const issues = (err as any).errors || (err as any).issues || [];
        const details = issues.map((e: any) => ({
          field: e.path ? e.path.join('.') : 'root',
          message: e.message,
        }));
        errorResponse(res, 'Validation failed for query parameters', 400, details);
        return;
      }
      next(err);
    }
  };
};
