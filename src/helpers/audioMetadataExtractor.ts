import mdata from "music-metadata";
import fs from "fs/promises";

/**
 * Extrae la metadata básica de un archivo de audio (duración, formato, bitrate, sampleRate, etc).
 * @param rutaArchivo Ruta absoluta o relativa al archivo de audio.
 * @returns Un objeto con la metadata relevante o null si falla.
 */
export async function extraerMetadataAudio(
    rutaArchivo: string
): Promise<Record<string, any> | null> {
    try {
        const metadata = await mdata.parseFile(rutaArchivo);
        const datosArchivo = await fs.stat(rutaArchivo);
        const year = datosArchivo.birthtime.getFullYear();
        const month = String(datosArchivo.birthtime.getMonth() + 1).padStart(
            2,
            "0"
        );
        const day = String(datosArchivo.birthtime.getDate()).padStart(2, "0");
        const fechaCreacion = `${year}-${month}-${day}`; // Formato YYYY-MM
        const datos = {
            MD_FORMATO: metadata.format.container,
            MD_DURACION: metadata.format.duration,
            MD_FECHA_CREACION: fechaCreacion,
            MD_CODEC: metadata.format.codec,
        };
        return datos;
    } catch (error: any) {
        console.error(
            `No se pudo extraer metadata de ${rutaArchivo}:`,
            error.message
        );
        return null;
    }
}

// Ejemplo de uso (descomentar para probar manualmente):
// extraerMetadataAudio(
//     "C:\\Users\\a.bazan\\Music\\prueba1\\20241119103657_316069062631489904_2_503.wav"
// ).then(console.log);
