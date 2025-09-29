import { QueryRunner, Like } from "typeorm";
import { AppDataSource } from "../config/typeOrm";
import { generarFormatoRespuesta } from "../helpers/generarFormatoRespuesta";
import { AnalisisUseCase } from "./analisisUseCase";
import { IAnalisisCreate } from "../interfaces/IAnalisisCreate";
import { Parametro } from "../entities/parametros.entity";
import { Transcripcion } from "../entities/transcripcion.entity";
import { Analisis } from "../entities/analisis.entity";
import { ClaveAnalisis } from "../entities/claveAnalisis.entity";
import { DataAnalisis } from "../entities/dataAnalisis.entity";
import { Servicio } from "../entities/servicio.entity";

export class AudioProcessorTrans {
    private analisisUseCase: AnalisisUseCase;

    constructor(analisisUseCase: AnalisisUseCase) {
        this.analisisUseCase = analisisUseCase;
    }

    public async procesarTranscripcionesPorIds(
        servicioSeleccionado: number,
        idsLlamada: string[],
        arregloParametros: (string | undefined)[],
        parametroAnalisis: Parametro
    ): Promise<{
        transcripcionesProcesadas: string[];
        transcripcionesNoEncontradas: string[];
        errores: string[];
    }> {
        const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const transcripcionesProcesadas: string[] = [];
        const transcripcionesNoEncontradas: string[] = [];
        const errores: string[] = [];

        try {
            const servicioRepo = queryRunner.manager.getRepository(Servicio);
            const transcripcionRepo =
                queryRunner.manager.getRepository(Transcripcion);
            const analisisRepo = queryRunner.manager.getRepository(Analisis);
            const claveAnalisisRepo =
                queryRunner.manager.getRepository(ClaveAnalisis);
            const dataAnalisisRepo =
                queryRunner.manager.getRepository(DataAnalisis);

            // Validar que el servicio existe
            const servicio = await servicioRepo.findOneBy({
                id: servicioSeleccionado,
            });
            if (!servicio) {
                throw new Error(
                    `No se encontró el servicio con id ${servicioSeleccionado}`
                );
            }

            for (const id of idsLlamada) {
                try {
                    const transcripcion = await transcripcionRepo.findOne({
                        where: { fileName: Like(`%${id}%`) },
                    });

                    if (!transcripcion) {
                        transcripcionesNoEncontradas.push(id);
                        continue;
                    }

                    const variables = {
                        contexto: parametroAnalisis.tipo.description,
                        transcripcion: transcripcion.transcripcion,
                        parametrosAnalisis: arregloParametros,
                        formatoRespuesta:
                            generarFormatoRespuesta(arregloParametros),
                        fechaActual: new Date().toISOString().split("T")[0],
                    };

                    const analisis = await this.reintentarAnalisis(variables);

                    let analisisPorCrear: IAnalisisCreate = {
                        transcripcion: transcripcion,
                        parametro: parametroAnalisis,
                    };

                    const analisiCreado = analisisRepo.create(analisisPorCrear);
                    await analisisRepo.save(analisiCreado);

                    const analisisObj =
                        typeof analisis === "string"
                            ? JSON.parse(analisis)
                            : analisis;
                    const clavesAnalisis = await claveAnalisisRepo.find();

                    for (const param of arregloParametros) {
                        if (!param) continue;
                        const clave = clavesAnalisis.find(
                            (c) => c.clave === param
                        );
                        if (
                            clave &&
                            Object.prototype.hasOwnProperty.call(
                                analisisObj,
                                param
                            )
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

                    transcripcionesProcesadas.push(transcripcion.fileName);
                } catch (err: any) {
                    errores.push(`Error procesando id ${id}: ${err.message}`);
                }
            }

            await queryRunner.commitTransaction();
            await queryRunner.release();

            return {
                transcripcionesProcesadas,
                transcripcionesNoEncontradas,
                errores,
            };
        } catch (error: any) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw error;
        }
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
}
