import { CreateEventDataDTO, GetEventDataDTO, PatchEventDataDTO, SearchEventDataDTO, UpdateEventDataDTO } from '../dto/event.dto.js'
import { EventRepository } from '../repositories/event.repository.js'

const eventRepository = new EventRepository()

export async function getAllEventsService (user, query) {

    const params = new SearchEventDataDTO(user, query);

    let dtos = []
    let totalEvents = 0

    try {

        const events = await eventRepository.getEventsByFilters(params.filter, params.options)

        if (events.length === 0) {
            throw new Error('No se encontraron eventos con los filtros proporcionados');
        }
        dtos = events.map(event => new GetEventDataDTO(event));
        totalEvents = await eventRepository.countEvents(params.filter)
    } catch (error) {
        throw new Error("Error al obtener los eventos: " + error.message);
    }

    return {
        events: dtos,
        pagination: {
            total: totalEvents,
            page: params.options.pageNumber,
            limit: params.options.limitNumber,
            totalPages: Math.ceil(totalEvents / params.options.limitNumber)
        }
    }
}

export async function getEventByIdService (user, id) {

    try {
        const event = await eventRepository.getEventById(id)
        if (!event) {
            throw new Error('Evento no encontrado');
        }
        if (user.role === 'user' && event.status !== 'published' && event.status !== 'finished') {
            throw new Error('No tienes permiso para ver este evento');
        }
        return new GetEventDataDTO(event);
    }
    catch (error) {
        throw new Error("Error al obtener el evento: " + error.message);
    }
}

export async function createEventService (eventData) {

    const event = new CreateEventDataDTO(eventData)
    
    try {
        const newEvent = await eventRepository.createEvent(event);
        await newEvent.populate('organizer')
        return new GetEventDataDTO(newEvent);
    }
    catch (error) {
        throw new Error("Error al crear el evento: " + error.message);
    }
}

export async function updateEventService (id, eventData) {

    const event = await eventRepository.getEventById(id);

     if (!event) {
        throw new Error('Evento no encontrado');
    }

    const updateEvent = new UpdateEventDataDTO(event, eventData);

    try {
        const updatedEvent = await eventRepository.updateEvent(id, updateEvent);
        if (!updatedEvent) {
            throw new Error('Evento no encontrado');
        }
        return new GetEventDataDTO(updatedEvent);
    }
    catch (error) {
        throw new Error("Error al actualizar el evento: " + error.message);
    }
}

export async function patchEventService (id, eventData) {

    let patchEvent;

    if (eventData.status) {
        if (!['draft', 'published', 'cancelled', 'finished'].includes(eventData.status)) {
            throw new Error('Estado inválido');
        } else {
            const event = await eventRepository.getEventById(id);

            if (!event) {
                throw new Error('Evento no encontrado');
            }

            patchEvent = new PatchEventDataDTO(event, eventData);
        }
    } else {
        throw new Error('Este endpoint requiere que se especifique el nuevo estado del evento');
    }

    try {
        const updatedEvent = await eventRepository.changeEventStatus(id, patchEvent.status);
        if (!updatedEvent) {
            throw new Error('Evento no encontrado');
        }
        return new GetEventDataDTO(updatedEvent);
    }
    catch (error) {
        throw new Error("Error al actualizar el evento: " + error.message);
    }
}
