import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import boom from "@hapi/boom";
import config from "../config/config";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "./usuarios/usuario.service";

export class AuthService {
    private readonly usuarioService = new UsuarioService();

    public async login(
        userNameParm: string,
        passwordParam: string
    ): Promise<Partial<Usuario>> {
        const usuario = await this.usuarioService.findByUser(userNameParm);
        if (
            !usuario ||
            !usuario.password ||
            !(await bcrypt.compare(passwordParam, usuario.password))
        ) {
            throw boom.unauthorized();
        }

        const { password, ...usuarioSinPassword } = usuario;
        console.log(usuarioSinPassword);

        return usuarioSinPassword;
    }

    public signToken(usuario: any) {
        const payload = {
            sub: usuario.id,
            servicio: usuario.servicio.id,
            userName: usuario.userName,
        };

        if (!config.jwtSecret) {
            throw new Error("JWT Secret is not defined");
        }

        const token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: "10min",
        });

        return {
            usuario,
            token,
        };
    }
}
