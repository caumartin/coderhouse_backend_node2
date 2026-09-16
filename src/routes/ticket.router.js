import { Router } from 'express';
import { getAllTickets, getTicketById, purchaseTicket } from '../controllers/ticket.controller.js';

const router = Router();

router.get('/', getAllTickets);
router.get('/:tid', getTicketById);

router.post('/:uid/:eid', purchaseTicket);

export default router;