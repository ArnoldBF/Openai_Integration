import { Parametro, Prompt, TipoAnalisis } from "../../entities";

import { IParametroCreate } from "../../interfaces/IParametroCreate";

import { AppDataSource } from "../../config/typeOrm";

export class ParametroAnalisisService {
    private parametroRepository = AppDataSource.getRepository(Parametro);
    private promptRepository = AppDataSource.getRepository(Prompt);
    private tipoAnalisisRepository = AppDataSource.getRepository(TipoAnalisis);

    constructor() {}

    public async createParametro(data: IParametroCreate): Promise<Parametro> {
        const { promptId, tipoId, ...resto } = data;

        const prompt = await this.promptRepository.findOneBy({
            id: data.promptId,
        });
        const tipo = await this.tipoAnalisisRepository.findOneBy({
            id: data.tipoId,
        });

        if (!prompt) {
            throw new Error("Prompt not found");
        }

        if (!tipo) {
            throw new Error("Tipo de análisis not found");
        }

        if (!data.campo_1 || !data.campo_2 || !data.campo_3) {
            throw new Error("campo_1, campo_2 and campo_3 are required");
        }

        const dataParametros = {
            prompt,
            tipo,
            ...resto,
        };

        const parametro = this.parametroRepository.create(dataParametros);
        return await this.parametroRepository.save(parametro);
    }

    public async getAllParametros(): Promise<Parametro[]> {
        return await this.parametroRepository.find({
            select: [
                "id",
                "campo_1",
                "campo_2",
                "campo_3",
                "campo_4",
                "campo_5",
                "campo_6",
                "campo_7",
                "campo_8",
                "campo_9",
                "campo_10",
            ],

            relations: ["prompt", "tipo"],
        });
    }

    public async getAllParametrosEndPoint(): Promise<Parametro[]> {
        return await this.parametroRepository.find({
            select: ["id", "name"],
        });
    }

    public async getParametroById(id: number): Promise<Parametro | null> {
        return await this.parametroRepository.findOne({
            where: { id },
            relations: ["prompt", "tipo"],
        });
    }
}
