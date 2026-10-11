import { Router } from 'express';
import { getMyTicketsController, cancelTicketController } from '../controllers/ticket.controller.js';
import passport from 'passport';

const router = Router();

router.use(passport.authenticate("current", { session: false }));
// rutas con acceso para todos los usuarios autenticados
router.get('/my-tickets', getMyTicketsController);

router.use(rolesPermission(['admin', 'user']));
// rutas con acceso solo para administradores y usuarios
router.patch('/:ticketId/cancel', cancelTicketController);

export default router;