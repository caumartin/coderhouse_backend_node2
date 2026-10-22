import { SearchEventDataDTO } from '../dto/event.dto.js'
import { EventRepository } from '../repositories/event.repository.js'

const eventRepository = new EventRepository()

export async function getAllEventsService (user, query) {

    const params = new SearchEventDataDTO(user, query);

    let events = []
    let totalEvents = 0

    try {

        events = await eventRepository.getEventsByFilters(params.filter, params.options)

        if (events.length === 0) {
            throw new Error('No se encontraron eventos con los filtros proporcionados');
        }

        totalEvents = await eventRepository.countEvents(params.filter)
    } catch (error) {
        throw new Error("Error al obtener los eventos: " + error.message);
    }

    return {
        events: events,
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
        return event;
    }
    catch (error) {
        throw new Error("Error al obtener el evento: " + error.message);
    }
}

export async function createEventService (eventData) {

    if (!eventData.name) {
        throw new Error('El nombre del evento es requerido');
    }
    if (!eventData.description) {
        throw new Error('La descripción del evento es requerida');
    }
    if (!eventData.category) {
        throw new Error('La categoría del evento es requerida');
    }
    if (eventData.date) {
        const eventDate = new Date(eventData.date);
        const currentDate = new Date();

        if (eventDate <= currentDate) {
            throw new Error('La fecha del evento debe ser futura');
        }
    } else {
        throw new Error('La fecha del evento es requerida');
    }
    if (!eventData.location) {
        throw new Error('La ubicación del evento es requerida');
    }
    if (eventData.capacity) {
        if (eventData.capacity <= 0) {
            throw new Error('La capacidad del evento debe ser mayor a cero');
        }
    } else {
        throw new Error('La capacidad del evento es requerida');
    }
    if (eventData.price) {
        if (!(typeof eventData.price === "number" && eventData.price >= 0)) {
            throw new Error('El precio del evento debe ser un número válido y no negativo');
        }
    } else {
        throw new Error('El precio del evento es requerido');
    }
    if (eventData.status && eventData.status !== 'draft') {
        throw new Error('El estado del evento debe ser "draft" al momento de la creación');
    }

    try {
        //const newEvent = await eventModel.create(eventData);
        const newEvent = await eventRepository.createEvent(eventData);
        return newEvent;
    }
    catch (error) {
        throw new Error("Error al crear el evento: " + error.message);
    }
}

export async function updateEventService (id, eventData) {

    //const event = await eventModel.findById(id);
    const event = await eventRepository.getEventById(id);
    if (!event) {
        throw new Error('Evento no encontrado');
    }

    if (eventData.name) {
        throw new Error('No se puede modificar el nombre del evento');
    }

    if (eventData.organizer) {
        throw new Error('No se puede modificar el organizador del evento');
    }

    if (event.status !== 'draft') {
        throw new Error('Solo se pueden modificar eventos en estado "draft"');
    }

    if (eventData.status && eventData.status !== event.status) {
        throw new Error('No se puede modificar el estado del evento con este endpoint, use PATCH /events/:eventId/status para cambiar el estado');
        }

    if (eventData.date) {
        const eventDate = new Date(eventData.date);
        const currentDate = new Date();

        if (eventDate <= currentDate) {
            throw new Error('La fecha del evento debe ser futura');
        }
    }
    
    if (eventData.capacity && eventData.capacity <= 0) {
        throw new Error('La capacidad del evento debe ser mayor a cero');
    }

    if (eventData.price && eventData.price < 0) {
        throw new Error('El precio del evento no puede ser negativo');
    }

    try {
        //const updatedEvent = await eventModel.findByIdAndUpdate(id, eventData, { returnDocument: 'after' });
        const updatedEvent = await eventRepository.updateEvent(id, eventData);
        if (!updatedEvent) {
            throw new Error('Evento no encontrado');
        }
        return updatedEvent;
    }
    catch (error) {
        throw new Error("Error al actualizar el evento: " + error.message);
    }
}

export async function patchEventService (id, eventData) {

    if (eventData.status) {
        if (!['draft', 'published', 'cancelled', 'finished'].includes(eventData.status)) {
            throw new Error('Estado inválido');
        } else {
            //const event = await eventModel.findById(id);
            const event = await eventRepository.getEventById(id);

            if (!event) {
                throw new Error('Evento no encontrado');
            }
            if (event.status === 'cancelled' && eventData.status !== 'cancelled') {
                throw new Error('No se puede cambiar el estado de un evento cancelado a otro estado');
            }
            if (event.status === 'finished' && eventData.status !== 'finished') {
                throw new Error('No se puede cambiar el estado de un evento finalizado a otro estado');
            }

            if (event.status === 'draft' && eventData.status === 'finished') {
                throw new Error('No se puede cambiar el estado de un evento en borrador a finalizado');
            }
            if (event.status === 'published' && eventData.status === 'draft') {
                throw new Error('No se puede cambiar el estado de un evento publicado a borrador');
            }
        }
    } else {
        throw new Error('Este endpoint requiere que se especifique el nuevo estado del evento');
    }

    try {
        //const updatedEvent = await eventModel.findByIdAndUpdate(id, { status: eventData.status }, { returnDocument: 'after' });
        const updatedEvent = await eventRepository.changeEventStatus(id, eventData.status);
        if (!updatedEvent) {
            throw new Error('Evento no encontrado');
        }
        return updatedEvent;
    }
    catch (error) {
        throw new Error("Error al actualizar el evento: " + error.message);
    }
}
