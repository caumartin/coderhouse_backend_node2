import { Router } from 'express';
import { getAllUsersController, getUserByEmailController, updateUserController } from '../controllers/user.controller.js';
import passport from 'passport';
import { rolesPermission } from '../middlewares/session.middleware.js'

const router = Router();

router.use(passport.authenticate('current', { session: false }), rolesPermission(['admin']))

router.get('/', getAllUsersController);
router.get('/:email', getUserByEmailController);

router.put('/:email', updateUserController);

export default router;