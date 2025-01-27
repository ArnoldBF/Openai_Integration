import { AppDataSource } from "../../config/typeOrm";
import { Transcripcion, Audio } from "../../models/index";

import boom from "@hapi/boom";

interface TranscripcionInterface {
    audio: Audio;
    transcripcion?: string;
    fileName?: string;
}

export class TranscripcionService {
    private transcripcionRepository =
        AppDataSource.getRepository(Transcripcion);
    private audioRepository = AppDataSource.getRepository(Audio);

    constructor() {}

    public async createTranscripcion(
        data: TranscripcionInterface
    ): Promise<Transcripcion> {
        const audio = await this.audioRepository.findOneBy({
            id: data.audio.id,
        });
        if (!audio) {
            throw boom.badRequest("Audio not found");
        }
        const transcripcion = this.transcripcionRepository.create(data);
        await this.transcripcionRepository.save(transcripcion);
        return transcripcion;
    }

    public async getTranscripcion(
        fileName: string
    ): Promise<Partial<Transcripcion>> {
        const transcripcion = await this.transcripcionRepository.findOneBy({
            fileName,
        });

        if (!transcripcion) {
            throw boom.badRequest("Transcripcion not found");
        }

        return transcripcion;
    }

    public async getTranscripcionProcessor(
        fileName: string
    ): Promise<Partial<Transcripcion | null>> {
        const transcripcion = await this.transcripcionRepository.findOneBy({
            fileName,
        });

        return transcripcion;
    }
}
