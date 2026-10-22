import { TicketDAO } from '../dao/ticket.dao.js'

const ticketDAO = new TicketDAO()

export class TicketRepository {

  async getTicketById(id) {
    return ticketDAO.findById(id)
  }

  async getTicketsByUser(userId) {
    return ticketDAO.findByData({ user: userId })
  }

  async getTicketsByEvent(event) {
    return ticketDAO.findByData({ event: event })
  }

  async getActiveTicketByUserAndEvent(userId, eventId) {
    return ticketDAO.findActiveByUserAndEvent(userId, eventId)
  }

  async getReservedQuantity(eventId) {
    return ticketDAO.getReservedQuantityByEvent(eventId)
  }

  async createTicket(data) {
    return ticketDAO.create(data)
  }

  async cancelTicket(id) {
    return ticketDAO.update(id, { status: 'cancelled', cancelledAt: new Date() })
  }

}
