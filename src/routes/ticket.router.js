import { Router } from 'express';
import { getAllTicketsController, getTicketByIdController, purchaseTicketController } from '../controllers/ticket.controller.js';

const router = Router();

router.get('/', getAllTicketsController);
router.get('/:tid', getTicketByIdController);

router.post('/:uid/:eid', purchaseTicketController);

export default router;