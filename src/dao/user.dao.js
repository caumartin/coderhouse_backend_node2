import { userModel } from '../models/user.model.js'


export class UserDAO {
   
  async getByEmail(email) {
    return userModel.findOne({ email })
 }

  async getAll() {
    return userModel.find()
  }

  async create(data) {
    return userModel.create(data)
  }

  async update(email, userData) {
    return userModel.findOneAndUpdate({ email }, userData, { returnDocument: 'after' })
  }
}
