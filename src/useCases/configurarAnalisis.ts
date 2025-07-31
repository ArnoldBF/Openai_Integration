import boom from "@hapi/boom";

import { FileBatchProcessor } from "../useCases/fileBatchUseCase";
import { FileManager } from "../useCases/fileManagerUseCase";
import { AudioProcessor } from "../useCases/audioProcessorUseCase";
import { TranscripcionUseCase } from "../useCases/transcripcionUseCase";
import { OpenAIAdapterWhisper } from "../adapters/openAIWhisper.apadapter";
import { AnalisisUseCase } from "../useCases/analisisUseCase";
import { OpenAIAdapter } from "../adapters/openAILangChain.adapter";
import { PromptTemplateAdapter } from "../adapters/promptTemplate.adapter";

import { moverArchivos } from "../helpers/buscarArchivos";

import {
    AudioService,
    DataAudioService,
    TranscripcionService,
    ClaveAudioService,
    ServicioService,
    TipoAnalisisService,
    ParametroAnalisisService,
    AnalisisService,
    ClaveAnalisisService,
    DataAnalisisService,
} from "../services/index";
import { DataExtractorTxt } from "../helpers/dataExtractorTxt";
import { config } from "../config";

const openAIWhisper = new OpenAIAdapterWhisper(config.apiKeyOpenAi);
const openAI = new OpenAIAdapter(config.apiKeyOpenAi);
const audioService = new AudioService();
const dataAudioService = new DataAudioService();
const dataExtractor = new DataExtractorTxt();
const transcripcionService = new TranscripcionService();
const claveAudioService = new ClaveAudioService();
const servicioService = new ServicioService();
const tipoAnalisisService = new TipoAnalisisService();
const analisisService = new AnalisisService();
const claveAnalisisService = new ClaveAnalisisService();
const dataAnalisisService = new DataAnalisisService();

export async function configurarAnalisis(
    parametrosAnalisis: number,
    servicio: number,
    filtroArchivos: string[]
): Promise<{}> {
    console.log(
        "[DEBUG] ID de parametroAnalisis recibdo en parametro configurarAnalisis:",
        parametrosAnalisis
    );
    const parametroAnalisisService = new ParametroAnalisisService();
    const parametrosAnalisisObjeto =
        await parametroAnalisisService.getParametroById(parametrosAnalisis);
    console.log(
        "[DEBUG] ID de parametroAnalisis usado en configurarAnalisis:",
        parametrosAnalisisObjeto?.id
    );

    if (parametrosAnalisisObjeto === null) {
        throw boom.badRequest(
            "No se encontró el parámetro de análisis con el ID proporcionado"
        );
    }

    const template = parametrosAnalisisObjeto?.prompt.template;
    const arregloParametros = [
        parametrosAnalisisObjeto?.campo_1,
        parametrosAnalisisObjeto?.campo_2,
        parametrosAnalisisObjeto?.campo_3,
    ];

    if (
        parametrosAnalisisObjeto?.campo_4 !== null ||
        parametrosAnalisisObjeto?.campo_5 !== null ||
        parametrosAnalisisObjeto?.campo_6 !== null ||
        parametrosAnalisisObjeto?.campo_7 !== null ||
        parametrosAnalisisObjeto?.campo_8 !== null ||
        parametrosAnalisisObjeto?.campo_9 !== null ||
        parametrosAnalisisObjeto?.campo_10 !== null
    ) {
        arregloParametros.push(
            parametrosAnalisisObjeto?.campo_4,
            parametrosAnalisisObjeto?.campo_5,
            parametrosAnalisisObjeto?.campo_6,
            parametrosAnalisisObjeto?.campo_7,
            parametrosAnalisisObjeto?.campo_8,
            parametrosAnalisisObjeto?.campo_9,
            parametrosAnalisisObjeto?.campo_10
        );
    }
    const promptTemplate = new PromptTemplateAdapter(template, [
        "contexto",
        "transcripcion",
        "parametrosAnalisis",
        "formatoRespuesta",
        "fechaActual",
        "fechaLlamada",
    ]);

    const resultadoMover = await moverArchivos(
        config.rutaOrigen,
        config.rutaDestino,
        filtroArchivos
    );

    if (resultadoMover.errores.length > 0) {
        console.warn(
            "Algunos archivos no se movieron correctamente:",
            resultadoMover.errores
        );

        if (resultadoMover.errores.length === 0) {
            throw boom.badRequest(
                "No se puedo mover ningun archivo. Proceso abortado."
            );
        }
    }

    const transcripcionUseCase = new TranscripcionUseCase(openAIWhisper);
    const analisisUseCase = new AnalisisUseCase(openAI, promptTemplate);

    const audioProcessor = new AudioProcessor(
        audioService,
        dataAudioService,
        transcripcionUseCase,
        dataExtractor,
        transcripcionService,
        claveAudioService,
        servicioService,
        analisisUseCase,
        tipoAnalisisService,
        analisisService,
        claveAnalisisService,
        dataAnalisisService
    );

    const fileBatchProcessor = new FileBatchProcessor(
        config.rutaDestino,
        audioProcessor
    );

    const fileManeger = new FileManager(config.rutaDestino, fileBatchProcessor);

    const resultado = await fileManeger.procesarArchivos(
        500,
        servicio,
        arregloParametros,
        parametrosAnalisisObjeto,
        filtroArchivos
    );

    return {
        archivosMovidos: resultadoMover.movidos,
        erroresMovimiento: resultadoMover.errores,
        resultadoProcesamiento: resultado,
    };
}
