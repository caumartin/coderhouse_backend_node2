import { eventModel } from "../models/event.model.js";

export function rolesPermission(roles) {
    return function (req, res, next) {
        try {
            if (roles.includes(req.user.role)) next()
            else throw new Error ('Acceso no permitido')
        } catch (error) {
            res.status(403).json({ status: "error", message: error.message })
        }
    }
}

export async function purchasePermission (req, res, next) {
    try {
        if (req.user.role == 'user') next();

        if (req.user.role == 'admin' || req.user.role == 'organizer') {
            const event = await eventModel.findById(req.params.eid)
            if (event.organizer == req.user.id){
                throw new Error ("No puedes comprar un ticket de tu evento");
            } else next();
        }
    } catch (error) {
        res.status(403).json({ status: "error", message: error.message });
    }
}

export async function eventPermission (req, res, next) {
    try {
        if (req.user.role == 'organizer') {
            const event = await eventModel.findById(req.params.eventId);
            if (event.organizer == req.user.id) next()
            else throw new Error ("Solo puedes modificar tus propios eventos");
        } else if (req.user.role == 'admin') next();
            else {
            throw new Error ('Acceso no permitido');
            }
    } catch (error) {
        res.status(403).json({ status: "error", message: error.message });
    }
}
