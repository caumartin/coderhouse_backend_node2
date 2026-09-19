import { Router } from 'express';
import { getAllUsersController, getUserByEmailController, updateUserController } from '../controllers/user.controller.js';

const router = Router();

router.get('/', getAllUsersController);
router.get('/:email', getUserByEmailController);

router.put('/:email', updateUserController);

export default router;