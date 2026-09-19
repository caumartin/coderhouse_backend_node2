import { Router } from 'express';
import { registerController } from '../controllers/session.controller.js';


const router = Router();

router.post('/register', registerController);

export default router;
