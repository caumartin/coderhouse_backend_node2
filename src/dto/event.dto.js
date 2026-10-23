export class GetEventDataDTO{

    constructor(eventData){
        this.id = eventData._id
        this.name = eventData.name
        this.description = eventData.description
        this.date = eventData.date
        this.location = eventData.location
        this.capacity = eventData.capacity
        this.price = eventData.price
        this.status = eventData.status
        this.organizer = eventData.organizer.email
        this.createdAt = eventData.createdAt
    }
}

export class SearchEventDataDTO{

    constructor(user, query){

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
                name: {
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

        const options = {
            'limitNumber': limitNumber,
            'pageNumber': pageNumber,
            'skip': skip,
            'sort': sort
        }

        return {
            filter: filter,
            options: options
        }
    }
}

export class CreateEventDataDTO{

    constructor(eventData){

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

        return eventData;
    }
}

export class UpdateEventDataDTO{

    constructor(event, eventData){

        if (event.status !== 'draft') {
            throw new Error('Solo se pueden modificar eventos en estado "draft"');
        }

        if (eventData.status && eventData.status !== event.status) {
            throw new Error('No se puede modificar el estado del evento con este endpoint, use PATCH /events/:eventId/status para cambiar el estado');
        }

        if (eventData.name) {
            throw new Error('No se puede modificar el nombre del evento');
        }

        if (eventData.organizer) {
            throw new Error('No se puede modificar el organizador del evento');
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

        return eventData;
    }
}

export class PatchEventDataDTO{

    constructor(event, eventData){

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

        return eventData
    }
}