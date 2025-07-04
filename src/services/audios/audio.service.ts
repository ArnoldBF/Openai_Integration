import { AppDataSource } from "../../config/typeOrm";
import { Audio, Servicio } from "../../entities/index";
import { IAudioCreate } from "../../interfaces/IAudioCreate";
import { IAudioUpdate } from "../../interfaces/IAudioUpdate";
import boom from "@hapi/boom";

export class AudioService {
    private audioRepository = AppDataSource.getRepository(Audio);
    private servicioRepository = AppDataSource.getRepository(Servicio);
    constructor() {}
    public async createAudio(data: IAudioCreate): Promise<Audio> {
        const servicio = await this.servicioRepository.findOneBy({
            id: data.servicio.id,
        });
        if (!servicio) {
            throw boom.badRequest("Servicio not found");
        }
        const audio = this.audioRepository.create(data);
        return await this.audioRepository.save(audio);
    }

    async getAudios(): Promise<Audio[]> {
        return await this.audioRepository.find({ relations: ["data"] });
    }

    async getAudio(fileName: string): Promise<Audio> {
        const audio = await this.audioRepository.findOneBy({ fileName });
        if (!audio) {
            throw boom.badRequest("Audio not found");
        }

        return audio;
    }
    async getAudioProcessor(fileName: string): Promise<Audio | null> {
        const audio = await this.audioRepository.findOneBy({
            fileName,
        });

        return audio;
    }
    async updateAudio(
        id: number | undefined,
        audio: IAudioUpdate
    ): Promise<Audio | null> {
        if (!id) {
            throw boom.badRequest("ID is required");
        }
        await this.audioRepository.update(id, audio);
        return await this.audioRepository.findOneBy({ id });
    }
}
