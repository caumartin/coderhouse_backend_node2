import { generateToken } from '../utils/jwt.js';
import { env } from '../config/env.js';


export async function registerController (req, res) {
    res.status(201).json({
        status: 'success',
        message: 'Usuario registrado exitosamente',
        payload: {
            id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.role
        }
    });
    }


export async function loginController (req, res, next) {
    const tokenUser = {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role
    }
    const token = generateToken(tokenUser);
    res.status(200)
        .cookie('currentUser', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 3600000,
            signed: true,
            secure: env.NODE_ENV === 'production'})
        .json({
        status: 'success',
        message: 'Inicio de sesión exitoso',
        payload: tokenUser
    });
}

    
export async function logoutController (req, res, next) {
    try {
        res.status(200).clearCookie('currentUser').json({
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
    res.status(200).json({
        status: 'success',
        payload: {
            id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.role
        }
    });
}