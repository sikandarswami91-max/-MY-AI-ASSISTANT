import { Router } from 'express';
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasksController.js';
import { optionalAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { taskSchema } from './schemas.js';

const router = Router();

router.use(optionalAuth);

router.get('/', listTasks);
router.post('/', validateBody(taskSchema), createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
