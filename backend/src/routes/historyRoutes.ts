import { Router } from 'express';
import { listHistory, deleteHistory } from '../controllers/historyController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.use(optionalAuth);

router.get('/', listHistory);
router.delete('/:id', deleteHistory);

export default router;
