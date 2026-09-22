import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { Task } from '../models/Task.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const listTasks = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    return successResponse(res, tasks);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const { title, timeString, dueDate, priority, category, tag } = req.body;
    const task = await Task.create({
      userId,
      title,
      timeString: timeString || 'Today · 7:00 PM',
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      priority: priority || 'medium',
      category: category || 'today',
      tag: tag || 'General',
      completed: false,
    });
    return successResponse(res, task, 'Task created', 201);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId || 'demo-user-1';
    const updated = await Task.findOneAndUpdate(
      { _id: id, userId },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return errorResponse(res, 'Task not found', 404);
    return successResponse(res, updated, 'Task updated');
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId || 'demo-user-1';
    await Task.findOneAndDelete({ _id: id, userId });
    return successResponse(res, { deleted: true }, 'Task deleted');
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};
