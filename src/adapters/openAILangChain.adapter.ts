import { OpenAI, ChatOpenAI } from "@langchain/openai";
import { IOpenAILangChain } from "../interfaces/IOpenAILangChain";
import { BaseMessageLike } from "@langchain/core/dist/messages/base";

export class OpenAIAdapter implements IOpenAILangChain {
    // private openAI: OpenAI;
    private chatOpenAI: ChatOpenAI;

    constructor(apiKey: string) {
        this.chatOpenAI = new ChatOpenAI({
            apiKey: apiKey,
            model: "gpt-4o-mini",
            temperature: 0.7,
            maxTokens: 15000,
            topP: 1.0,
            frequencyPenalty: 0.0,
            presencePenalty: 0.0,
            n: 1,
            streaming: false,
        });
    }

    // constructor(apiKey: string) {
    //     this.openAI = new OpenAI({
    //         apiKey: apiKey,
    //         model: "gpt-4o",
    //     });
    // }

    public async generate(
        prompt: string[]
    ): Promise<{ generations: { text: string }[][] }> {
        const messages: BaseMessageLike[][] = prompt.map((p) => [p]);
        return this.chatOpenAI.generate(messages);
        // Uncomment the following line if you want to use the OpenAI class instead
        // return this.openAI.generate(prompt);
    }
}
