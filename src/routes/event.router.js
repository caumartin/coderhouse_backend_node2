import { Router } from 'express';
import { getAllEventsController, getEventByIdController, createEventController, updateEventController, patchEventController } from '../controllers/event.controller.js';
import passport from 'passport';
import { rolesPermission, eventPermission } from '../middlewares/session.middleware.js';

const router = Router();

router.use(passport.authenticate("current", { session: false }));

router.get('/', getAllEventsController);
router.get('/:eventId', getEventByIdController);

router.use(rolesPermission(['admin', 'organizer']));

router.post('/', createEventController);

router.put('/:eventId', eventPermission, updateEventController);

router.patch('/:eventId/status', eventPermission, patchEventController);

export default router;