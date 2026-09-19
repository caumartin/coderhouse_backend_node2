import { registerService } from '../services/session.service.js';

export async function registerController (req, res) {
    try {
        const user = await registerService(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Usuario registrado exitosamente',
            data: user
        });
    }
    catch (error) {
        if (error.message === 'Todos los campos son obligatorios' ||
            error.message === 'Formato de correo electrónico inválido' ||
            error.message === 'La contraseña debe tener al menos 6 caracteres'
        ) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
        else if (error.message === 'El correo electrónico ya está registrado') {
            res.status(409).json({
                status: 'error',
                message: error.message
            });
        }
        else {
            res.status(500).json({
                status: 'error',
                message: 'Error interno del servidor'
            });
        }
    }
}