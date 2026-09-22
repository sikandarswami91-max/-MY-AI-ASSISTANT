import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { Note } from '../models/Note.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const listNotes = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const notes = await Note.find({ userId }).sort({ isPinned: -1, updatedAt: -1 });
    return successResponse(res, notes);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const createNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const { title, content, category, tags, isPinned, isFavorite } = req.body;
    const note = await Note.create({
      userId,
      title,
      content: content || '',
      category: category || 'General',
      tags: tags || [],
      isPinned: isPinned || false,
      isFavorite: isFavorite || false,
    });
    return successResponse(res, note, 'Note created', 201);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId || 'demo-user-1';
    const updated = await Note.findOneAndUpdate(
      { _id: id, userId },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return errorResponse(res, 'Note not found', 404);
    return successResponse(res, updated, 'Note updated');
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const deleteNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId || 'demo-user-1';
    await Note.findOneAndDelete({ _id: id, userId });
    return successResponse(res, { deleted: true }, 'Note deleted');
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};
