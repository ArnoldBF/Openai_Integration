import { IOpenAITranscribir } from "../../interfaces/IOpenAI";
import { OpenAIAdapterWhisper } from "../../adapters/openAIWhisper.apadapter";
import config from "../../config/config";

export class TranscripcionProcesoService {
    private openAI: IOpenAITranscribir;

    constructor(openAI: IOpenAITranscribir) {
        this.openAI = openAI;
    }

    public async transcribir(filePath: string): Promise<string> {
        return this.openAI.transcribe(filePath);
    }
}

export const openAI = new OpenAIAdapterWhisper(config.apiKeyOpenAi);

// const transcripcionService = new TranscripcionProcesoService(openAI);

// const transcripctionResultado = transcripcionService.transcribir(
//     "20241119000044_316068954006093982_2_501.wav"
// );

// transcripctionResultado.then((res) => console.log(res));
