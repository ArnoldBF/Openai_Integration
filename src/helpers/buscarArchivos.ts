import fs from "fs/promises";
import path from "path";

interface ResultadoMovimientoArchivos {
    movidos: string[];
    errores: { archivo: string; error: any }[];
}

export async function moverArchivos(
    rutaOrigen: string,
    rutaDestino: string,
    filtro: string[]
): Promise<ResultadoMovimientoArchivos> {
    const listadoArchivos = await fs.readdir(rutaOrigen);

    const archivosFiltrados = listadoArchivos.filter((nombre) =>
        filtro.some((id) => nombre.includes(id))
    );

    const movidos: string[] = [];
    const errores: { archivo: string; error: any }[] = [];

    for (const nombre of archivosFiltrados) {
        const rutaCompleta = path.join(rutaOrigen, nombre);
        try {
            const stat = await fs.stat(rutaCompleta);
            if (stat.isFile()) {
                const destinoCompleto = path.join(rutaDestino, nombre);
                await fs.rename(rutaCompleta, destinoCompleto);
                movidos.push(nombre);
                console.log(`Movido: ${nombre} -> ${destinoCompleto}`);
            }
        } catch (err) {
            errores.push({ archivo: nombre, error: err });
            console.error(`Error moviendo ${nombre}:`, err);
        }
    }

    console.log("Archivos movidos:", movidos);
    if (errores.length > 0) {
        console.log("Errores:", errores);
    }
    return { movidos, errores };
}
