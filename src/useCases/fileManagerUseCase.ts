import fs from "fs/promises";

import { FileMatcher } from "../helpers/fileMatcher";
import { FileBatchProcessor } from "./fileBatchUseCase";
import { Parametro } from "../entities";

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
    ): Promise<void> {
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
                await this.batchProcessor.procesarArchivosLoteConPareja(
                    lote,
                    servicioSeleccionado,

                    arregloParametros,
                    parametroAnalisis
                );
            }

            for (let i = 0; i < archivosSinPareja.length; i += batchSize) {
                const lote = archivosSinPareja.slice(i, i + batchSize);
                await this.batchProcessor.procesarArchivosSinParejaLote(
                    lote,
                    servicioSeleccionado,

                    arregloParametros,
                    parametroAnalisis
                );
            }
        } catch (error: any) {
            console.error(`Error al procesar la carpeta: ${error.message}`);
        }
    }
}
