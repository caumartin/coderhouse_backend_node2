import { Router } from 'express';
import { registerController, loginController, currentUserController, logoutController } from '../controllers/session.controller.js';
import { ensureSession } from '../middlewares/session.middleware.js';


const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/current', ensureSession, currentUserController);
router.delete('/logout', ensureSession, logoutController);


export default router;
