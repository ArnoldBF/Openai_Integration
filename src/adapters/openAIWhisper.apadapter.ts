import fs from "fs";
import { IOpenAITranscribir } from "../interfaces/IOpenAI";
import { OpenAI } from "openai";

export class OpenAIAdapterWhisper implements IOpenAITranscribir {
    private openAI: OpenAI;

    constructor(apiKey: string | undefined) {
        this.openAI = new OpenAI({ apiKey });
    }

    public async transcribe(filePath: string): Promise<string> {
        const file = fs.createReadStream(filePath);
        const response = await this.openAI.audio.transcriptions.create({
            file: file,
            model: "whisper-1",
        });
        // console.log(file);
        return response.text;
    }

    public async transcribeModeloGpt(filePath: string): Promise<string> {
        const file = fs.createReadStream(filePath);

        const response = await this.openAI.audio.transcriptions.create({
            file: file,
            model: "gpt-4o-transcribe",
        });

        return response.text;
    }
}
