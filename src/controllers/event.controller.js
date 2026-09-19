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
        if (error.message === 'No se encontraron eventos') {
            res.status(404).json({ status: 'error', message: 'No se encontraron eventos' });
        }
        else {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }
}

export async function getEventByIdController (req, res, next) {
    try {
        const { eventId } = req.params;
        const event = await getEventByIdService(eventId);
        res.status(200).json({
            status: 'success',
            message: 'Evento obtenido exitosamente',
            data: event
        });
    }
    catch (error) {
        if (error.message === 'Evento no encontrado') {
            res.status(404).json({ status: 'error', message: 'Evento no encontrado' });
        }
        else {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
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
        res.status(400).json({ status: 'error', message: 'Error al crear el evento' })
    }
}

export async function updateEventController (req, res, next) {
    try {
        const { eventId } = req.params;
        const event = await updateEventService(eventId, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Evento actualizado exitosamente',
            data: event
        });
    }
    catch (error) {
        if (error.message === 'Evento no encontrado') {
            res.status(404).json({ status: 'error', message: 'Evento no encontrado' });
        }
        else {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }
}

export async function deleteEventController (req, res, next) {
    try {
        const { eventId } = req.params;
        await deleteEventService(eventId);
        res.status(200).json({
            status: 'success',
            message: 'Evento eliminado exitosamente'
        });
    }
    catch (error) {
        if (error.message === 'Evento no encontrado') {
            res.status(404).json({ status: 'error', message: 'Evento no encontrado' });
        }
        else {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }
}