import { NextFunction, Request, Response } from "express";

import { ServicioService } from "../services";

export async function createServicio(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const servicioService = new ServicioService();
        const servicio = await servicioService.createServicio(req.body);
        res.status(201).json(servicio);
    } catch (error) {
        next(error);
    }
}

export async function getServiciosAll(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { sub } = (req as any).user;
        const servicioService = new ServicioService();
        const servicios = await servicioService.getAllServiciosEndPoint(
            Number(sub)
        );
        res.status(200).json(servicios);
    } catch (error) {
        next(error);
    }
}
