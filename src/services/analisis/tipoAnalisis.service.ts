import { Servicio, TipoAnalisis } from "../../entities";

import { AppDataSource } from "../../config/typeOrm";

export class TipoAnalisisService {
    private tipoAnalisisRepository = AppDataSource.getRepository(TipoAnalisis);
    private readonly servicioRepository = AppDataSource.getRepository(Servicio);

    constructor() {}

    public async createTipoAnalisis(
        data: Partial<TipoAnalisis>
    ): Promise<TipoAnalisis> {
        const tipoAnalisis = this.tipoAnalisisRepository.create(data);
        return await this.tipoAnalisisRepository.save(tipoAnalisis);
    }

    public async getAllTiposAnalisis(): Promise<TipoAnalisis[]> {
        return await this.tipoAnalisisRepository.find();
    }

    public async getAllTiposAnalisisEndPoint(
        servicioId: number
    ): Promise<TipoAnalisis[]> {
        return await this.tipoAnalisisRepository.find({
            select: ["id", "name", "description"],
            where: { servicio: { id: servicioId } },
        });
    }

    public async getTipoAnalisisById(id: number): Promise<TipoAnalisis | null> {
        return await this.tipoAnalisisRepository.findOneBy({ id });
    }

    public async updateTipoAnalisis(
        id: number,
        data: any
    ): Promise<Partial<TipoAnalisis>> {
        await this.tipoAnalisisRepository.update(id, data);

        const tipoActualizado = await this.tipoAnalisisRepository.findOneBy({
            id,
        });

        if (!tipoActualizado) {
            throw new Error("tipo de analisis no encontrado");
        }

        return tipoActualizado;
    }
}
