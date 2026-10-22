import { ticketModel } from '../models/ticket.model.js'

export class TicketDAO {

  async findById(id) {
    return ticketModel.findById(id)
           .populate('event', 'name description date location')
           .populate('user', 'first_name last_name email');
  }

  async findByData(data) {
    return ticketModel.find(data)
           .populate('event', 'name description date location')
           .populate('user', 'first_name last_name email');
  }

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

  async update(id, data) {
    return ticketModel.findByIdAndUpdate(id, data, { returnDocument: 'after' })
           .populate('user', 'first_name last_name email')
           .populate('event', 'name description date location');

  }

}
