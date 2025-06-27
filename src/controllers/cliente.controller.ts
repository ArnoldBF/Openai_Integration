import { Request, Response, NextFunction } from "express";

import { ClienteService } from "../services";

export async function createCliente(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const clienteService = new ClienteService();
        const cliente = await clienteService.createCliente(req.body);
        res.status(201).json(cliente);
    } catch (error) {
        next(error);
    }
}
