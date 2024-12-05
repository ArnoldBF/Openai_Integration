import { IOpenAILangChain } from "../interfaces/IOpenAILangChain";
import { IPromptTemplate } from "../interfaces/IPromptTemplate";

// import { OpenAIAdapter } from "../adapters/openAILangChain.adapter";
// import { PromptTemplateAdapter } from "../adapters/promptTemplate.adapter";

export class AnalisisProcesoService {
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

// Ejemplo de uso
// const openAI = new OpenAIAdapter(
//     "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"
// );
// const promptTemplate = new PromptTemplateAdapter(
//     `
// Analiza la siguiente transcripción asociada a una interacción de tipo: {contexto}.
// Analiza la siguiente transcripción: {transcripcion}.
// La fecha de la llamada es: {fechaLlamada}.
// Analiza los siguientes aspectos: {parametrosAnalisis}.
// El formato de la respuesta es: {formatoRespuesta} y con valores como string y true/false en respuesta que solo sean de si o no.
// `,
//     [
//         "transcripcion",
//         "fechaLlamada",
//         "parametrosAnalisis",
//         "contexto",
//         "formatoRespuesta",
//     ]
// );

// const analisis = new AnalisisProcesoService(openAI, promptTemplate);

// const variables = {
//     transcripcion: "Transcripción de ejemplo...",
//     fechaLlamada: "2024-11-28",
//     parametrosAnalisis: "Aspectos a analizar...",
//     contexto: "cobranza",
//     formatoRespuesta: "JSON",
// };

// const prueba = analisis.analizarText(variables);

// prueba.then((res) => console.log(res));
