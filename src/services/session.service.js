import { userModel } from '../models/user.model.js';
import { hashPassword } from '../utils/hash.js';

export async function registerService(userData) {
    const { first_name, last_name, email, password } = userData;

    // Validar campos obligatorios
    if (!first_name || !last_name || !email || !password) {
        throw new Error('Todos los campos son obligatorios');
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Formato de correo electrónico inválido');
    }

    // Verificar si el correo ya ya está registrado
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error('El correo electrónico ya está registrado');
    }

    // Verificar longitud de la contraseña
    if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    const hashedPassword = await hashPassword(password);

    // Si no hay errores, crear el nuevo usuario
    const newUser = await userModel.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role: "user"
    });

    // Responder al controller
    const userResponse = newUser.toObject();
    delete userResponse.password; // Eliminar la contraseña de la respuesta
    return userResponse;

}