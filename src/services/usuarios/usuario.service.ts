import { Empleado, Servicio, Usuario } from "../../entities";
import { AppDataSource } from "../../config/typeOrm";

import bcrypt from "bcrypt";

interface ICrearUsuarioInterface {
    password: string;
    name: string;
    last_name: string;
    ci: string;
    email: string;
    servicioId: number;
}

export class UsuarioService {
    private readonly userRepository = AppDataSource.getRepository(Usuario);
    private readonly empleadoRepository = AppDataSource.getRepository(Empleado);
    private readonly servicioRepository = AppDataSource.getRepository(Servicio);

    constructor() {}

    public async create(
        data: ICrearUsuarioInterface
    ): Promise<Partial<Usuario>> {
        let { password, name, last_name, ci, email, servicioId } = data;

        const userName = email.split("@")[0];
        const usuarioExiste = await this.userRepository.findOneBy({
            userName,
        });

        const servicioExiste = await this.servicioRepository.findOneBy({
            id: servicioId,
        });
        if (usuarioExiste) {
            throw new Error("User already exists");
        }

        if (!servicioExiste) {
            throw new Error("Servicio no existe");
        }

        if (password) {
            data.password = await bcrypt.hash(password, 15);
        }

        const empleadoData = {
            name,
            last_name,
            ci,
            email,
        };

        const nuevaEmpleado = this.empleadoRepository.create(empleadoData);
        await this.empleadoRepository.save(nuevaEmpleado);
        const nuevoUsuario = await this.userRepository.create({
            userName: userName,
            password: data.password,
            empleado: nuevaEmpleado,
            servicio: servicioExiste,
        });
        await this.userRepository.save(nuevoUsuario);

        return {
            id: nuevoUsuario.id,
            userName: nuevoUsuario.userName,
            servicio: servicioExiste,
        };
    }

    public async findByUser(userName: string): Promise<Usuario | null> {
        const usuarioExiste = await this.userRepository.findOne({
            where: { userName },
            relations: ["servicio"],
        });

        if (!usuarioExiste) {
            throw new Error("User not found");
        }
        return usuarioExiste;
    }
}
