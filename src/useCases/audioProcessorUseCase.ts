import { AppDataSource } from "../config/typeOrm";
import fs from "fs/promises";
import {
    AudioService,
    DataAudioInterface,
    DataAudioService,
    TranscripcionService,
    ClaveAudioService,
    ServicioService,
    TipoAnalisisService,
    AnalisisService,
    ClaveAnalisisService,
    DataAnalisisService,
} from "../services";
import { DataExtractorTxt } from "../helpers/dataExtractorTxt";

import { TranscripcionUseCase } from "./transcripcionUseCase";
import { AnalisisUseCase } from "../useCases/analisisUseCase";
import { IAudioCreate } from "../interfaces/IAudioCreate";
import { IAnalisisCreate } from "../interfaces/IAnalisisCreate";

import { Parametro } from "../entities/parametros.entity";

export class AudioProcessor {
    private audioService: AudioService;
    private dataAudioService: DataAudioService;
    private transcripcionUsecase: TranscripcionUseCase;
    private dataExtractor: DataExtractorTxt;
    private transcripcionService: TranscripcionService;
    private claveAudioService: ClaveAudioService;
    private servicioService: ServicioService;
    private analisisUseCase: AnalisisUseCase;
    private tipoAnalisisService: TipoAnalisisService;
    private analisisService: AnalisisService;
    private claveAnalisisService: ClaveAnalisisService;
    private dataAnalisisService: DataAnalisisService;

    constructor(
        audioService: AudioService,
        dataAudioService: DataAudioService,
        transcripcionUsecase: TranscripcionUseCase,
        dataExtractor: DataExtractorTxt,
        transcripcionService: TranscripcionService,
        claveAudioService: ClaveAudioService,
        servicioService: ServicioService,
        analisisUseCase: AnalisisUseCase,
        tipoAnalisisService: TipoAnalisisService,
        analisisService: AnalisisService,
        claveAnalisisService: ClaveAnalisisService,
        dataAnalisisService: DataAnalisisService
    ) {
        this.audioService = audioService;
        this.dataAudioService = dataAudioService;
        this.transcripcionUsecase = transcripcionUsecase;
        this.dataExtractor = dataExtractor;
        this.transcripcionService = transcripcionService;
        this.claveAudioService = claveAudioService;
        this.servicioService = servicioService;
        this.analisisUseCase = analisisUseCase;
        this.tipoAnalisisService = tipoAnalisisService;
        this.analisisService = analisisService;
        this.claveAnalisisService = claveAnalisisService;
        this.dataAnalisisService = dataAnalisisService;
    }

