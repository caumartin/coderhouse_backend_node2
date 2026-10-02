import { Router } from 'express';
import { getAllTicketsController, getTicketByIdController, purchaseTicketController } from '../controllers/ticket.controller.js';
import passport from 'passport';
import { purchasePermission } from '../middlewares/session.middleware.js'

const router = Router();

router.use(passport.authenticate("current", { session: false }));

router.get('/', getAllTicketsController);
router.get('/:ticketId', getTicketByIdController);

router.post('/:userId/:eventId', purchasePermission, purchaseTicketController);

export default router;