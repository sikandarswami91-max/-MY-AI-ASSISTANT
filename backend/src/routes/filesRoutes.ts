import { Router } from 'express';
import {
  uploadFile,
  listFiles,
  getFile,
  deleteFile,
} from '../controllers/filesController.js';
import { optionalAuth } from '../middleware/auth.js';
import { uploadMiddleware } from '../middleware/upload.js';

const router = Router();

router.use(optionalAuth);

router.post('/upload', uploadMiddleware.single('file'), uploadFile);
router.get('/', listFiles);
router.get('/:id', getFile);
router.delete('/:id', deleteFile);

export default router;
