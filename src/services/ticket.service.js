import { ticketModel } from '../models/ticket.model.js';
import { eventModel } from '../models/event.model.js';
import { userModel } from '../models/user.model.js';

export async function getAllTicketsService () {
    try {
        const allTickets = await ticketModel.find();
        if (allTickets.length === 0) {
            throw new Error('No se encontraron tickets');
        }
        return allTickets;
    }
    catch (error) {
        throw error;
    }
}

export async function getTicketByIdService (id) {
    try {
        const ticket = await ticketModel.findById(id);
        if (!ticket) {
            throw new Error('Ticket no encontrado');
        }
        return ticket;
    }
    catch (error) {
        throw error;
    }
}

export async function purchaseTicketService (userId, eventId) {
    try {
        if (!userId || !eventId) {
            throw new Error('Faltan datos para comprar el ticket');
        }
        const userExists = await userModel.findById(userId);
        if (!userExists) {
            throw new Error('Usuario no encontrado');
        }
        const eventExists = await eventModel.findById(eventId);
        if (!eventExists) {
            throw new Error('Evento no encontrado');
        }
        const event = eventExists.toObject();
        if (!event.status) {
            throw new Error('El evento no está activo');
        }

        const newTicket = await ticketModel.create({ user: userId, event: eventId });

        const updatedEvent = await eventModel.findByIdAndUpdate(eventId, { $inc: { available_tickets: -1 } }, { returnDocument: 'after' });
        const upEvent = updatedEvent.toObject();
        if (upEvent.available_tickets === 0) {
            await eventModel.findByIdAndUpdate(eventId, { status: false });
        }
        return newTicket;
    }
    catch (error) {
        throw error;
    }
}
