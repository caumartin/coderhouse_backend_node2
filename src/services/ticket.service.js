import { ticketModel } from '../models/ticket.model.js';

export async function getAllTicketsService () {
    try {
        const allTickets = await ticketModel.find();
        return allTickets;
    }
    catch (error) {
        throw error;
    }
}

export async function getTicketByIdService (id) {
    try {
        const ticket = await ticketModel.findById(id);
        return ticket;
    }
    catch (error) {
        throw error;
    }
}

export async function purchaseTicketService (userId, eventId) {
    try {
        const newTicket = new ticketModel({ user: userId, event: eventId });
        const savedTicket = await newTicket.save();
        return savedTicket;
    }
    catch (error) {
        throw error;
    }
}
