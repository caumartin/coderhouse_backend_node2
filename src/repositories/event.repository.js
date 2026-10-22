import { EventDAO } from '../dao/event.dao.js'

const eventDAO = new EventDAO()

export class EventRepository {
  async getEventById(id) {
    return eventDAO.getById(id)
  }

  async getEventsByFilters(filters, options) {
    return eventDAO.getByFilters(filters, options)
  }

  async countEvents(filters) {
    return eventDAO.count(filters)
  }

  async createEvent(data) {
    return eventDAO.create(data)
  }

  async updateEvent(id, data) {
    return eventDAO.update(id, data)
  }

  async changeEventStatus(id, status) {
    return eventDAO.update(id, { status })
  }
}
