import { NextFunction, Request, Response } from "express";

import { ClaveAnalisisService } from "../services";

export async function createClaveAnalisis(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const claveAnalisisService = new ClaveAnalisisService();
        const claveAnalisis = await claveAnalisisService.createClaveAnalisis(
            req.body
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
        const claveAnalisisService = new ClaveAnalisisService();
        const clavesAnalisis =
            await claveAnalisisService.getAllClavesAnalisisEndPoint();
        res.status(200).json(clavesAnalisis);
    } catch (error) {
        next(error);
    }
}
