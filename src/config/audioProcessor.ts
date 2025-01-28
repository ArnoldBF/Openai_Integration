import {
    AudioInterface,
    AudioService,
    DataAudioInterface,
    DataAudioService,
    TranscripcionProcesoService,
    TranscripcionService,
} from "../services/index";
import { DataExtractorTxt } from "../helpers/dataExtractorTxt";
import { string } from "joi";

export class AudioProcessor {
    private audioService: AudioService;
    private dataAudioService: DataAudioService;
    private transcripcionProcesoService: TranscripcionProcesoService;
    private dataExtractor: DataExtractorTxt;
    private transcripcionService: TranscripcionService;

    constructor(
        audioService: AudioService,
        dataAudioService: DataAudioService,
        transcripcionProcesoService: TranscripcionProcesoService,
        dataExtractor: DataExtractorTxt,
        transcripcionService: TranscripcionService
    ) {
        this.audioService = audioService;
        this.dataAudioService = dataAudioService;
        this.transcripcionProcesoService = transcripcionProcesoService;
        this.dataExtractor = dataExtractor;
        this.transcripcionService = transcripcionService;
    }

    public async procesarArchivo(
        archivoAudio: string,
        archivoTexto?: string
    ): Promise<void> {
        const datos = archivoTexto
            ? await this.dataExtractor.extraerDatos(archivoTexto)
            : {};
        // console.log("Datos extraídos:", datos);

        const audioData: AudioInterface = {
            fileName: archivoAudio,
            cliente: datos.cliente,
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

            const audio = await this.audioService.createAudio(audioData);
            if (archivoTexto) {
                const registroData = Object.entries(datos).map(
                    ([clave, valor]) => ({
                        audio: audio,
                        clave,
                        valor: valor?.toString() || "",
                    })
                );

                for (const data of registroData) {
                    const dataAudio: DataAudioInterface = {
                        audio: data.audio,
                        // clave: data.clave,
                        valor: data.valor,
                    };
                    await this.dataAudioService.createDataAudio(dataAudio);
                }
            }
            const transcripcion = await this.reintentarTranscripcion(
                archivoAudio
            );
            await this.transcripcionService.createTranscripcion({
                audio,
                transcripcion,
                fileName: archivoAudio,
            });

            await this.audioService.updateAudio(audio.id, { transcrito: 1 });
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
                return await this.transcripcionProcesoService.transcribir(
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
}
