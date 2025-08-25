import { Request, Response, NextFunction } from "express";

import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const userLogin = req.user;
        const userLoged = authService.signToken(userLogin);
        const { usuario, ...token } = userLoged;

        res.status(200).json(token);
    } catch (error) {
        next(error);
    }
}
