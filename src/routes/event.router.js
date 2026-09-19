import { Router } from 'express';
import { getAllEventsController, getEventByIdController, createEventController, updateEventController, deleteEventController } from '../controllers/event.controller.js';

const router = Router();

router.get('/', getAllEventsController);
router.get('/:eventId', getEventByIdController);

router.post('/', createEventController);
router.put('/:eventId', updateEventController);
router.delete('/:eventId', deleteEventController);


export default router;