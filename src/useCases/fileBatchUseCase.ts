import path from "path";
import { AudioProcessor } from "./audioProcessorUseCase";

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
    ) {
        await Promise.all(
            lote.map(({ texto, audio }) =>
                this.audioProcessor.procesarArchivo(
                    servicioSeleccionado,

                    arregloParametros,
                    parametroAnalisis,
                    path.join(this.rutaCarpeta, audio),
                    path.join(this.rutaCarpeta, texto)
                )
            )
        );
    }

    async procesarArchivosSinParejaLote(
        lote: string[],
        servicioSeleccionado: number,

        arregloParametros: (string | undefined)[],
        parametroAnalisis: any
    ) {
        await Promise.all(
            lote.map((audio) =>
                this.audioProcessor.procesarArchivo(
                    servicioSeleccionado,
                    arregloParametros,
                    parametroAnalisis,
                    path.join(this.rutaCarpeta, audio)
                )
            )
        );
    }
}
