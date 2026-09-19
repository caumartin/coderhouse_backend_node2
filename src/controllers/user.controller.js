import { getAllUsersService, getUserByEmailService, updateUserService } from '../services/user.service.js';

export async function getAllUsersController (req, res, next) {
    try {
        const allUsers = await getAllUsersService();
        res.status(200).json({
            status: 'success',
            message: 'Usuarios obtenidos exitosamente',
            data: allUsers
        });
    }
    catch (error) {
        res.status(400).json({ status: 'error', payload: [] })
    }
}

export async function getUserByEmailController (req, res, next) {
    try {
        const { email } = req.params;
        const user = await getUserByEmailService(email);
        res.status(200).json({
            status: 'success',
            message: 'Usuario obtenido exitosamente',
            data: user
        });
    }
    catch (error) {
        res.status(400).json({ status: 'error', payload: [] })
    }
}

export async function updateUserController (req, res, next) {
    try {
        const { email } = req.params;
        const { first_name, last_name } = req.body;
        const user = await updateUserService(email, { first_name, last_name });
        res.status(200).json({
            status: 'success',
            message: 'Usuario actualizado exitosamente',
            data: user
        });
    }
    catch (error) {
        res.status(400).json({ status: 'error', payload: [] })
    }
}