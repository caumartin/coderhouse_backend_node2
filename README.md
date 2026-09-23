PROYECTO BACKEND EVENTOS

PreEntrega 4 (commit v1.10)


PreEntrega 3 (commit v1.07)

Tecnología: Node JS + Mongo DB + JWT

Dependencias:

Express
Mongoose
Dotenv
JsonWebToken


Variables de entorno en archivo .env.example
`NODE_ENV` indica el entorno actual. Usa `development` en local y define `NODE_ENV=production` en el servidor de producción.


Rutas desplegadas:

endpoint: /api/sessions/register
método: POST
payload:
{
  "first_name": "Carlos",
  "last_name": "Martin",
  "email": "carlos_martin@gmail.com",
  "password": "xxxxxxxx"
  }
response:
{
  "status": "success",
  "message": "Usuario registrado exitosamente",
  "data": {
    "first_name": "Carlos",
    "last_name": "Martin",
    "email": "carlos_martin@gmail.com",
    "role": "user",
    "_id": "6ab3c314a8d6fed0ba9993c2",
    "__v": 0
    }
  }


endpoint: /api/sessions/login
método: POST
payload:
{
  "email": "carlos_martin@gmail.com",
  "password": "xxxxxxxx"
  }
response:
{
  "status": "success",
  "message": "Inicio de sesión exitoso",
  "data": {
    "first_name": "Carlos",
    "last_name": "Martin",
    "email": "carlos_martin@gmail.com",
    "role": "user",
    "__v": 0
  }
}


endpoint: /api/sessions/current
método: GET
response:
{
  "first_name": "Carlos",
  "last_name": "Martin",
  "email": "carlos_martin@gmail.com",
  "role": "user",
  "__v": 0,
  "iat": 1790165976,
  "exp": 1790169576
}


endpoint: /api/sessions/logout
método: DELETE
response:
{
  "status": "success",
  "message": "Cierre de sesión exitoso"
}

---------------------------------------------------------------------------------------------------


PreEntrega 1

Tecnología: Node JS + Mongo DB

Dependencias:

Express
Mongoose
Dotenv

Variables de entorno en archivo .env

Ejecutar con npm run start

Rutas desplegadas:

/health
/api/events
