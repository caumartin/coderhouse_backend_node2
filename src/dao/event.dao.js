import { eventModel } from '../models/event.model.js'


export class EventDAO {
   
 async getById(id) {
    return eventModel.findById(id)
   
 }

    
async getByFilters(filters, options = {}) {
    const {
      sort = 'date',
      skip = 0,
      limit = 10
    } = options

    return eventModel
      .find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('category')
      .populate('organizer', 'first_name last_name email')
  }

  async count(filters) {
    return eventModel.countDocuments(filters)
  }

  async create(data) {
    return eventModel.create(data)
  }

  async update(id, data) {
    return eventModel.findByIdAndUpdate(id, data, {
      new: true
    })
  }
}
