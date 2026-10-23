# PROYECTO BACKEND EVENTOS #

## PreEntrega 8 - DAO, Repository, DTO (commit v1.48) ##

Capas desplegadas:

- routes: se definen los endpoints y se llama a los middelwares de autenticación y autorización 
- controllers: desempaquetan los datos de las consultas (params, body), llaman a los services y generan las respuestas (incluyendo manejo de errores). 
- services: preparan las consultas a db  y validan las respuestas
- repositories: se encuentran entre los services y los DAO, le dan sentido de negocio a las operaciones del DAO (ej: buscar ticket por Id) 
- DAO: Data Access Object, implementan métodos de interacción directa con la db, independientes del negocio (buscar, modificar, crear)
- DTO: Data Transfer Object, nos permite controlar los formatos de entrada y salida
- models: schemas de las distintas entidades
- utils: utilidades (hasheo de passwords, jwt, etc)
- config: archivos de configuración (variables de entorno, conexión a db, etc)


## PreEntrega 7 - Entidad TICKET, reglas de negocio (commit v1.33) ##

| Metodo | Ruta	| Acceso |  
| --- | --- | --- |  
| POST | /api/events/:eventId/tickets | cualquier usuario autenticado |  
| GET | /api/tickets/my-tickets | autenticado, solo propios |  
| GET | /api/events/:eventId/tickets | organizer (propios) o admin |  
| PATCH | /api/tickets/:ticketId/cancel | dueño del ticket o admin |  

### Validaciones al crear ticket ###

- El evento existe
- El evento está en estado published
- quantity es un número válido (> 0)
- Cupos disponibles ≥ quantity solicitada (solo cuentan tickets con status activo; los cancelled no ocupan cupo)
- El usuario no tiene ya un ticket activo para ese evento

### Validaciones al cancelar ticket ###

- Cambia status a cancelled y registra cancelledAt; no elimina el documento
- Valida que el ticket exista, pertenezca al solicitante (o sea admin) y no esté ya cancelado
- Al cancelar, el cupo queda disponible automáticamente (por no contarse en el cálculo)


## PreEntrega 6 - Entidad EVENT, reglas de negocio (commit v1.21) ##

| Metodo | Ruta	| Acceso |  
| --- | --- | --- |  
| POST | /api/events | organizer, admin |  
| GET | /api/events | cualquier usuario |  
| GET | /api/events/:eventId | cualquier usuario |  
| PUT | /api/events/:eventId | dueño del avento o admin |  
| PATCH | /api/events/:eventId/status | dueño del avento o admin |  

Filtra por igualda: status, category.
Filtra por rango de fechas (dateFrom, dateTo)
Filtra por semejanza: name, description, location
Soporta paginación (page, limit)
Soporta ordenamiento por fecha (sort=date o sort=-date)

### Reglas de Negocio: ###

- campos obligatorios: name, description, category, date, location, capacity, price
- status acepta solo valores definidos: draft, published, cancelled, finished (default draft)
- capacity > 0; price≥ 0;
- Un organizer no puede modificar eventos ajenos (sí puede admin)
- Solo pueden modificarse eventos en estado borrador
- Los eventos no se borran de la DB, se los pasa a estado "cancelled"
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
