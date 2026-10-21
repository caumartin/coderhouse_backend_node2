import { ticketModel } from '../models/ticket.model.js'

export class TicketDAO {
  async findActiveByUserAndEvent(userId, eventId) {
    return ticketModel.findOne({
      user: userId,
      event: eventId,
      status: 'active'
    })
  }

  async getReservedQuantityByEvent(eventId) {
    const result = await ticketModel.aggregate([
      {
        $match: {
          event: eventId,
          status: 'active'
        }
      },
      {
        $group: {
          _id: '$event',
          totalReserved: {
            $sum: '$quantity'
          }
        }
      }
    ])

    return result[0]?.totalReserved || 0
  }

  async create(data) {
    return ticketModel.create(data)
  }
}
