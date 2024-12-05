import { Request, Response, NextFunction } from "express";

export function logErrors(
    err: any,
    req: Request,
    res: Request,
    next: NextFunction
) {
    console.error(err);
    next(err);
}

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const statusCode = err.output?.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Unexpected error",
        stack: err.stack || "No stack defined",
    });
}

export function boomErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    } else {
        next(err);
    }
}
