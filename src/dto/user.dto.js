export class RegisterUserDTO{

    constructor(userData){
        const { first_name, last_name, email, password } = userData

        if (!first_name || !last_name || !email || !password) {
            throw new Error ('Todos los campos son obligatorios')
        }

        const normalizedEmail = email.toLowerCase().trim()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            throw new Error ('Formato de correo electrónico inválido')
        }

        if (password.length < 6) {
            throw new Error ('La contraseña debe tener al menos 6 caracteres')
        }

        return {
            ...userData,
            email: normalizedEmail,
            role: "user"
        };
    }
}

export class LoginUserDTO{

    constructor(userData){
        const { email, password } = userData

        if (!email || !password) {
            throw new Error ('Faltan campos obligatorios')
        }

        const normalizedEmail = email.toLowerCase().trim()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            throw new Error ('Formato de correo electrónico inválido')
        }

        return {
            ...userData,
            email: normalizedEmail,
        };
    }
}


export class SessionUserDataDTO{

    constructor(userData){
        this.id = userData._id
        this.email = userData.email
        this.role = userData.role
    }
}
