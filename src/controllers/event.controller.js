import { getAllEventsService, getEventByIdService, createEventService, updateEventService, deleteEventService } from '../services/event.service.js';

export async function getAllEventsController (req, res, next) {
    try {
        const allEvents = await getAllEventsService();
        res.status(200).json({
            status: 'success',
            message: 'Eventos obtenidos exitosamente',
            data: allEvents
        });
    }
    catch (error) {
        res.status(400).json({ status: 'error', payload: [] })
    }
}

export async function getEventByIdController (req, res, next) {
    try {
        const { id } = req.params;
        const event = await getEventByIdService(id);
        res.status(200).json({
            status: 'success',
            message: 'Evento obtenido exitosamente',
            data: event
        });
    }
    catch (error) {
        res.status(400).json({ status: 'error', payload: [] })
    }
}

export async function createEventController (req, res, next) {
    try {
        const event = await createEventService(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Evento creado exitosamente',
            data: event
        });
    }
    catch (error) {
        res.status(400).json({ status: 'error', payload: [] })
    }
}

export async function updateEventController (req, res, next) {
    try {
        const { id } = req.params;
        const event = await updateEventService(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Evento actualizado exitosamente',
            data: event
        });
    }
    catch (error) {
        res.status(400).json({ status: 'error', payload: [] })
    }
}

export async function deleteEventController (req, res, next) {
    try {
        const { id } = req.params;
        await deleteEventService(id);
        res.status(200).json({
            status: 'success',
            message: 'Evento eliminado exitosamente'
        });
    }
    catch (error) {
        res.status(400).json({ status: 'error', payload: [] })
    }
}