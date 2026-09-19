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
        res.status(400).json({ status: 'error', payload: [] })
    }
}

export async function getTicketByIdController (req, res, next) {
    try {
        const { id } = req.params;
        const ticket = await getTicketByIdService(id);
        res.status(200).json({
            status: 'success',
            message: 'Ticket obtenido exitosamente',
            data: ticket
        });
    }
    catch (error) {
        res.status(400).json({ status: 'error', payload: [] })
    }
}

export async function purchaseTicketController (req, res, next) {
    try {
        const { userId, eventId } = req.body;
        const ticket = await purchaseTicketService(userId, eventId);
        res.status(201).json({
            status: 'success',
            message: 'Ticket comprado exitosamente',
            data: ticket
        });
    }
    catch (error) {
        res.status(400).json({ status: 'error', payload: [] })
    }
}