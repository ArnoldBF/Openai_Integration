import { IOpenAILangChain } from "../interfaces/IOpenAILangChain";
import { IPromptTemplate } from "../interfaces/IPromptTemplate";

export class AnalisisUseCase {
    private openAILangChain: IOpenAILangChain;
    private promptTemplate: IPromptTemplate;

    constructor(
        openAILangChain: IOpenAILangChain,
        promptTemplate: IPromptTemplate
    ) {
        this.openAILangChain = openAILangChain;
        this.promptTemplate = promptTemplate;
    }

    public async analizarText(variables: Record<string, any>): Promise<string> {
        const prompt = await this.promptTemplate.format(variables);
        const response = await this.openAILangChain.generate([prompt]);
        return response.generations[0][0].text;
    }
}
