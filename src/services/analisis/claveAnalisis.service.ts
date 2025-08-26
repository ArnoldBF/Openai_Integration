import { ClaveAnalisis, Servicio } from "../../entities";

import { AppDataSource } from "../../config/typeOrm";

import { IClaveAnalisis } from "../../interfaces/IClaveAnalisis";

export class ClaveAnalisisService {
    private claveAnalisisRepository =
        AppDataSource.getRepository(ClaveAnalisis);
    private readonly servicioRepository = AppDataSource.getRepository(Servicio);

    constructor() {}

    public async createClaveAnalisis(
        data: Partial<ClaveAnalisis>
    ): Promise<ClaveAnalisis> {
        const claveAnalisis = this.claveAnalisisRepository.create(data);
        return await this.claveAnalisisRepository.save(claveAnalisis);
    }

    public async getAllClavesAnalisis(): Promise<ClaveAnalisis[]> {
        return await this.claveAnalisisRepository.find();
    }

    public async getAllClavesAnalisisEndPoint(
        servicioId: number
    ): Promise<ClaveAnalisis[]> {
        return await this.claveAnalisisRepository.find({
            select: ["id", "clave", "descripcion"],
            where: { servicio: { id: servicioId } },
        });
    }

    public async getClaveAnalisisById(
        id: number
    ): Promise<ClaveAnalisis | null> {
        return await this.claveAnalisisRepository.findOneBy({ id });
    }

    public async updateTipoAnalisis(
        id: number,
        data: any
    ): Promise<Partial<ClaveAnalisis>> {
        await this.claveAnalisisRepository.update(id, data);

        const claveAnalasis = await this.claveAnalisisRepository.findOneBy({
            id,
        });

        if (!claveAnalasis) {
            throw new Error("tipo de analisis no encontrado");
        }

        return claveAnalasis;
    }

    // public async updateClaveAnalisis(
    //     id: number,
    //     data: any
    // ): Promise<Partial<ClaveAnalisis>> {
    //     await this.claveAnalisisRepository.update(id, data);

    //     const claveAcutalizada = await this.claveAnalisisRepository.findOneBy({
    //         id,
    //     });

    //     if (!claveAcutalizada) {
    //         throw new Error("clave de analisis no encontrada");
    //     }

    //     return claveAcutalizada;
    // }
}
