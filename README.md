# PROYECTO BACKEND EVENTOS #

## PreEntrega 6 - Entidad EVENT, reglas de negocio (commit v1.19) ##

| Metodo | Ruta	| Acceso |  
| --- | --- | --- |  
| POST | /api/events | organizer, admin |  
| GET | /api/events | publico |  
| GET | /api/events/:eventId | publico |  
| PUT | /api/events/:eventId | dueño del avento o admin |  
| PATCH | /api/events/:eventId/status | dueño del avento o admin |  

Filtra por igualda: status, category.
Filtra por rango de fechas (dateFrom, dateTo)
Filtra por semejanza: name, description, location
Soporta paginación (page, limit)
Soporta ordenamiento por fecha (sort=date o sort=-date)

** Reglas de Negocio: **

- campos obligatorios: name, description, category, date, location, capacity, price
- status acepta solo valores definidos: draft, published, cancelled, finished (default draft)
- capacity > 0; price≥ 0;
- Un organizer no puede modificar eventos ajenos (sí puede admin)
- Solo pueden modificarse eventos en estado borrador
- El endpoint DELETE no "borra" eventos, los pasa a estado "cancelled"
- No se permiten fechas pasadas al crear
- Un evento en estado "draft" puede pasar a "published" o "cancelled"
- Un evento en estado "published" puede pasar a "finished" o "cancelled"
- Un evento en estado "finished" o "cancelled" no puede cambiar de estado
- Los users solo pueden ver eventos con estado "published" o "finished"
 

## PreEntrega 5 - ROLES (commit v1.17) ##

Roles posibles: user (default) - organizer - admin

### Matriz de permisos ###

| Acción | user	| organizer | admin |
| --- | --- | --- | --- |  
| Consultar eventos publicados | ✅ | ✅ | ✅ |
| Crear eventos	| ❌ | ✅	| ✅ |
| Modificar/cancelar eventos propios | ❌ | ✅ | ✅ |
| Modificar cualquier evento | ❌ | ❌ | ✅ |
| Ver todos los usuarios | ❌ | ❌ | ✅ |

### Rutas protegidas ###

TODAS las rutas requieren de autenticación (login). En caso de login incorrecto devuelve 401.

Algunas rutas requieren autorización (rol). En caso de rol distinto, devuelve 403.

Solo accede admin:  
GET /api/users/
GET /api/users/:email
PUT /api/users/:email

Solo admin y organizer:  
POST /api/events/

Solo admin y organizer (organizer a los propios y admin a todos):  
PUT /api/events/:eventId
DELETE /api/events/:eventId



## PreEntrega 4 (commit v1.12) ##

Node JS + Mongo DB + JWT + Passport

Dependencias:

Express  
Mongoose  
Dotenv  
JsonWebToken  
Bcrypt  
Passport  
Passport-local  
Passport-jwt  


PreEntrega 3 (commit v1.07)

Node JS + Mongo DB + JWT

Dependencias:

Express
Mongoose
Dotenv
JsonWebToken
Bcrypt


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
