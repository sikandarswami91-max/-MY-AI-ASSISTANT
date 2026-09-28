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

  // Fallback demo user context.
  // NOTE: userId must be a valid 24-hex MongoDB ObjectId — the Chat/Message/etc.
  // schemas store userId as ObjectId, and a non-ObjectId like 'demo-user-1'
  // made every create/find throw a CastError (HTTP 500).
  req.user = {
    userId: '64b000000000000000000001',
    email: 'demo@nova.ai',
    name: 'Alex Vance',
    role: 'user',
  };

  next();
};
