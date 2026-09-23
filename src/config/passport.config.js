import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { userModel } from "../models/user.model.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { env } from "../config/env.js"


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
        const { first_name, last_name } = req.body

        if (!first_name || !last_name || !email || !password) {
          return done(null, false, { message: 'Todos los campos son obligatorios' })
        }

        const normalizedEmail = email.toLowerCase().trim()

        const userExists = await userModel.findOne({ email: normalizedEmail })

        if (userExists) {
          return done(null, false, { message: 'Ya existe un usuario registrado con ese email' })
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await userModel.create({
          first_name,
          last_name,
          email: normalizedEmail,
          password: hashedPassword,
          role: 'user'
        })

        return done(null, newUser)
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
      usernameField: 'email'
    },
    async (email, password, done) => {
           
 try {
        const normalizedEmail = email.toLowerCase().trim()

        const user = await userModel.findOne({ email: normalizedEmail })
               
   if (!user) {
          return done(null, false, { message: 'Credenciales inválidas' })
        }

        const validPassword = await verifyPassword(password, user.password);
              
   if (!validPassword) {
          return done(null, false, { message: 'Credenciales inválidas' })
        }

    return done(null, user)
          
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
        const user = await userModel.findById(jwtPayload.id)

        if (!user) {
          return done(null, false, {
            message: 'Usuario no encontrado'
          })
        }

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)
