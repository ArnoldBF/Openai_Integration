import fs from "fs/promises";
import path from "path";
import { AudioProcessor } from "./audioProcessor";

export class FileManager {
    private rutaCarpeta: string;
    private audioProcessor: AudioProcessor;

    constructor(rutaCarpeta: string, audioProcessor: AudioProcessor) {
        this.rutaCarpeta = rutaCarpeta;
        this.audioProcessor = audioProcessor;
    }

    public async procesarArchivos(batchSize: number): Promise<void> {
        try {
            const extensionesAudio = [".mp3", ".wav", ".flac"];
            const archivosEnCarpeta = await fs.readdir(this.rutaCarpeta);
            const archivosTexto = archivosEnCarpeta.filter((archivo) =>
                archivo.endsWith(".txt")
            );
            const archivosAudio = archivosEnCarpeta.filter((archivo) =>
                extensionesAudio.some((ext) => archivo.endsWith(ext))
            );

            const archivosPares = this.obtenerArchivosPares(
                archivosTexto,
                archivosAudio
            );
            const archivosSinPareja = this.obtenerArchivosSinPareja(
                archivosAudio,
                archivosPares
            );

            console.log(
                `Archivos de audio sin pareja encontrados: ${archivosSinPareja.length}`
            );

            for (let i = 0; i < archivosPares.length; i += batchSize) {
                const lote = archivosPares.slice(i, i + batchSize);
                await this.procesarArchivosLoteConPareja(lote);
            }

            for (let i = 0; i < archivosSinPareja.length; i += batchSize) {
                const lote = archivosSinPareja.slice(i, i + batchSize);
                await this.procesarArchivosSinParejaLote(lote);
            }
        } catch (error: any) {
            console.error(`Error al procesar la carpeta: ${error.message}`);
        }
    }

    private obtenerArchivosPares(
        archivoTexto: string[],
        archivoAudio: string[]
    ): { texto: string; audio: string | undefined }[] {
        return archivoTexto
            .map((texto) => {
                const baseName = path.basename(texto, path.extname(texto));
                const audio = archivoAudio.find(
                    (audio) =>
                        path.basename(audio, path.extname(audio)) === baseName
                );
                return { texto, audio };
            })
            .filter((par) => par.audio);
    }

    private obtenerArchivosSinPareja(
        archivosAudio: string[],
        archivosPares: { texto: string; audio: string | undefined }[]
    ): string[] {
        const archivosEmparejados = archivosPares.map((par) => par.audio);
        return archivosAudio.filter(
            (audio) => !archivosEmparejados.includes(audio)
        );
    }

    private async procesarArchivosLoteConPareja(
        lote: { texto: string; audio: string | undefined }[]
    ) {
        await Promise.all(
            lote.map(({ texto, audio }) => {
                if (audio) {
                    return this.audioProcessor.procesarArchivo(
                        path.join(this.rutaCarpeta, audio),
                        texto ? path.join(this.rutaCarpeta, texto) : undefined
                    );
                }
            })
        );
    }

    private async procesarArchivosSinParejaLote(lote: string[]) {
        await Promise.all(
            lote.map((audio) =>
                this.audioProcessor.procesarArchivo(
                    path.join(this.rutaCarpeta, audio)
                )
            )
        );
    }
}
