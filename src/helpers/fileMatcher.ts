import path from "path";

export class FileMatcher {
    static obtenerArchivosPares(
        archivosTexto: string[],
        archivosAudio: string[]
    ): { texto: string; audio: string }[] {
        const audioMap = new Map(
            archivosAudio.map((audio) => [
                path.basename(audio, path.extname(audio)),
                audio,
            ])
        );
        return archivosTexto
            .map((texto) => {
                const baseName = path.basename(texto, path.extname(texto));
                const audio = audioMap.get(baseName);
                return audio ? { texto, audio } : null;
            })
            .filter(
                (par): par is { texto: string; audio: string } => par !== null
            );
    }

    static obtenerArchivosSinPareja(
        archivosAudio: string[],
        archivosPares: { texto: string; audio: string }[]
    ): string[] {
        const archivosEmparejados = archivosPares.map((par) => par.audio);
        return archivosAudio.filter(
            (audio) => !archivosEmparejados.includes(audio)
        );
    }
}
