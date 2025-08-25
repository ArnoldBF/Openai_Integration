import { NextFunction, Request, Response } from "express";

import { ClaveAnalisisService } from "../services";

export async function createClaveAnalisis(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { servicio } = (req as any).user;

        const { clave, descripcion } = req.body;

        const data = {
            clave,
            descripcion,
            servicio,
        };

        const claveAnalisisService = new ClaveAnalisisService();
        const claveAnalisis = await claveAnalisisService.createClaveAnalisis(
            data
        );
        res.status(201).json(claveAnalisis);
    } catch (error) {
        next(error);
    }
}

export async function getClavesAnalisisAll(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { servicio } = (req as any).user;
        const claveAnalisisService = new ClaveAnalisisService();
        const clavesAnalisis =
            await claveAnalisisService.getAllClavesAnalisisEndPoint(
                Number(servicio)
            );
        res.status(200).json(clavesAnalisis);
    } catch (error) {
        next(error);
    }
}

export async function putClaveAnalisis(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const claveAnalisisService = new ClaveAnalisisService();
        const claveAnalisis = await claveAnalisisService.updateTipoAnalisis(
            Number(req.params.id),
            req.body
        );

        res.status(200).json(claveAnalisis);
    } catch (error) {
        next(error);
    }
}
