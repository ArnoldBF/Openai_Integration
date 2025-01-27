import e, { Request, Response, NextFunction } from "express";

export function logErrors(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err.message);
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

export function uniqueConstraintErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (
        err.name === "QueryFailedError" &&
        err.message.includes("Violation of UNIQUE KEY constraint")
    ) {
        const value = err.message.match(/\((.*)\)/);
        const valueResult = value ? value[1] : "No value";
        res.status(409).json({
            message: `El valor: ${valueResult} ya existe en la base de datos`,
            stack: err.stack,
        });
    } else {
        next(err);
    }
}
