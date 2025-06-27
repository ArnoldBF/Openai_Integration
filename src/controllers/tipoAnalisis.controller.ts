import { Request, Response, NextFunction } from "express";

import { TipoAnalisisService } from "../services";

export async function createTipoAnalisis(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const tipoAnalisisService = new TipoAnalisisService();
        const tipoAnalisis = await tipoAnalisisService.createTipoAnalisis(
            req.body
        );
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
        const tipoAnalisisService = new TipoAnalisisService();
        const tiposAnalisis =
            await tipoAnalisisService.getAllTiposAnalisisEndPoint();
        res.status(200).json(tiposAnalisis);
    } catch (error) {
        next(error);
    }
}
