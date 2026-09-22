import { Router } from 'express';
import {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import { optionalAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { noteSchema } from './schemas.js';

const router = Router();

router.use(optionalAuth);

router.get('/', listNotes);
router.post('/', validateBody(noteSchema), createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
