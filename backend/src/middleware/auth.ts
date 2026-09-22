import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { verifyToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/response.js';

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    errorResponse(res, 'Authentication required. Missing Bearer token.', 401);
    return;
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);

  if (!payload) {
    errorResponse(res, 'Invalid or expired authentication token.', 401);
    return;
  }

  req.user = payload;
  next();
};

/**
 * Optional Auth middleware:
 * If token present and valid, attaches user.
 * If not present or invalid, creates a safe default demo session user so the app never crashes during prototyping.
 */
export const optionalAuth = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    if (payload) {
      req.user = payload;
      return next();
    }
  }

  // Fallback demo user context
  req.user = {
    userId: 'demo-user-1',
    email: 'demo@nova.ai',
    name: 'Alex Vance',
    role: 'user',
  };

  next();
};
