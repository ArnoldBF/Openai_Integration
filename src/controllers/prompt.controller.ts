import { NextFunction, Request, Response } from "express";

import { PromptService } from "../services";

export async function createPrompt(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const promptService = new PromptService();
        const prompt = await promptService.createPrompt(req.body);
        res.status(201).json(prompt);
    } catch (error) {
        next(error);
    }
}

export async function getPromptsAll(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const promptService = new PromptService();
        const prompts = await promptService.getPromptsAllEndPoint();
        res.status(200).json(prompts);
    } catch (error) {
        next(error);
    }
}

export async function getPrompt(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } = req.params;
        const promptService = new PromptService();
        const prompt = await promptService.getPromptByIdEndpoint(
            id as unknown as number
        );
        res.status(200).json(prompt);
    } catch (error) {
        next(error);
    }
}

export async function updatePrompt(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const promptService = new PromptService();
        const prompt = await promptService.updatePrompt(
            parseInt(req.params.id),
            req.body
        );
        res.status(200).json(prompt);
    } catch (error) {
        next(error);
    }
}
