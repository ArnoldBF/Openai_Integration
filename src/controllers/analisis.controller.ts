import { Request, Response, NextFunction } from "express";

async function createAnalisis(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(201).json({ message: "Analisis created" });
    } catch (error) {
        next(error);
    }
}
