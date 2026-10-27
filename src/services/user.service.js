import { UserRepository } from '../repositories/user.repository.js'
import { SessionUserDataDTO, ShowUserDataDTO } from "../dto/user.dto.js";

const userRepository = new UserRepository();

export async function getAllUsersService () {
    try {
        
        const allUsers = await userRepository.getAllUsers();
        const usersResponse = [];
        for (const user of allUsers) {
            const userResponse = new ShowUserDataDTO(user);
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
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return new ShowUserDataDTO(user)
    }
    catch (error) {
        throw error;
    }
}

export async function updateUserService (email, userData) {
    try {
        const updatedUser = await userRepository.updateUser(email, userData)
        if (!updatedUser) {
            throw new Error('Usuario no encontrado');
        }
        
        return new SessionUserDataDTO(updatedUser)
    }
    catch (error) {
        throw error;
    }
}
