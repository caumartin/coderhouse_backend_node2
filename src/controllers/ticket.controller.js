import { getMyTicketsService,
         getTicketsByEventService,
         cancelTicketService,
         purchaseTicketService } from '../services/ticket.service.js';

export async function getMyTicketsController (req, res, next) {
    try {
        const myTickets = await getMyTicketsService(req.user.id);
        res.status(200).json({
            status: 'success',
            message: 'Tickets obtenidos exitosamente',
            data: myTickets
        });
    }
    catch (error) {
        if (error.message === 'No se encontraron tickets') {
            res.status(404).json({ status: 'error', message: 'No se encontraron tickets' });
        }
        else {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }
}

export async function getTicketsByEventController (req, res, next) {
    try {
        const eventId = req.params.eventId;
        const tickets = await getTicketsByEventService(eventId);
        res.status(200).json({
            status: 'success',
            message: 'Tickets obtenidos exitosamente',
            data: tickets
        });
    }
    catch (error) {
        if (error.message === 'Ticket no encontrado') {
            res.status(404).json({ status: 'error', message: 'Ticket no encontrado' });
        }
        else {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }
}

export async function purchaseTicketController (req, res, next) {
    try {
        const eventId = req.params.eventId;
        const { quantity } = req.body;
        const { ticket, updatedEvent } = await purchaseTicketService(req.user.id, eventId, quantity);
        console.log('Updated Event:', updatedEvent);
        res.status(201).json({
            status: 'success',
            message: 'Ticket comprado exitosamente',
            data: ticket
        });
    }
    catch (error) {
        if (error.message === 'Faltan datos para comprar el ticket' || error.message === 'Usuario no encontrado' || error.message === 'Evento no encontrado' || error.message === 'El evento no está activo') {
            res.status(400).json({ status: 'error', message: error.message });
        }
        else {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }
}

export async function cancelTicketController (req, res, next) {
    try {
        const ticketId = req.params.ticketId;
        const { ticket, updatedEvent } = await cancelTicketService(ticketId);
        console.log('Updated Event:', updatedEvent);
        res.status(200).json({
            status: 'success',
            message: 'Ticket cancelado exitosamente',
            data: ticket
        });
    }
    catch (error) {
        if (error.message === 'Ticket no encontrado') {
            res.status(404).json({ status: 'error', message: 'Ticket no encontrado' });
        }
        else {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }
}
