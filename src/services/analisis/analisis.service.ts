import { Analisis, Transcripcion, Parametro } from "../../entities";

import { IAnalisisCreate } from "../../interfaces/IAnalisisCreate";

import { AppDataSource } from "../../config/typeOrm";

export class AnalisisService {
    public analisisRepository = AppDataSource.getRepository(Analisis);
    private transcripcionRepository =
        AppDataSource.getRepository(Transcripcion);
    private parametroRepository = AppDataSource.getRepository(Parametro);
    constructor() {}

    public async createAnalisis(data: IAnalisisCreate): Promise<Analisis> {
        const transcripcion = await this.transcripcionRepository.findOneBy({
            id: data.transcripcion.id,
        });

        const parametro = await this.parametroRepository.findOneBy({
            id: data.parametro.id,
        });

        if (!transcripcion) {
            throw new Error("Transcripcion not found");
        }
        if (!parametro) {
            throw new Error("Parametro not found");
        }
        const analisis = this.analisisRepository.create(data);
        return await this.analisisRepository.save(analisis);
    }

    public async getAllAnalisis(): Promise<Analisis[]> {
        return await this.analisisRepository.find();
    }

    public async getAnalisisById(id: number): Promise<Analisis | null> {
        return await this.analisisRepository.findOneBy({ id });
    }
}
