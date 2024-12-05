import fs from "fs/promises";
import path from "path";
import { AudioService, AudioInterface } from "../services/audio.service";
import { DataExtractorTxt } from "./dataExtractorTxt";

export class ProcesarArchivos {
    private rutaCarpeta: string;
    private audioService: AudioService;
    private dataExtractor: DataExtractorTxt;

    constructor(rutaCarpeta: string) {
        this.rutaCarpeta = rutaCarpeta;
        this.audioService = new AudioService();
        this.dataExtractor = new DataExtractorTxt();
    }

    private async procesarArchivo(archivo: string): Promise<void> {
        const rutaArchivo = path.join(this.rutaCarpeta, archivo);
        try {
            const datos = await this.dataExtractor.extraerDatos(rutaArchivo);
            console.log("Datos extraídos:", datos);

            // Mapeo de los datos extraídos a AudioInterface
            const audioData: AudioInterface = {
                id_llamada: datos.linkid,
                fecha: datos.fecha,
                hora: datos.hora,
                duracion: datos.segundos,
                nodo: datos.nodo,
                interno: datos.canal,
                tipo_llamada: datos.entrasale,
                agente: datos.nrolinea,
                numero_remoto: datos.nroremoto,
                campana: datos.campaña,
                cliente: datos.cliente,
                transcrito: 0,
            };

            // Llamar al servicio para crear el audio
            await this.audioService.createAudio(audioData);
            console.log(`Audio creado para el archivo: ${archivo}`);
        } catch (error: any) {
            console.error(`Error procesando ${archivo}: ${error.message}`);
            console.error(error.stack);
        }
    }

    public async procesarArchivos(batchSize: number): Promise<void> {
        try {
            const archivos = (await fs.readdir(this.rutaCarpeta)).filter(
                (file) => file.endsWith(".txt")
            );
            console.log(`Archivos encontrados: ${archivos.length}`);

            for (let i = 0; i < archivos.length; i += batchSize) {
                const lote = archivos.slice(i, i + batchSize);
                await Promise.all(
                    lote.map((archivo) => this.procesarArchivo(archivo))
                );
            }
        } catch (error: any) {
            console.error(`Error al procesar la carpeta: ${error.message}`);
        }
    }
}
