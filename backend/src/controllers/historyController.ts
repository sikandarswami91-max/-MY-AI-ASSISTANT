import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { ChatHistory } from '../models/ChatHistory.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const listHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const history = await ChatHistory.find({ userId }).sort({ lastActive: -1 });
    return successResponse(res, history);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const deleteHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId || 'demo-user-1';
    await ChatHistory.findOneAndDelete({ _id: id, userId });
    return successResponse(res, { deleted: true }, 'History item removed');
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};
