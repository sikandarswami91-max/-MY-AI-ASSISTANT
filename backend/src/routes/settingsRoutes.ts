import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.use(optionalAuth);

router.get('/', getSettings);
router.put('/', updateSettings);

export default router;
