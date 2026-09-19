import { userModel } from '../models/user.model.js';

export async function getAllUsersService () {
    try {
        const allUsers = await userModel.find();
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
        const user = await userModel.findOne({ email });
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
        const updatedUser = await userModel.findOneAndUpdate({ email }, userData, { returnDocument: 'after' });
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
