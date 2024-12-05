import { OpenAI } from "@langchain/openai";
import { IOpenAILangChain } from "../interfaces/IOpenAILangChain";

export class OpenAIAdapter implements IOpenAILangChain {
    private openAI: OpenAI;

    constructor(apiKey: string) {
        this.openAI = new OpenAI({ apiKey });
    }

    public async generate(
        prompt: string[]
    ): Promise<{ generations: { text: string }[][] }> {
        return this.openAI.generate(prompt);
    }
}
