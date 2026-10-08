import { eventModel } from '../models/event.model.js';

export async function getAllEventsService (user, query) {

    const {
        category,
        status,
        location,
        fromDate,
        toDate,
        search,
        page = 1,
        limit = 10,
        sort = 'date'
    } = query

    const filter = {}

    if (category) {
        filter.category = category
    }
    if (status) {
        filter.status = status
    }
    if (location) {
        filter.location = {
        $regex: location,
        $options: 'i'
        }
    }
    if (fromDate || toDate) {
        filter.date = {}
        if (fromDate) {
        filter.date.$gte = new Date(fromDate)
        }
        if (toDate) {
        filter.date.$lte = new Date(toDate)
        }
    }
    if (search) {
        filter.$or = [
        {
            title: {
            $regex: search,
            $options: 'i'
            }
        },
        {
            description: {
            $regex: search,
            $options: 'i'
            }
        }
        ]
    }

    if (user.role === 'user') {
        filter.status = ['published', 'finished'];
    }

    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const skip = (pageNumber - 1) * limitNumber

    let events = []
    let totalEvents = 0

    try {
        events = await eventModel
            .find(filter)
            .populate('organizer', 'first_name last_name email')
            .sort(sort)
            .skip(skip)
            .limit(limitNumber)

        if (events.length === 0) {
            throw new Error('No se encontraron eventos con los filtros proporcionados');
        }

        totalEvents = await eventModel.countDocuments(filter)
    } catch (error) {
        throw new Error("Error al obtener los eventos: " + error.message);
    }

    return {
        events: events,
        pagination: {
            total: totalEvents,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(totalEvents / limitNumber)
        }
    }
}

export async function getEventByIdService (user, id) {

    const filter = {}

    if (user.role === 'user') {
        filter.status = ['published', 'finished'];
    }

    filter._id = id;

    try {
        const event = await eventModel.find(filter).populate("organizer");
        if (event.length === 0) {
            throw new Error('Evento no encontrado');
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
        if (eventData.price < 0) {
            throw new Error('El precio del evento no puede ser negativo');
        }
    } else {
        throw new Error('El precio del evento es requerido');
    }
    if (eventData.status && eventData.status !== 'draft') {
        throw new Error('El estado del evento debe ser "draft" al momento de la creación');
    }

    try {
        const newEvent = await eventModel.create(eventData);
        return newEvent;
    }
    catch (error) {
        throw new Error("Error al crear el evento: " + error.message);
    }
}

export async function updateEventService (id, eventData) {

    const event = await eventModel.findById(id);
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
        const updatedEvent = await eventModel.findByIdAndUpdate(id, eventData, { returnDocument: 'after' });
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
            const event = await eventModel.findById(id);
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
        const updatedEvent = await eventModel.findByIdAndUpdate(id, { status: eventData.status }, { returnDocument: 'after' });
        if (!updatedEvent) {
            throw new Error('Evento no encontrado');
        }
        return updatedEvent;
    }
    catch (error) {
        throw new Error("Error al actualizar el evento: " + error.message);
    }
}
