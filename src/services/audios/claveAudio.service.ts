import { NumericType } from "typeorm";
import { AppDataSource } from "../../config/typeOrm";
import { ClaveAudio } from "../../entities";
import boom from "@hapi/boom";

interface ClaveAudioInterface {
    clave: string;
    descripcion: string;
}

export class ClaveAudioService {
    private claveAudioRepository = AppDataSource.getRepository(ClaveAudio);
    constructor() {}

    public async createClaveAudio(
        data: ClaveAudioInterface
    ): Promise<ClaveAudio | undefined> {
        const claveAudio = this.claveAudioRepository.create(data);
        const claveSave = await this.claveAudioRepository.save(claveAudio);
        return claveSave;
    }

    public async getClaveById(clave: string): Promise<ClaveAudio | null> {
        const claveAudio = await this.claveAudioRepository.findOneBy({ clave });
        return claveAudio;
    }

    public async getAllClavesAudio(): Promise<ClaveAudio[]> {
        return await this.claveAudioRepository.find();
    }
}
