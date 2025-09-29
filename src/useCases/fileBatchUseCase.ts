import path from "path";
import { AudioProcessor } from "./audioProcessorUseCaseAtomicidad";

export class FileBatchProcessor {
    private rutaCarpeta: string;
    private audioProcessor: AudioProcessor;

    constructor(rutaCarpeta: string, audioProcessor: AudioProcessor) {
        this.rutaCarpeta = rutaCarpeta;
        this.audioProcessor = audioProcessor;
    }

    async procesarArchivosLoteConPareja(
        lote: { texto: string; audio: string }[],
        servicioSeleccionado: number,

        arregloParametros: (string | undefined)[],
        parametroAnalisis: any
    ): Promise<{ procesados: number; existentes: string[] }> {
        let procesados = 0;
        const existentes: string[] = [];
        for (const { texto, audio } of lote) {
            try {
                const mensajes = await this.audioProcessor.procesarArchivo(
                    servicioSeleccionado,
                    arregloParametros,
                    parametroAnalisis,
                    path.join(this.rutaCarpeta, audio),
                    path.join(this.rutaCarpeta, texto)
                );
                if (mensajes && mensajes.length) {
                    existentes.push(...mensajes);
                } else {
                    procesados++;
                }
            } catch (error: any) {
                existentes.push(
                    `Error procesando archivo ${audio}: ${error.message}`
                );
            }
        }

        return { procesados, existentes };
    }

    async procesarArchivosSinParejaLote(
        lote: string[],
        servicioSeleccionado: number,

        arregloParametros: (string | undefined)[],
        parametroAnalisis: any
    ): Promise<{ procesados: number; existentes: string[] }> {
        let procesados = 0;
        const existentes: string[] = [];
        for (const audio of lote) {
            try {
                const mensajes = await this.audioProcessor.procesarArchivo(
                    servicioSeleccionado,
                    arregloParametros,
                    parametroAnalisis,
                    path.join(this.rutaCarpeta, audio)
                );
                if (mensajes && mensajes.length) {
                    existentes.push(...mensajes);
                } else {
                    procesados++;
                }
            } catch (error: any) {
                existentes.push(
                    `Error procesando archivo ${audio}: ${error.message}`
                );
            }
        }

        return { procesados, existentes };
    }
}
