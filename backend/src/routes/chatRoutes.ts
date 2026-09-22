import { Router } from 'express';
import {
  listChats,
  createChat,
  getChat,
  postMessage,
  deleteChat,
} from '../controllers/chatController.js';
import { optionalAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { createChatSchema, postMessageSchema } from './schemas.js';

const router = Router();

router.use(optionalAuth);

router.get('/', listChats);
router.post('/', validateBody(createChatSchema), createChat);
router.get('/:chatId', getChat);
router.post('/:chatId/messages', validateBody(postMessageSchema), postMessage);
router.delete('/:chatId', deleteChat);

export default router;
