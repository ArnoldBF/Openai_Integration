import { PromptTemplate } from "@langchain/core/prompts";
import { IPromptTemplate } from "../interfaces/IPromptTemplate";

export class PromptTemplateAdapter implements IPromptTemplate {
    private promptTemplate: PromptTemplate;

    constructor(template: any, inputVariables: string[]) {
        this.promptTemplate = new PromptTemplate({ template, inputVariables });
    }

    public async format(variables: Record<string, any>): Promise<string> {
        return this.promptTemplate.format(variables);
    }
}
