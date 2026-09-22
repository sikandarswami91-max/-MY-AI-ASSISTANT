import { Router } from 'express';
import {
  listReminders,
  createReminder,
  updateReminder,
  deleteReminder,
} from '../controllers/remindersController.js';
import { optionalAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { reminderSchema } from './schemas.js';

const router = Router();

router.use(optionalAuth);

router.get('/', listReminders);
router.post('/', validateBody(reminderSchema), createReminder);
router.put('/:id', updateReminder);
router.delete('/:id', deleteReminder);

export default router;
