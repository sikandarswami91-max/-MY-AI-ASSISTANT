import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { UploadedFile } from '../models/UploadedFile.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const uploadFile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const file = req.file;

    if (!file) {
      return errorResponse(res, 'No file uploaded', 400);
    }

    let type: 'pdf' | 'image' | 'document' | 'code' = 'document';
    if (file.mimetype.includes('pdf')) type = 'pdf';
    else if (file.mimetype.startsWith('image/')) type = 'image';
    else if (file.originalname.match(/\.(ts|js|py|json|html|css)$/)) type = 'code';

    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    const sizeString = file.size > 1024 * 1024 ? `${sizeMb} MB` : `${Math.round(file.size / 1024)} KB`;

    const newFile = await UploadedFile.create({
      userId,
      name: file.originalname,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: sizeString,
      sizeBytes: file.size,
      path: file.path,
      url: `/uploads/${file.filename}`,
      type,
      description: req.body.description || 'Uploaded for NOVA context analysis',
    });

    return successResponse(res, newFile, 'File uploaded and indexed successfully', 201);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const listFiles = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const files = await UploadedFile.find({ userId }).sort({ createdAt: -1 });
    return successResponse(res, files);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const getFile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId || 'demo-user-1';
    const file = await UploadedFile.findOne({ _id: id, userId });
    if (!file) return errorResponse(res, 'File not found', 404);
    return successResponse(res, file);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const deleteFile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId || 'demo-user-1';
    await UploadedFile.findOneAndDelete({ _id: id, userId });
    return successResponse(res, { deleted: true }, 'File deleted');
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};
