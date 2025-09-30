import path from "path";
import { AudioProcessor } from "./audioProcessorUseCaseAtomicidad";

export class FileBatchProcessor {
    private rutaCarpeta: string;
    private audioProcessor: AudioProcessor;

    constructor(rutaCarpeta: string, audioProcessor: AudioProcessor) {
        this.rutaCarpeta = rutaCarpeta;
        this.audioProcessor = audioProcessor;
    }
    // VERSION 2
    async procesarArchivosLoteConPareja(
        lote: { texto: string; audio: string }[],
        servicioSeleccionado: number,
        arregloParametros: (string | undefined)[],
        parametroAnalisis: any,
        concurrency = 20 // Número de archivos a procesar en paralelo
    ): Promise<{ procesados: number; existentes: string[] }> {
        let procesados = 0;
        const existentes: string[] = [];
        let index = 0;

        while (index < lote.length) {
            const chunk = lote.slice(index, index + concurrency);
            const resultados = await Promise.all(
                chunk.map(async ({ texto, audio }) => {
                    try {
                        const mensajes =
                            await this.audioProcessor.procesarArchivo(
                                servicioSeleccionado,
                                arregloParametros,
                                parametroAnalisis,
                                path.join(this.rutaCarpeta, audio),
                                path.join(this.rutaCarpeta, texto)
                            );
                        if (mensajes && mensajes.length) {
                            return { existentes: mensajes, ok: false };
                        } else {
                            return { existentes: [], ok: true };
                        }
                    } catch (error: any) {
                        return {
                            existentes: [
                                `Error procesando archivo ${audio}: ${error.message}`,
                            ],
                            ok: false,
                        };
                    }
                })
            );
            for (const r of resultados) {
                if (r.ok) procesados++;
                existentes.push(...r.existentes);
            }
            index += concurrency;
        }

        return { procesados, existentes };
    }

    async procesarArchivosSinParejaLote(
        lote: string[],
        servicioSeleccionado: number,
        arregloParametros: (string | undefined)[],
        parametroAnalisis: any,
        concurrency = 20
    ): Promise<{ procesados: number; existentes: string[] }> {
        let procesados = 0;
        const existentes: string[] = [];
        let index = 0;

        while (index < lote.length) {
            const chunk = lote.slice(index, index + concurrency);
            const resultados = await Promise.all(
                chunk.map(async (audio) => {
                    try {
                        const mensajes =
                            await this.audioProcessor.procesarArchivo(
                                servicioSeleccionado,
                                arregloParametros,
                                parametroAnalisis,
                                path.join(this.rutaCarpeta, audio)
                            );
                        if (mensajes && mensajes.length) {
                            return { existentes: mensajes, ok: false };
                        } else {
                            return { existentes: [], ok: true };
                        }
                    } catch (error: any) {
                        return {
                            existentes: [
                                `Error procesando archivo ${audio}: ${error.message}`,
                            ],
                            ok: false,
                        };
                    }
                })
            );
            for (const r of resultados) {
                if (r.ok) procesados++;
                existentes.push(...r.existentes);
            }
            index += concurrency;
        }

        return { procesados, existentes };
    }

    // VERSION 1
    // async procesarArchivosLoteConPareja(
    //     lote: { texto: string; audio: string }[],
    //     servicioSeleccionado: number,

    //     arregloParametros: (string | undefined)[],
    //     parametroAnalisis: any
    // ): Promise<{ procesados: number; existentes: string[] }> {
    //     let procesados = 0;
    //     const existentes: string[] = [];
    //     for (const { texto, audio } of lote) {
    //         try {
    //             const mensajes = await this.audioProcessor.procesarArchivo(
    //                 servicioSeleccionado,
    //                 arregloParametros,
    //                 parametroAnalisis,
    //                 path.join(this.rutaCarpeta, audio),
    //                 path.join(this.rutaCarpeta, texto)
    //             );
    //             if (mensajes && mensajes.length) {
    //                 existentes.push(...mensajes);
    //             } else {
    //                 procesados++;
    //             }
    //         } catch (error: any) {
    //             existentes.push(
    //                 `Error procesando archivo ${audio}: ${error.message}`
    //             );
    //         }
    //     }

    //     return { procesados, existentes };
    // }

    // async procesarArchivosSinParejaLote(
    //     lote: string[],
    //     servicioSeleccionado: number,

    //     arregloParametros: (string | undefined)[],
    //     parametroAnalisis: any
    // ): Promise<{ procesados: number; existentes: string[] }> {
    //     let procesados = 0;
    //     const existentes: string[] = [];
    //     for (const audio of lote) {
    //         try {
    //             const mensajes = await this.audioProcessor.procesarArchivo(
    //                 servicioSeleccionado,
    //                 arregloParametros,
    //                 parametroAnalisis,
    //                 path.join(this.rutaCarpeta, audio)
    //             );
    //             if (mensajes && mensajes.length) {
    //                 existentes.push(...mensajes);
    //             } else {
    //                 procesados++;
    //             }
    //         } catch (error: any) {
    //             existentes.push(
    //                 `Error procesando archivo ${audio}: ${error.message}`
    //             );
    //         }
    //     }

    //     return { procesados, existentes };
    // }
}
