export interface IPromptTemplate {
    format(variables: Record<string, any>): Promise<string>;
}
