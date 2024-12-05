export interface IOpenAILangChain {
    generate(prompt: string[]): Promise<{ generations: { text: string }[][] }>;
}
