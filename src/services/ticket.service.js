import { sendTicketConfirmationEmail } from './mailing.service.js';
import { EventRepository } from '../repositories/event.repository.js'
import { TicketRepository } from '../repositories/ticket.repository.js'
import { GetUserTicketDataDTO, GetOrganizerTicketDataDTO } from '../dto/ticket.dto.js';


const eventRepository = new EventRepository()
const ticketRepository = new TicketRepository()

export async function getMyTicketsService (userId) {

    let dtos = []

    try {
        const allTickets = await ticketRepository.getTicketsByUser(userId);
        if (allTickets.length === 0) {
            throw new Error('No se encontraron tickets');
        }
        dtos = allTickets.map(ticket => new GetUserTicketDataDTO(ticket));

        return dtos;
    }
    catch (error) {
        throw error;
    }
}

export async function getTicketsByEventService (eventId) {

    let dtos = []

    try {
        const tickets = await ticketRepository.getTicketsByEvent(eventId);

        if (tickets.length === 0) {
            throw new Error('No se encontraron tickets para el evento especificado');
        }
        dtos = tickets.map(ticket => new GetOrganizerTicketDataDTO(ticket));

        return dtos
    }
    catch (error) {
        throw error;
    }
}

export async function cancelTicketService (ticketId) {
    try {
        const ticket = await ticketRepository.getTicketById(ticketId);
        if (!ticket) {
            throw new Error('Ticket no encontrado');
        }

        if (ticket.status === 'cancelled') {
            throw new Error('El ticket ya ha sido cancelado previamente');
        }

        const cancelledTicket = await ticketRepository.cancelTicket(ticketId);
        if (!cancelledTicket) {
            throw new Error('Ticket no encontrado');
        }

        return new GetUserTicketDataDTO(cancelledTicket);
    }
    catch (error) {
        throw error;
    }
}

export async function purchaseTicketService (user, eventId, quantity) {
    try {
        const eventExists = await eventRepository.getEventById(eventId);
        if (!eventExists) {
            throw new Error('Evento no encontrado');
        }
        const event = eventExists.toObject();
        if (event.status !== "published") {
            throw new Error('El evento no está activo');
        }
        const existingTicket = await ticketRepository.getActiveTicketByUserAndEvent(user.id, eventId);
        if (existingTicket) {
            throw new Error('El usuario ya tiene un ticket activo para este evento');
        }

        if (!quantity) {
            quantity = 1; // Si no se proporciona la cantidad, se establece en 1 por defecto
        } else if (quantity <= 0) {
            throw new Error('La cantidad de tickets a comprar debe ser mayor que cero');
        }

        //const result = await ticketModel.aggregate([
        //    { $match: { event: eventExists._id, status: 'active' } },
        //    { $group: { _id: '$event', totalReserved: { $sum: '$quantity' } } }
        //]);

        //const reservedTickets = result.length > 0 ? result[0].totalReserved : 0;
        const reservedTickets = await ticketRepository.getReservedQuantity(eventExists._id);
        const availableTickets = event.capacity - reservedTickets;

        if (availableTickets < quantity) {
            throw new Error('No hay suficientes tickets disponibles para comprar');
        }

        const code = Math.random().toString(36).substring(2, 10).toUpperCase(); // Genera un código aleatorio de 8 caracteres

        const newTicket = await ticketRepository
            .createTicket({ user: user.id, event: eventId, quantity: quantity, code: code })

        await newTicket.populate('user', 'first_name last_name email');
        await newTicket.populate('event', 'name description date location');

        try {
            await sendTicketConfirmationEmail({
                to: user.email,
                userName: user.first_name,
                eventTitle: event.title,
                ticketCode: code
            });
        } catch (emailError) {
            console.error('Error al enviar el correo de confirmación:', emailError);
        }

        return new GetUserTicketDataDTO(newTicket);
    }
    catch (error) {
        throw error;
    }
}
