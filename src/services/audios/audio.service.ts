import { AppDataSource } from "../../config/typeOrm";
import { Audio } from "../../models/index";
import boom from "@hapi/boom";

export interface AudioInterface {
    fileName?: string;
    cliente?: string;
    transcrito?: number;
}

interface updateAudio {
    transcrito?: number;
}

export class AudioService {
    private audioRepository = AppDataSource.getRepository(Audio);
    constructor() {}
    public async createAudio(data: AudioInterface): Promise<Audio> {
        const audio = this.audioRepository.create(data);
        return await this.audioRepository.save(audio);
    }

    async getAudios(): Promise<Audio[]> {
        return await this.audioRepository.find({ relations: ["data"] });
    }

    async getAudio(fileName: string): Promise<Partial<Audio>> {
        const audio = await this.audioRepository.findOneBy({ fileName });
        if (!audio) {
            throw boom.badRequest("Audio not found");
        }

        return audio;
    }
    async getAudioProcessor(fileName: string): Promise<Partial<Audio> | null> {
        const audio = await this.audioRepository.findOneBy({ fileName });

        return audio;
    }
    async updateAudio(
        id: number,
        audio: updateAudio
    ): Promise<Partial<Audio | null>> {
        await this.audioRepository.update(id, audio);
        return await this.audioRepository.findOneBy({ id });
    }

    // async deleteAudio(id: number) {
    //     await this.audioRepository.delete(id);
    //     return { id };
    // }
}
