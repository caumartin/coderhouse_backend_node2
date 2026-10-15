import { ticketModel } from '../models/ticket.model.js';
import { eventModel } from '../models/event.model.js';
import { userModel } from '../models/user.model.js';

export async function getMyTicketsService (userId) {
    try {
        const allTickets = await ticketModel.find({ user: userId })
            .populate('event', 'name description date location')
            .populate('user', 'first_name last_name email');
        if (allTickets.length === 0) {
            throw new Error('No se encontraron tickets');
        }
        return allTickets;
    }
    catch (error) {
        throw error;
    }
}

export async function getTicketsByEventService (eventId) {
    try {
        const tickets = await ticketModel.find({ event: eventId })
            .populate('user', 'first_name last_name email');
        if (tickets.length === 0) {
            throw new Error('No se encontraron tickets para el evento especificado');
        }
        return tickets;
    }
    catch (error) {
        throw error;
    }
}

export async function cancelTicketService (ticketId) {
    try {
        const ticket = await ticketModel.findById(ticketId);
        if (!ticket) {
            throw new Error('Ticket no encontrado');
        }
        if (ticket.status === 'cancelled') {
            throw new Error('El ticket ya ha sido cancelado previamente');
        }
        const cancelledTicket = await ticketModel.findByIdAndUpdate(ticketId, { status: 'cancelled', cancelledAt: new Date() }, { returnDocument: 'after' })
            .populate('user', 'first_name last_name email')
            .populate('event', 'name description date location');
        if (!cancelledTicket) {
            throw new Error('Ticket no encontrado');
        }

        return cancelledTicket;
    }
    catch (error) {
        throw error;
    }
}

export async function purchaseTicketService (userId, eventId, quantity) {
    try {
        const eventExists = await eventModel.findById(eventId);
        if (!eventExists) {
            throw new Error('Evento no encontrado');
        }
        const event = eventExists.toObject();
        if (event.status !== "published") {
            throw new Error('El evento no está activo');
        }
        if (!quantity) {
            quantity = 1; // Si no se proporciona la cantidad, se establece en 1 por defecto
        } else if (quantity <= 0) {
            throw new Error('La cantidad de tickets a comprar debe ser mayor que cero');
        }

        const result = await ticketModel.aggregate([
            { $match: { event: eventExists._id, status: 'active' } },
            { $group: { _id: '$event', totalReserved: { $sum: '$quantity' } } }
        ]);

        const reservedTickets = result.length > 0 ? result[0].totalReserved : 0;
        const availableTickets = event.capacity - reservedTickets;

        if (availableTickets < quantity) {
            throw new Error('No hay suficientes tickets disponibles para comprar');
        }

        const code = Math.random().toString(36).substring(2, 10).toUpperCase(); // Genera un código aleatorio de 8 caracteres

        const newTicket = await ticketModel
            .create({ user: userId, event: eventId, quantity: quantity, code: code })

        await newTicket.populate('user', 'first_name last_name email');
        await newTicket.populate('event', 'name description date location');

        return newTicket;
    }
    catch (error) {
        throw error;
    }
}
