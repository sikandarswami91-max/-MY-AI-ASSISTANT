import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { Reminder } from '../models/Reminder.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const listReminders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const reminders = await Reminder.find({ userId }).sort({ dateTime: 1 });
    return successResponse(res, reminders);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const createReminder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const { title, dateTime, isRepeat, repeatInterval } = req.body;
    const reminder = await Reminder.create({
      userId,
      title,
      dateTime: new Date(dateTime),
      isRepeat: isRepeat || false,
      repeatInterval,
      status: 'pending',
    });
    return successResponse(res, reminder, 'Reminder scheduled', 201);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateReminder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId || 'demo-user-1';
    const updated = await Reminder.findOneAndUpdate(
      { _id: id, userId },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return errorResponse(res, 'Reminder not found', 404);
    return successResponse(res, updated, 'Reminder updated');
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const deleteReminder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId || 'demo-user-1';
    await Reminder.findOneAndDelete({ _id: id, userId });
    return successResponse(res, { deleted: true }, 'Reminder deleted');
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};
