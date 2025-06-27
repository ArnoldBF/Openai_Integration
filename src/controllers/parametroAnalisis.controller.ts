import { Request, Response, NextFunction } from "express";

import { ParametroAnalisisService } from "../services";

export async function createParametroAnalisis(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const parametroAnalisisService = new ParametroAnalisisService();
        const parametro = await parametroAnalisisService.createParametro(
            req.body
        );
        res.status(201).json(parametro);
    } catch (error) {
        next(error);
    }
}

export async function getParametrosAnalisisAll(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const parametroAnalisisService = new ParametroAnalisisService();
        const parametros =
            await parametroAnalisisService.getAllParametrosEndPoint();
        res.status(200).json(parametros);
    } catch (error) {
        next(error);
    }
}
