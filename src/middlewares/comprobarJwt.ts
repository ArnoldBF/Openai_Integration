import { Response, NextFunction } from "express";

export function extraerDatosJWT(req: any, res: Response, next: NextFunction) {
    const { servicio, userName, sub } = req.user;

    if (!servicio) {
        res.status(400).json({
            message: "Datos insuficientes en el token",
        });
    }

    req.servicio = servicio;
    req.userName = userName;
    req.sub = sub;
    next();
}
