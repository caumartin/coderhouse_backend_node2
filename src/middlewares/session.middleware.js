import { EventRepository } from '../repositories/event.repository.js'
import { TicketRepository } from '../repositories/ticket.repository.js'

const eventRepository = new EventRepository()
const ticketRepository = new TicketRepository()

export function rolesPermission(roles) {
    return function (req, res, next) {
        try {
            if (roles.includes(req.user.role)) next()
            else throw new Error ('Acceso no permitido')
        } catch (error) {
            res.status(403).json({ status: "error", message: error.message })
        }
    }
}

export async function purchasePermission (req, res, next) {
    try {
        if (req.user.role == 'user') next();

        if (req.user.role == 'admin' || req.user.role == 'organizer') {
            const event = await eventRepository.getEventById(req.params.eid)
            if (event.organizer == req.user._id){
                throw new Error ("No puedes comprar un ticket de tu evento");
            } else next();
        }
    } catch (error) {
        res.status(403).json({ status: "error", message: error.message });
    }
}

export async function eventPermission (req, res, next) {
    try {
        if (req.user.role == 'organizer') {
            const event = await eventRepository.getEventById(req.params.eventId);
            if (event.organizer.equals(req.user._id)) next()
            else throw new Error ("Solo puedes modificar tus propios eventos");
        } else if (req.user.role == 'admin') next();
            else {
            throw new Error ('Acceso no permitido');
            }
    } catch (error) {
        res.status(403).json({ status: "error", message: error.message });
    }
}

export async function cancelTicketPermission (req, res, next) {
    try {
        if (req.user.role == 'user') {
            const ticket = await ticketRepository.getTicketById(req.params.ticketId);
            if (ticket.user.equals(req.user._id)) next()
            else throw new Error ("Solo puedes cancelar tus propios tickets");
        } else if (req.user.role == 'admin') next();
            else {
            throw new Error ('Acceso no permitido');
            }
    } catch (error) {
        res.status(403).json({ status: "error", message: error.message });
    }
}
