import { ClaveAnalisis } from "../../entities";

import { AppDataSource } from "../../config/typeOrm";

import { IClaveAnalisis } from "../../interfaces/IClaveAnalisis";

export class ClaveAnalisisService {
    private claveAnalisisRepository =
        AppDataSource.getRepository(ClaveAnalisis);

    constructor() {}

    public async createClaveAnalisis(
        data: IClaveAnalisis
    ): Promise<ClaveAnalisis> {
        const claveAnalisis = this.claveAnalisisRepository.create(data);
        return await this.claveAnalisisRepository.save(claveAnalisis);
    }

    public async getAllClavesAnalisis(): Promise<ClaveAnalisis[]> {
        return await this.claveAnalisisRepository.find();
    }

    public async getAllClavesAnalisisEndPoint(): Promise<ClaveAnalisis[]> {
        return await this.claveAnalisisRepository.find({
            select: ["id", "clave"],
        });
    }

    public async getClaveAnalisisById(
        id: number
    ): Promise<ClaveAnalisis | null> {
        return await this.claveAnalisisRepository.findOneBy({ id });
    }
}
