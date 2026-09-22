import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { chatService } from '../services/chatService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const listChats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const chats = await chatService.getChatsForUser(userId);
    return successResponse(res, chats);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const createChat = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const { title, category } = req.body;
    const chat = await chatService.createChat(userId, title, category);
    return successResponse(res, chat, 'Chat created', 201);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const getChat = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { chatId } = req.params;
    const userId = req.user?.userId || 'demo-user-1';
    const chat = await chatService.getChatById(chatId, userId);
    if (!chat) return errorResponse(res, 'Chat not found', 404);

    const messages = await chatService.getMessages(chatId);
    return successResponse(res, { chat, messages });
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const postMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { chatId } = req.params;
    const userId = req.user?.userId || 'demo-user-1';
    const { content, attachments } = req.body;

    if (!content && (!attachments || attachments.length === 0)) {
      return errorResponse(res, 'Message content or attachment required', 400);
    }

    const result = await chatService.postMessage(chatId, userId, content, attachments);
    return successResponse(res, result, 'Message processed', 201);
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};

export const deleteChat = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { chatId } = req.params;
    const userId = req.user?.userId || 'demo-user-1';
    await chatService.deleteChat(chatId, userId);
    return successResponse(res, { deleted: true }, 'Chat deleted');
  } catch (err: any) {
    return errorResponse(res, err.message, 500);
  }
};
