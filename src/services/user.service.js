import { userModel } from '../models/user.model.js';

export async function getAllUsersService () {
    try {
        const allUsers = await userModel.find();
        return allUsers;
    }
    catch (error) {
        throw error;
    }
}

export async function getUserByEmailService (email) {
    try {
        const user = await userModel.findOne({ email });
        return user;
    }
    catch (error) {
        throw error;
    }
}

export async function updateUserService (email, userData) {
    try {
        const updatedUser = await userModel.findOneAndUpdate({ email }, userData, { new: true });
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
}
