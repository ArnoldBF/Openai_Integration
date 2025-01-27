import { AppDataSource } from "../../config/typeOrm";
import { Prompt } from "../../models/index";
import boom from "@hapi/boom";

export interface PromptInterface {
    name?: string;
    template?: string;
}

export interface updatePrompt {
    template?: string;
}

export class PromptService {
    private promptRepository = AppDataSource.getRepository(Prompt);
    constructor() {}

    public async createPrompt(data: PromptInterface): Promise<Prompt> {
        const prompt = this.promptRepository.create(data);
        return await this.promptRepository.save(prompt);
    }

    async getPrompts(): Promise<Prompt[]> {
        return await this.promptRepository.find();
    }

    async getPrompt(id: number): Promise<Partial<Prompt> | string> {
        const prompt = await this.promptRepository.findOneBy({ id });
        if (!prompt) {
            throw boom.badRequest("Prompt not found");
        }

        return prompt;
    }

    async updatePrompt(
        id: number,
        template: updatePrompt
    ): Promise<Partial<Prompt | null>> {
        await this.promptRepository.update(id, template);
        return await this.promptRepository.findOneBy({ id });
    }

    // async deleteAudio(id: number) {
    //     await this.audioRepository.delete(id);
    //     return { id };
    // }
}