    public async procesarArchivo(
        servicioSeleccionado: number,
        arregloParametros: (string | undefined)[],
        parametroAnalisis: Parametro,
        archivoAudio: string,
        archivoTexto?: string
    ): Promise<void> {
        await this.validarExistenciaArchivos(archivoAudio, archivoTexto);

        const datos = archivoTexto
            ? await this.dataExtractor.extraerDatos(archivoTexto)
            : {};

        const servicio = await this.servicioService.getServicioById(
            servicioSeleccionado
        );

        const audioData = {
            servicio: servicio,
            fileName: archivoAudio,
            // cliente: datos.cliente,
            transcrito: 0,
        };
        try {
            let mensajes: string[] = [];
            const [audioExiste, transcripcionExiste] = await Promise.all([
                this.audioService.getAudioProcessor(archivoAudio),
                this.transcripcionService.getTranscripcionProcessor(
                    archivoAudio
                ),
            ]);

            if (audioExiste) {
                mensajes.push(
                    `Audio ya existe en la base de datos: ${archivoAudio}`
                );
            }
            if (transcripcionExiste) {
                mensajes.push(`Transcripcion ya existe para ${archivoAudio}`);
            }
            if (mensajes.length) {
                console.log(mensajes.join("\n"));
                return;
            }

            const audio = await this.procesarAudios(
                audioData,
                datos,
                archivoTexto
            );
            const transcripcion = await this.reintentarTranscripcion(
                archivoAudio
            );
            const transcripcionData =
                await this.transcripcionService.createTranscripcion({
                    audio,
                    transcripcion,
                    fileName: archivoAudio,
                });

            await this.audioService.updateAudio(audio.id, { transcrito: 1 });
            // const tipoAnalisis =
            //     await this.tipoAnalisisService.getTipoAnalisisById(
            //         tipoAnalisisSeleccionado
            //     );

            const variables = {
                contexto: parametroAnalisis.tipo.name, // consulta para traer el tipo de analisis
                transcripcion: transcripcionData.transcripcion, // consulta para traer la transcirpcion
                parametrosAnalisis: arregloParametros,
                formatoRespuesta: "JSON",
            };

            const analisis = await this.reintentarAnalisis(variables);

            let analisisPorCrear: IAnalisisCreate = {
                transcripcion: transcripcionData,
                parametro: parametroAnalisis,
            };

            const analisiCreado = await this.analisisService.createAnalisis(
                analisisPorCrear
            );

            const analisisObj =
                typeof analisis === "string" ? JSON.parse(analisis) : analisis;

            const clavesAnalisis =
                await this.claveAnalisisService.getAllClavesAnalisis();

            for (const param of arregloParametros) {
                if (!param) continue;
                const clave = clavesAnalisis.find((c) => c.clave === param);
                if (
                    clave &&
                    Object.prototype.hasOwnProperty.call(analisisObj, param)
                ) {
                    const valor = analisisObj[param];
                    await this.dataAnalisisService.createDataAnalisis({
                        analisis: analisiCreado,
                        clave: clave,
                        valor: valor?.toString() || null,
                    });
                }
            }

            console.log(
                `Registro de audio creado para el archivo ${archivoAudio}`
            );
            console.log(
                `Transcripcion del audio ${archivoAudio}: ${transcripcion}`
            );
        } catch (error: any) {
            console.error(`Error procesando ${archivoAudio}: ${error.message}`);
            console.error(error.stack);
        }
    }
    private async reintentarTranscripcion(
        archivoAudio: string,
        reintentos = 3
    ): Promise<string> {
        for (let intento = 1; intento <= reintentos; intento++) {
            try {
                return await this.transcripcionUsecase.transcribir(
                    archivoAudio
                );
            } catch (error: any) {
                if (intento === reintentos) {
                    throw error;
                }
                console.warn(
                    `Reintento ${intento} fallido para ${archivoAudio}: ${error.message}`
                );

                await new Promise((res) => setTimeout(res, 3000));
            }
        }
        throw new Error(
            `No se pudo transcribir el archivo ${archivoAudio} despues de ${reintentos} intentos`
        );
    }

    private async reintentarAnalisis(
        variables: Record<string, any>,
        reintentos = 3
    ): Promise<string> {
        for (let intento = 1; intento <= reintentos; intento++) {
            try {
                return await this.analisisUseCase.analizarText(variables);
            } catch (error: any) {
                if (intento === reintentos) {
                    throw error;
                }
                console.warn(
                    `Reintento ${intento} fallido para ${variables.transcripcion}: ${error.message}`
                );

                await new Promise((res) => setTimeout(res, 3000));
            }
        }
        throw new Error(
            `No se pudo transcribir el archivo ${variables.transcripcion} despues de ${reintentos} intentos`
        );
    }

    private async validarExistenciaArchivos(
        archivoAudio: string,
        archivoTexto?: string
    ): Promise<void> {
        try {
            await fs.access(archivoAudio);
            if (archivoTexto) {
                await fs.access(archivoTexto);
            }
        } catch (err) {
            console.error(
                `Archivo no encontrado: ${archivoAudio} o ${archivoTexto}`
            );
            throw new Error(`Archivo no encontrado: ${archivoAudio}`);
        }
    }

    private async procesarAudios(
        audioData: IAudioCreate,
        datos: any,
        archivoTexto?: string
    ) {
        const audio = await this.audioService.createAudio(audioData);
        if (archivoTexto) {
            const registroData = Object.entries(datos).map(
                ([clave, valor]) => ({
                    audio: audio,
                    clave,
                    valor: valor?.toString() || "", // Aseguramos que el valor sea un string
                })
            );

            for (const data of registroData) {
                const claveAudio = await this.claveAudioService.getClaveById(
                    data.clave
                );
                console.log(data.valor);
                if (claveAudio?.clave === data.clave) {
                    const dataAudio: DataAudioInterface = {
                        audio: data.audio,
                        clave: claveAudio,
                        valor: String(data.valor),
                    };
                    await this.dataAudioService.createDataAudio(dataAudio);
                }
            }
        }

        return audio;
    }
}
