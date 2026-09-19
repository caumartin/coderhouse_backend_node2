import { Router } from 'express';
import { getAllEventsController, getEventByIdController, createEventController, updateEventController, deleteEventController } from '../controllers/event.controller.js';

const router = Router();

router.get('/', getAllEventsController);
router.get('/:eid', getEventByIdController);

router.post('/', createEventController);
router.put('/:eid', updateEventController);
router.delete('/:eid', deleteEventController);


export default router;