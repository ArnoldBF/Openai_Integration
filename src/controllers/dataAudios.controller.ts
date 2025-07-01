import { NextFunction, Request, Response } from "express";

import { DataAudioService } from "../services/audios/dataAudio.service";

export async function getDataAudioByAudioId(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const audioId = parseInt(req.params.audioId, 10);
        const dataAudioService = new DataAudioService();
        const dataAudios = await dataAudioService.getDataAudioByAudioId(
            audioId
        );
        console.log(
            "dataAudioExistente (detallado):",
            JSON.stringify(dataAudios, null, 2)
        );
        // Siempre responder 200, aunque el array esté vacío
        return res.status(200).json(dataAudios || []);
    } catch (error) {
        next(error);
    }
}
