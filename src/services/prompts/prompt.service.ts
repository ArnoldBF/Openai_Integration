import { AppDataSource } from "../../config/typeOrm";
import { Prompt } from "../../entities/index";
import { IUpdatePrompt } from "../../interfaces/IUpdatePrompt";
import { IPromptCreate } from "../../interfaces/IPromptCreate";

import boom from "@hapi/boom";

export class PromptService {
    private promptRepository = AppDataSource.getRepository(Prompt);
    constructor() {}

    public async createPrompt(data: IPromptCreate): Promise<Prompt> {
        const prompt = this.promptRepository.create(data);
        return await this.promptRepository.save(prompt);
    }

    async getPromptsAll(): Promise<Prompt[]> {
        return await this.promptRepository.find();
    }

    async getPromptsAllEndPoint(): Promise<Prompt[]> {
        return await this.promptRepository.find({
            select: ["id", "name", "template"],
            // relations: ["cliente"],
        });
    }

    async getPromptById(id: number): Promise<Partial<Prompt> | string> {
        const prompt = await this.promptRepository.findOneBy({ id });
        if (!prompt) {
            throw boom.badRequest("Prompt not found");
        }

        return prompt.template;
    }

    async getPromptByIdEndpoint(id: number): Promise<Partial<Prompt> | string> {
        const prompt = await this.promptRepository.findOneBy({ id });
        if (!prompt) {
            throw boom.badRequest("Prompt not found");
        }

        return prompt;
    }

    async updatePrompt(
        id: number,
        template: IUpdatePrompt
    ): Promise<Partial<Prompt | null>> {
        await this.promptRepository.update(id, template);
        return await this.promptRepository.findOneBy({ id });
    }

    // async deleteAudio(id: number) {
    //     await this.audioRepository.delete(id);
    //     return { id };
    // }
}
