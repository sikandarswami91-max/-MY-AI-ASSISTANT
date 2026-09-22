import { Router } from 'express';
import { getCharacter, updateCharacter } from '../controllers/characterController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.use(optionalAuth);

router.get('/', getCharacter);
router.put('/', updateCharacter);

export default router;
