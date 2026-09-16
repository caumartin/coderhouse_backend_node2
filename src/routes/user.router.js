import { Router } from 'express';
import { getAllUsers, getUserByEmail, updateUser } from '../controllers/user.controller.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:email', getUserByEmail);

router.put('/:email', updateUser);

export default router;