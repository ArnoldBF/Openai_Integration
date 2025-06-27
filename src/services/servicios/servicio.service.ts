import { Servicio, Cliente } from "../../entities";

import { AppDataSource } from "../../config/typeOrm";

export interface IServicioCreate {
    clienteId: number;
    name?: string;
}

export class ServicioService {
    private servicioRepository = AppDataSource.getRepository(Servicio);
    private clienteRepository = AppDataSource.getRepository(Cliente);

    constructor() {}

    public async createServicio(data: IServicioCreate): Promise<Servicio> {
        const cliente = await this.clienteRepository.findOneBy({
            id: data.clienteId,
        });
        if (!cliente) {
            throw new Error("Cliente not found");
        }
        const dataServicio = {
            name: data.name,
            cliente: cliente,
        };
        const servicio = this.servicioRepository.create(dataServicio);
        return await this.servicioRepository.save(servicio);
    }

    public async getAllServicios(): Promise<Servicio[]> {
        return await this.servicioRepository.find({
            relations: ["cliente"],
        });
    }

    public async getAllServiciosEndPoint(): Promise<Servicio[]> {
        return await this.servicioRepository.find({
            select: ["id", "name"],
            // relations: ["cliente"],
        });
    }

    public async getServicioByIdPrueba(id: number): Promise<Servicio | null> {
        return await this.servicioRepository.findOne({
            where: { id },
            relations: ["cliente"],
        });
    }

    public async getServicioById(id: number): Promise<Servicio> {
        const servicio = await this.servicioRepository.findOneBy({ id });

        if (!servicio) {
            throw new Error("Servicio not found");
        }
        return servicio;
    }
}
