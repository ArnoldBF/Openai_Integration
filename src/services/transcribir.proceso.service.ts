import { IOpenAITranscribir } from "../interfaces/IOpenAI";
import { OpenAIAdapterWhisper } from "../adapters/openAIWhisper.apadapter";

export class TranscripcionProcesoService {
    private openAI: IOpenAITranscribir;

    constructor(openAI: IOpenAITranscribir) {
        this.openAI = openAI;
    }

    public async transcribir(filePath: string): Promise<string> {
        return this.openAI.transcribe(filePath);
    }
}

const openAI = new OpenAIAdapterWhisper(
    "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"
);

const transcripcionService = new TranscripcionProcesoService(openAI);

const transcripctionResultado = transcripcionService.transcribir(
    "20241119000044_316068954006093982_2_501.wav"
);

transcripctionResultado.then((res) => console.log(res));
