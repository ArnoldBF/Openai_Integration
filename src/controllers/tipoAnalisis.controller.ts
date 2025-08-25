import { Request, Response, NextFunction } from "express";

import { TipoAnalisisService } from "../services";

export async function createTipoAnalisis(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { servicio } = (req as any).user;
        const { name, description } = req.body;
        const tipoAnalisisService = new TipoAnalisisService();
        let data = {
            name,
            description,
            servicio,
        };
        const tipoAnalisis = await tipoAnalisisService.createTipoAnalisis(data);
        res.status(201).json(tipoAnalisis);
    } catch (error) {
        next(error);
    }
}
export async function getTiposAnalisisAll(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { servicio } = (req as any).user;
        const tipoAnalisisService = new TipoAnalisisService();
        const tiposAnalisis =
            await tipoAnalisisService.getAllTiposAnalisisEndPoint(
                Number(servicio)
            );
        res.status(200).json(tiposAnalisis);
    } catch (error) {
        next(error);
    }
}

export async function putTipoAnalisis(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const tipoAnalisisService = new TipoAnalisisService();
        const tipoAnalisis = await tipoAnalisisService.updateTipoAnalisis(
            Number(req.params.id),
            req.body
        );

        res.status(200).json(tipoAnalisis);
    } catch (error) {
        next(error);
    }
}
