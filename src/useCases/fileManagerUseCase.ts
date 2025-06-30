import fs from "fs/promises";

import { FileMatcher } from "../helpers/fileMatcher";
import { FileBatchProcessor } from "./fileBatchUseCase";
import { Parametro } from "../entities";
import { tryCatch } from "bullmq";

export class FileManager {
    private rutaCarpeta: string;
    private batchProcessor: FileBatchProcessor;

    constructor(rutaCarpeta: string, batchProcessor: FileBatchProcessor) {
        this.rutaCarpeta = rutaCarpeta;

        this.batchProcessor = batchProcessor;
    }

    public async procesarArchivos(
        batchSize: number,
        servicioSeleccionado: number,
        arregloParametros: (string | undefined)[],
        parametroAnalisis: Parametro | null,
        filtro: string[]
    ): Promise<{
        totalArchivos: number;
        procesados: number;
        errores: string[];
        archivosExistentes: string[];
    }> {
        const errores: string[] = [];
        const archivosExistentes: string[] = [];
        let procesados = 0;
        try {
            const extensionesAudio = [".mp3", ".wav", ".flac"];
            const archivosEnCarpeta = await fs.readdir(this.rutaCarpeta);

            // const archivosTexto = archivosEnCarpeta.filter((archivo) =>
            //     archivo.endsWith(".txt")
            // );
            // const archivosAudio = archivosEnCarpeta.filter((archivo) =>
            //     extensionesAudio.some((ext) => archivo.endsWith(ext))
            // );

            const archivosTexto = archivosEnCarpeta.filter(
                (archivo) =>
                    archivo.endsWith(".txt") &&
                    filtro.some((id) => archivo.includes(id))
            );

            const archivosAudio = archivosEnCarpeta.filter(
                (archivo) =>
                    extensionesAudio.some((ext) => archivo.endsWith(ext)) &&
                    filtro.some((id) => archivo.includes(id))
            );

            const archivosPares = FileMatcher.obtenerArchivosPares(
                archivosTexto,
                archivosAudio
            );
            const archivosSinPareja = FileMatcher.obtenerArchivosSinPareja(
                archivosAudio,
                archivosPares
            );

            console.log(
                `Archivos de audio sin pareja encontrados: ${archivosSinPareja.length}`
            );

            for (let i = 0; i < archivosPares.length; i += batchSize) {
                const lote = archivosPares.slice(i, i + batchSize);

                try {
                    const resultadoLote =
                        await this.batchProcessor.procesarArchivosLoteConPareja(
                            lote,
                            servicioSeleccionado,

                            arregloParametros,
                            parametroAnalisis
                        );

                    procesados += resultadoLote.procesados;
                    archivosExistentes.push(...resultadoLote.existentes);
                } catch (error: any) {
                    errores.push(
                        `Error en lote con pareja [${lote
                            .map((x) => x.audio)
                            .join(", ")}]: ${error.message}`
                    );
                }
            }

            for (let i = 0; i < archivosSinPareja.length; i += batchSize) {
                const lote = archivosSinPareja.slice(i, i + batchSize);

                try {
                    const resultadoLote =
                        await this.batchProcessor.procesarArchivosSinParejaLote(
                            lote,
                            servicioSeleccionado,

                            arregloParametros,
                            parametroAnalisis
                        );

                    procesados += resultadoLote.procesados;
                    archivosExistentes.push(...resultadoLote.existentes);
                } catch (error: any) {
                    errores.push(
                        `Error en lote sin pareja [${lote.join(", ")}]: ${
                            error.message
                        }`
                    );
                }
            }
            return {
                totalArchivos: archivosPares.length + archivosSinPareja.length,
                procesados,
                errores,
                archivosExistentes,
            };
        } catch (error: any) {
            console.error(`Error al procesar la carpeta: ${error.message}`);
            errores.push(`Error general: ${error.message}`);

            return {
                totalArchivos: 0,
                procesados: 0,
                errores,
                archivosExistentes: [],
            };
        }
    }
}
