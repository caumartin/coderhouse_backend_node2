import { registerService, loginService } from '../services/session.service.js';
import { generateToken, verifyToken } from '../utils/jwt.js';


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

export async function loginController (req, res, next) {
    try {
        const user = await loginService(req.body);
        const token = generateToken(user.toJSON());
        res.status(200)
           .cookie('token', token, { httpOnly: true, maxAge: 60 * 1000, signed: true })
           .json({
            status: 'success',
            message: 'Inicio de sesión exitoso',
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}


export async function logoutController (req, res, next) {
    try {
        res.status(200).clearCookie('token').json({
            status: 'success',
            message: 'Cierre de sesión exitoso'
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}


export async function currentUserController (req, res, next) {
    try {
        const user = verifyToken(req.signedCookies.token);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Sesión expirada o no iniciada. Por favor, inicia sesión nuevamente.'
        });
    }
}