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
        res.status(400).json({ status: 'error', message: 'Error al obtener los usuarios' })
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
        if (error.message === 'Usuario no encontrado') {
            res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        } 
        else res.status(400).json({ status: 'error', message: 'Error al obtener el usuario' })
    }
}

export async function updateUserController (req, res, next) {
    try {
        const { email } = req.params;
        const { role } = req.body;
        const user = await updateUserService(email, { role });
        res.status(200).json({
            status: 'success',
            message: 'Usuario actualizado exitosamente',
            data: user
        });
    }
    catch (error) {
        if (error.message === 'Usuario no encontrado') {
            res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }
        else res.status(400).json({ status: 'error', payload: [] })
    }
}