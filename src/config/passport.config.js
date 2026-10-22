import { env } from "../config/env.js"
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { UserRepository } from '../repositories/user.repository.js'
import { LoginUserDTO, RegisterUserDTO, SessionUserDataDTO } from "../dto/user.dto.js";
import passport from "passport";

const userRepository = new UserRepository();

const cookieExtractor = req => {
  let token = null
  if (req && req.signedCookies) {
    token = req.signedCookies.currentUser
  }
  return token
}

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {

        const userData = new RegisterUserDTO(req.body)

        const userExists = await userRepository.getUserByEmail(userData.email);

        if (userExists) {
          return done(new Error('Ya existe un usuario registrado con ese email'), false, { message: 'Ya existe un usuario registrado con ese email' })
        }

        const hashedPassword = await hashPassword(userData.password)

        const newUser = await userRepository.createUser( {...userData, password: hashedPassword} );

        return done(null, new SessionUserDataDTO(newUser))
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
           
 try {
        const userData = new LoginUserDTO(req.body)

        const user = await userRepository.getUserByEmail(userData.email);

   if (!user) {
          return done(new Error ('Credenciales inválidas'), false, { message: 'Credenciales inválidas' })
        }

        const validPassword = await verifyPassword(userData.password, user.password);
              
   if (!validPassword) {
          return done(new Error ('Credenciales inválidas'), false, { message: 'Credenciales inválidas' })
        }

    return done(null, new SessionUserDataDTO(user))
          
} catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  'current',
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: env.JWT_SECRET
    },
    async (jwtPayload, done) => {
      try {
        const user = await userRepository.getUserById(jwtPayload.id)

        if (!user) {
          return done(null, false, {
            message: 'Usuario no encontrado'
          })
        }

        return done(null, new SessionUserDataDTO(user))
      } catch (error) {
        return done(error)
      }
    }
  )
)
