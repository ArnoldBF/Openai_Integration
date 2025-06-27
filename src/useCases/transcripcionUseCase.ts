import { IOpenAITranscribir } from "../interfaces/IOpenAI";

export class TranscripcionUseCase {
    private openAI: IOpenAITranscribir;

    constructor(openAI: IOpenAITranscribir) {
        this.openAI = openAI;
    }

    public async transcribir(filePath: string): Promise<string> {
        return this.openAI.transcribe(filePath);
    }
}

// const transcripcionService = new TranscripcionProcesoService(openAI);

// const transcripctionResultado = transcripcionService.transcribir(
//     "20241119000044_316068954006093982_2_501.wav"
// );

// transcripctionResultado.then((res) => console.log(res));
