import { DataAnalisis, ClaveAnalisis, Analisis } from "../../entities";

import { IDataAnalisisCreate } from "../../interfaces/IDataAnalisisCreate";

import { AppDataSource } from "../../config/typeOrm";

export class DataAnalisisService {
    public dataAnalisisRepository = AppDataSource.getRepository(DataAnalisis);
    private claveAnalisisRepository =
        AppDataSource.getRepository(ClaveAnalisis);
    private analisisRepository = AppDataSource.getRepository(Analisis);

    constructor() {}

    public async createDataAnalisis(
        data: IDataAnalisisCreate
    ): Promise<DataAnalisis> {
        const claveAnalisis = await this.claveAnalisisRepository.findOneBy({
            id: data.clave.id,
        });
        const analisis = await this.analisisRepository.findOneBy({
            id: data.analisis.id,
        });
        if (!claveAnalisis) {
            throw new Error("ClaveAnalisis not found");
        }

        if (!analisis) {
            throw new Error("Analisis not found");
        }
        const dataAnalisis = this.dataAnalisisRepository.create(data);
        return await this.dataAnalisisRepository.save(dataAnalisis);
    }

    public async getAllDataAnalisis(): Promise<DataAnalisis[]> {
        return await this.dataAnalisisRepository.find();
    }

    public async getDataAnalisisById(id: number): Promise<DataAnalisis | null> {
        return await this.dataAnalisisRepository.findOneBy({ id });
    }
}
