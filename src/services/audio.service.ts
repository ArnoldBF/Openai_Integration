import { AppDataSource } from "../config/typeOrm";
import { Audio } from "../models/index";
import boom from "@hapi/boom";

export interface AudioInterface {
    id_llamada: string;
    fecha: Date;
    hora: string;
    duracion: number;
    campana: string;
    interno: string;
    nodo: string;
    cliente: string;
    tipo_llamada: string;
    agente: string;
    numero_remoto: string;
    transcrito?: number;
}

export class AudioService {
    private audioRepository = AppDataSource.getRepository(Audio);
    constructor() {}
    public async createAudio(data: AudioInterface): Promise<Audio> {
        const { id_llamada } = data;
        const audioExits = await this.audioRepository.findOneBy({
            id_llamada,
        });

        if (audioExits) {
            throw boom.badRequest("Audio already exists");
        }

        const audio = this.audioRepository.create(data);
        await this.audioRepository.save(audio);
        return audio;
    }

    async getAudios() {
        return await this.audioRepository.find();
    }

    async getAudioById(id: number): Promise<Partial<Audio>> {
        const audio = await this.audioRepository.findOne({
            select: [
                "id",
                "id_llamada",
                "fecha",
                "hora",
                "duracion",
                "campana",
                "nodo",
                "cliente",
                "tipo_llamada",
                "agente",
                "numero_remoto",
            ],
            where: { id },
        });
        if (!audio) {
            throw boom.badRequest("Audio not found");
        }

        return audio;
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
