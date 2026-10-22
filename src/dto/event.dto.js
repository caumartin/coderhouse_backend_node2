export class EventDataDTO{

    constructor(eventData){
        //delete eventData.;

        return eventData;
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