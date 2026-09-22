import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { authService } from '../services/authService.js';
import { User } from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const register = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register({ name, email, password });
    return successResponse(res, result, 'User registered successfully', 201);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Registration failed', 400);
  }
};

export const login = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return successResponse(res, result, 'Login successful');
  } catch (err: any) {
    return errorResponse(res, err.message || 'Login failed', 401);
  }
};

export const logout = async (_req: AuthenticatedRequest, res: Response) => {
  return successResponse(res, { loggedOut: true }, 'Logged out successfully');
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return errorResponse(res, 'User not authenticated', 401);

    const user = await User.findById(userId).select('-password');
    if (!user) {
      // Fallback for demo session
      return successResponse(res, {
        id: userId,
        name: req.user?.name || 'Alex Vance',
        email: req.user?.email || 'alex.vance@nova.ai',
        role: 'user',
        bio: 'Principal Software Architect & AI Explorer',
      });
    }

    return successResponse(res, user);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { name, bio, avatar } = req.body;
    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: { name, bio, avatar } },
      { new: true }
    ).select('-password');
    return successResponse(res, updated, 'Profile updated successfully');
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const changePassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return errorResponse(res, 'Unauthorized', 401);

    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(userId, currentPassword, newPassword);
    return successResponse(res, { updated: true }, 'Password changed successfully');
  } catch (err: any) {
    return errorResponse(res, err.message, 400);
  }
};
