import { eventModel } from '../models/event.model.js';

export async function getAllEventsService () {
    try {
        const allEvents = await eventModel.find();
        return allEvents;
    }
    catch (error) {
        throw error;
    }
}

export async function getEventByIdService (id) {
    try {
        const event = await eventModel.findById(id);
        return event;
    }
    catch (error) {
        throw error;
    }
}

export async function createEventService (eventData) {
    try {
        const newEvent = new eventModel(eventData);
        const savedEvent = await newEvent.save();
        return savedEvent;
    }
    catch (error) {
        throw error;
    }
}

export async function updateEventService (id, eventData) {
    try {
        const updatedEvent = await eventModel.findByIdAndUpdate(id, eventData, { new: true });
        return updatedEvent;
    }
    catch (error) {
        throw error;
    }
}

export async function deleteEventService (id) {
    try {
        const deletedEvent = await eventModel.findByIdAndDelete(id);
        return deletedEvent;
    }
    catch (error) {
        throw error;
    }
}
