import { AppDataSource } from "../../config/typeOrm";
import { DataAudio, Audio, ClaveAudio } from "../../entities/index";

import boom from "@hapi/boom";

export interface DataAudioInterface {
    audio: Audio;
    clave: ClaveAudio;
    valor: string;
}

export class DataAudioService {
    private dataAudioRepository = AppDataSource.getRepository(DataAudio);
    private audioRepository = AppDataSource.getRepository(Audio);
    constructor() {}

    public async createDataAudio(data: DataAudioInterface): Promise<DataAudio> {
        const audio = this.audioRepository.findOneBy({
            id: data.audio.id,
        });
        if (!audio) {
            throw boom.badRequest("Audio not found");
        }
        const dataAudio = this.dataAudioRepository.create(data);
        await this.dataAudioRepository.save(dataAudio);
        return dataAudio;
    }

    async getAudios() {
        return await this.dataAudioRepository.find();
    }

    async getDataAudioById(audioId: number): Promise<Partial<DataAudio>> {
        const dataAudio = await this.dataAudioRepository.findOne({
            select: [],
            where: { audio: { id: audioId } },
        });
        if (!dataAudio) {
            throw boom.badRequest("Audio not found");
        }

        return dataAudio;
    }

    // Devuelve todos los registros de data_audio asociados a un audio por su id
    async getDataAudioByAudioId(audioId: number) {
        return await this.dataAudioRepository.find({
            where: { audio: { id: audioId } },
            relations: ["audio", "clave"],
        });
    }

    // async updateAudio(id: number, audio: AudioInterface) {
    //     await this.audioRepository.update(id, audio);
    //     return await this.audioRepository.findOne(id);
    // }

    // async deleteAudio(id: number) {
    //     await this.audioRepository.delete(id);
    //     return { id };
    // }
}
