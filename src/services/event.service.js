import { eventModel } from '../models/event.model.js';

export async function getAllEventsService () {
    try {
        const allEvents = await eventModel.find();
        if (allEvents.length === 0) {
            throw new Error('No se encontraron eventos');
        }
        return allEvents;
    }
    catch (error) {
        throw error;
    }
}

export async function getEventByIdService (id) {
    try {
        const event = await eventModel.findById(id);
        if (!event) {
            throw new Error('Evento no encontrado');
        }
        return event;
    }
    catch (error) {
        throw error;
    }
}

export async function createEventService (eventData) {
    try {
        const newEvent = await eventModel.create(eventData);
        return newEvent;
    }
    catch (error) {
        throw error;
    }
}

export async function updateEventService (id, eventData) {
    try {
        const updatedEvent = await eventModel.findByIdAndUpdate(id, eventData, { returnDocument: 'after' });
        if (!updatedEvent) {
            throw new Error('Evento no encontrado');
        }
        return updatedEvent;
    }
    catch (error) {
        throw error;
    }
}

export async function deleteEventService (id) {
    try {
        const deletedEvent = await eventModel.findByIdAndDelete(id);
        if (!deletedEvent) {
            throw new Error('Evento no encontrado');
        }
        return deletedEvent;
    }
    catch (error) {
        throw error;
    }
}
