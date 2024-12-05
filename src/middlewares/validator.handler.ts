import boom from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

function validatorHandler(
    schema: ObjectSchema,
    property: "body" | "query" | "params"
) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        if (error?.details) {
            next(boom.badRequest(error));
        }
        next();
    };
}

export default validatorHandler;
