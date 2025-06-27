import { NextFunction, Request, Response } from "express";

import { ClaveAudioService } from "../services";

export async function createClaveAudio(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const claveAudioService = new ClaveAudioService();
        const claveAudio = await claveAudioService.createClaveAudio(req.body);
        res.status(201).json(claveAudio);
    } catch (error) {
        next(error);
    }
}
export async function getClavesAudioAll(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const claveAudioService = new ClaveAudioService();
        const clavesAudio = await claveAudioService.getAllClavesAudio();
        res.status(200).json(clavesAudio);
    } catch (error) {
        next(error);
    }
}
