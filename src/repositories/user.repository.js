import { UserDAO } from '../dao/user.dao.js'

const userDAO = new UserDAO()

export class UserRepository {

  async getUserById(id) {
    return userDAO.findById(id)
  }

  async getUserByEmail(email) {
    return userDAO.getByEmail(email)
  }

  async getAllUsers() {
    return userDAO.getAll()
  }

  async createUser(userData) {
    return userDAO.create(userData)
  }

  async updateUser(email, userData) {
    return userDAO.update(email, userData)
  }
}
