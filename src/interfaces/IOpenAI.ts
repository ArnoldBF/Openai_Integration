export interface IOpenAITranscribir {
    transcribe(filePath: string): Promise<string>;
}
