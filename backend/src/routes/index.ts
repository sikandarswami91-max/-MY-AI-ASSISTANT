import { Router } from 'express';
import authRoutes from './authRoutes.js';
import chatRoutes from './chatRoutes.js';
import historyRoutes from './historyRoutes.js';
import notesRoutes from './notesRoutes.js';
import tasksRoutes from './tasksRoutes.js';
import remindersRoutes from './remindersRoutes.js';
import filesRoutes from './filesRoutes.js';
import settingsRoutes from './settingsRoutes.js';
import characterRoutes from './characterRoutes.js';
import healthRoutes from './healthRoutes.js';
import aiRoutes from './aiRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/history', historyRoutes);
router.use('/notes', notesRoutes);
router.use('/tasks', tasksRoutes);
router.use('/reminders', remindersRoutes);
router.use('/files', filesRoutes);
router.use('/settings', settingsRoutes);
router.use('/character', characterRoutes);
router.use('/ai', aiRoutes);
router.use('/', healthRoutes);

export default router;
