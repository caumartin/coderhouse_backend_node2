import { Router } from 'express';
import { getAllEventsController,
         getEventByIdController,
         createEventController,
         updateEventController,
         patchEventController } from '../controllers/event.controller.js';
import { getTicketsByEventController,
         purchaseTicketController } from '../controllers/ticket.controller.js';
import passport from 'passport';
import { rolesPermission, eventPermission } from '../middlewares/session.middleware.js';

const router = Router();

router.use(passport.authenticate("current", { session: false }));
// rutas con acceso para todos los usuarios autenticados
router.get('/', getAllEventsController);
router.get('/:eventId', getEventByIdController);
router.post('/:eventId/tickets', purchaseTicketController);

router.use(rolesPermission(['admin', 'organizer']));
// rutas con acceso solo para administradores y organizadores
router.post('/', createEventController);
router.put('/:eventId', eventPermission, updateEventController);
router.patch('/:eventId/status', eventPermission, patchEventController);
router.get('/:eventId/tickets', eventPermission, getTicketsByEventController);

export default router;