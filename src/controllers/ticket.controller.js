import { getAllTicketsService, getTicketByIdService, purchaseTicketService } from '../services/ticket.service.js';

export async function getAllTicketsController (req, res, next) {
    try {
        const allTickets = await getAllTicketsService();
        res.status(200).json({
            status: 'success',
            message: 'Tickets obtenidos exitosamente',
            data: allTickets
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

export async function getTicketByIdController (req, res, next) {
    try {
        const { ticketId } = req.params;
        const ticket = await getTicketByIdService(ticketId);
        res.status(200).json({
            status: 'success',
            message: 'Ticket obtenido exitosamente',
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

export async function purchaseTicketController (req, res, next) {
    try {
        const { userId, eventId } = req.params;
        const ticket = await purchaseTicketService(userId, eventId);
        res.status(201).json({
            status: 'success',
            message: 'Ticket comprado exitosamente',
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