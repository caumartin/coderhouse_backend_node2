//import { userModel } from '../models/user.model.js';
import { UserRepository } from '../repositories/user.repository.js'

const userRepository = new UserRepository();

export async function getAllUsersService () {
    try {
        //const allUsers = await userModel.find();
        const allUsers = await userRepository.getAllUsers();
        const usersResponse = [];
        for (const user of allUsers) {
            const userResponse = user.toObject();
            delete userResponse.password; // Eliminar la contraseña de la respuesta
            usersResponse.push(userResponse);
        }
        return usersResponse;
    }
    catch (error) {
        throw error;
    }
}

export async function getUserByEmailService (email) {
    try {
        //const user = await userModel.findOne({ email });
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        const userResponse = user.toObject();
        delete userResponse.password; // Eliminar la contraseña de la respuesta
        return userResponse;
    }
    catch (error) {
        throw error;
    }
}

export async function updateUserService (email, userData) {
    try {
        //const updatedUser = await userModel.findOneAndUpdate({ email }, userData, { returnDocument: 'after' });
        const updatedUser = await userRepository.updateUser(email, userData)
        if (!updatedUser) {
            throw new Error('Usuario no encontrado');
        }
        const userResponse = updatedUser.toObject();
        delete userResponse.password; // Eliminar la contraseña de la respuesta
        return userResponse;
    }
    catch (error) {
        throw error;
    }
}
