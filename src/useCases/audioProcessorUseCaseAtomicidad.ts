import fs from "fs/promises";
import path from "path";
import { QueryRunner } from "typeorm";
import { AppDataSource } from "../config/typeOrm";
import { DataExtractorTxt } from "../helpers/dataExtractorTxt";
import { extraerMetadataAudio } from "../helpers/audioMetadataExtractor";
import { generarFormatoRespuesta } from "../helpers/generarFormatoRespuesta";
import { TranscripcionUseCase } from "./transcripcionUseCase";
import { AnalisisUseCase } from "./analisisUseCase";
import { IAnalisisCreate } from "../interfaces/IAnalisisCreate";
import { Parametro } from "../entities/parametros.entity";
import { Audio } from "../entities/audio.entity";
import { DataAudio } from "../entities/dataAudio.entity";
import { Transcripcion } from "../entities/transcripcion.entity";
import { Analisis } from "../entities/analisis.entity";
import { ClaveAnalisis } from "../entities/claveAnalisis.entity";
import { DataAnalisis } from "../entities/dataAnalisis.entity";
import { ClaveAudio } from "../entities/claveAudio.entity";
import { Servicio } from "../entities/servicio.entity";

export class AudioProcessor {
    private transcripcionUsecase: TranscripcionUseCase;
    private dataExtractor: DataExtractorTxt;
    private analisisUseCase: AnalisisUseCase;

    constructor(
        transcripcionUsecase: TranscripcionUseCase,
        dataExtractor: DataExtractorTxt,
        analisisUseCase: AnalisisUseCase
    ) {
        this.transcripcionUsecase = transcripcionUsecase;
        this.dataExtractor = dataExtractor;
        this.analisisUseCase = analisisUseCase;
    }

    public async procesarArchivo(
        servicioSeleccionado: number,
        arregloParametros: (string | undefined)[],
        parametroAnalisis: Parametro,
        archivoAudio: string,
        archivoTexto?: string
    ): Promise<string[] | void> {
        await this.validarExistenciaArchivos(archivoAudio, archivoTexto);

        const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const datos: any = archivoTexto
                ? await this.dataExtractor.extraerDatos(archivoTexto)
                : await extraerMetadataAudio(archivoAudio);

            const servicioRepo = queryRunner.manager.getRepository(Servicio);
            const audioRepo = queryRunner.manager.getRepository(Audio);
            const dataAudioRepo = queryRunner.manager.getRepository(DataAudio);
            const transcripcionRepo =
                queryRunner.manager.getRepository(Transcripcion);
            const analisisRepo = queryRunner.manager.getRepository(Analisis);
            const claveAnalisisRepo =
                queryRunner.manager.getRepository(ClaveAnalisis);
            const dataAnalisisRepo =
                queryRunner.manager.getRepository(DataAnalisis);
            const claveAudioRepo =
                queryRunner.manager.getRepository(ClaveAudio);

            const servicio = await servicioRepo.findOneBy({
                id: servicioSeleccionado,
            });

            if (!servicio) {
                throw new Error(
                    `No se encontró el servicio con id ${servicioSeleccionado}`
                );
            }

            const audioData = {
                servicio: servicio,
                fileName: path.basename(archivoAudio),
                transcrito: 0,
            };

            let mensajes: string[] = [];
            const [audioExiste, transcripcionExiste] = await Promise.all([
                audioRepo.findOneBy({ fileName: path.basename(archivoAudio) }),
                transcripcionRepo.findOneBy({
                    fileName: path.basename(archivoAudio),
                }),
            ]);

            let dataAudioExistente: any[] = [];
            if (audioExiste) {
                dataAudioExistente = await dataAudioRepo.findBy({
                    audio: { id: audioExiste.id },
                });
            }
            if (
                audioExiste &&
                audioExiste.transcrito === 1 &&
                Array.isArray(dataAudioExistente) &&
                dataAudioExistente.length > 0
            ) {
                mensajes.push(
                    `Audio ya existe, ya está transcrito y tiene data en la base de datos: ${path.basename(
                        archivoAudio
                    )}`
                );
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
                return mensajes;
            }

            let audio = audioExiste;

            if (!audio) {
                audio = audioRepo.create(audioData);
                await audioRepo.save(audio);
            }

            if (!audio) {
                throw new Error(
                    "No se encontró el audio para asociar a DataAudio"
                );
            }

            const registroData = Object.entries(datos).map(
                ([clave, valor]) => ({
                    audio,
                    clave,
                    valor: valor?.toString() || "",
                })
            );

            for (const data of registroData) {
                const claveAudio = await claveAudioRepo.findOneBy({
                    clave: data.clave,
                });
                if (claveAudio?.clave === data.clave) {
                    const dataAudio = dataAudioRepo.create({
                        audio: data.audio,
                        clave: claveAudio,
                        valor: String(data.valor),
                    });
                    await dataAudioRepo.save(dataAudio);
                }
            }

            const transcripcion = await this.reintentarTranscripcion(
                archivoAudio
            );
            const transcripcionData = transcripcionRepo.create({
                audio,
                transcripcion,
                fileName: path.basename(archivoAudio),
            });
            await transcripcionRepo.save(transcripcionData);

            await audioRepo.update(audio.id, { transcrito: 1 });

            const { FECHA, MD_FECHA_CREACION } = datos;
            const variables = {
                contexto: parametroAnalisis.tipo.description,
                transcripcion: transcripcionData.transcripcion,
                parametrosAnalisis: arregloParametros,
                formatoRespuesta: generarFormatoRespuesta(arregloParametros),
                fechaActual: new Date().toISOString().split("T")[0],
                fechaLlamada: FECHA || MD_FECHA_CREACION,
            };

            const analisis = await this.reintentarAnalisis(variables);

            let analisisPorCrear: IAnalisisCreate = {
                transcripcion: transcripcionData,
                parametro: parametroAnalisis,
            };

            const analisiCreado = analisisRepo.create(analisisPorCrear);
            await analisisRepo.save(analisiCreado);

            const analisisObj =
                typeof analisis === "string" ? JSON.parse(analisis) : analisis;

            const clavesAnalisis = await claveAnalisisRepo.find();

            for (const param of arregloParametros) {
                if (!param) continue;
                const clave = clavesAnalisis.find((c) => c.clave === param);
                if (
                    clave &&
                    Object.prototype.hasOwnProperty.call(analisisObj, param)
                ) {
                    const valor = analisisObj[param];
                    const dataAnalisis = dataAnalisisRepo.create({
                        analisis: analisiCreado,
                        clave: clave,
                        valor: valor?.toString() || null,
                    });
                    await dataAnalisisRepo.save(dataAnalisis);
                }
            }

            await queryRunner.commitTransaction();
            await queryRunner.release();

            console.log(
                `Registro de audio creado para el archivo ${archivoAudio}`
            );
            return [];
        } catch (error: any) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            if (
                error.code == "EREQUEST" &&
                error.message &&
                error.message.includes("Violation of UNIQUE KEY constraint")
            ) {
                return [
                    `Audio ya existe en la base de datos (por clave única):${path.basename(
                        archivoAudio
                    )}`,
                ];
            }
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
}
