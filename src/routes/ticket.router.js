import { Router } from 'express';
import { getAllTicketsController, getTicketByIdController, purchaseTicketController } from '../controllers/ticket.controller.js';

const router = Router();

router.get('/', getAllTicketsController);
router.get('/:ticketId', getTicketByIdController);

router.post('/:userId/:eventId', purchaseTicketController);

export default router;