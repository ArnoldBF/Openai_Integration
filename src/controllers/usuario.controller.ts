import { Request, Response, NextFunction } from "express";

import { UsuarioService } from "../services/usuarios/usuario.service";

const usuarioService = new UsuarioService();

export async function crearUsuario(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { name, last_name, ci, email, password, servicioId } = req.body;
    try {
        const data = {
            password,
            name,
            last_name,
            ci,
            email,
            servicioId,
        };

        const usuario = await usuarioService.create(data);

        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
}
