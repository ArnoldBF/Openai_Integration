import { TipoAnalisis } from "../../entities";

import { AppDataSource } from "../../config/typeOrm";

export class TipoAnalisisService {
    private tipoAnalisisRepository = AppDataSource.getRepository(TipoAnalisis);

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

    public async getAllTiposAnalisisEndPoint(): Promise<TipoAnalisis[]> {
        return await this.tipoAnalisisRepository.find({
            select: ["id", "name"],
        });
    }

    public async getTipoAnalisisById(id: number): Promise<TipoAnalisis | null> {
        return await this.tipoAnalisisRepository.findOneBy({ id });
    }
}
