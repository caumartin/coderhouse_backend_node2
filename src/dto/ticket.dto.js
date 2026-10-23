export class GetUserTicketDataDTO{

    constructor(ticketData){
        this.id = ticketData._id
        this.event = ticketData.event.name
        this.description = ticketData.event.description
        this.eventDate = ticketData.event.date
        this.location = ticketData.event.location
        this.code = ticketData.code
        this.quantity = ticketData.quantity
        this.purchaseDate = ticketData.createdAt
    }
}

export class GetOrganizerTicketDataDTO{

    constructor(ticketData){
        this.id = ticketData._id
        this.user = ticketData.user.email
        this.event = ticketData.event.name
        this.description = ticketData.event.description
        this.eventDate = ticketData.event.date
        this.location = ticketData.event.location
        this.code = ticketData.code
        this.quantity = ticketData.quantity
        this.purchaseDate = ticketData.createdAt
        this.cancelDate = ticketData.cancelledAtS
        this.status = ticketData.status
    }
}
