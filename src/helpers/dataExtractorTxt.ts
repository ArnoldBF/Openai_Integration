import fs from "fs/promises";

export class DataExtractorTxt {
    constructor() {}

    public async extraerDatos(
        rutaArchivoTxt: string
    ): Promise<Record<string, any>> {
        const datos: Record<string, any> = {};
        const contenido = await fs.readFile(rutaArchivoTxt, {
            encoding: "utf-8",
        });
        const lineas = contenido.split("\n");
        for (const linea of lineas) {
            let lineaNormalizada = linea.normalize("NFC").trim();
            if (!lineaNormalizada) {
                continue;
            }
            // Normalización de variantes de "ñ" primero
            lineaNormalizada = lineaNormalizada
                .replace(/Ã±/gi, "ñ")
                .replace(/�/g, "ñ")
                .replace(/\u00f1/gi, "ñ");
            // Reemplazo robusto de cualquier variante de "campaña" por "campana" (una sola "a")
            lineaNormalizada = lineaNormalizada.replace(
                /campa(?:ñ|n|Ã±|�|\u00f1)a/gi,
                "campana"
            );
            lineaNormalizada = lineaNormalizada.trim();
            const coincidencia = lineaNormalizada
                .trim()
                .match(/([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ\s]+)\s*[=:|-]\s*(.+)/);
            if (coincidencia) {
                let clave = coincidencia[1].toUpperCase().trim();
                let valor: string | number = coincidencia[2].trim();
                if (clave === "FECHA") {
                    if (/^\d{8}$/.test(valor)) {
                        const year = valor.slice(0, 4);
                        const month = valor.slice(4, 6);
                        const day = valor.slice(6, 8);
                        // const dateObj = new Date(
                        //     parseInt(valor.slice(0, 4)),
                        //     parseInt(valor.slice(4, 6)) - 1,
                        //     parseInt(valor.slice(6, 8))
                        // );
                        // const day = String(dateObj.getDate()).padStart(2, "0");
                        // const month = String(dateObj.getMonth() + 1).padStart(
                        //     2,
                        //     "0"
                        // );
                        // const year = dateObj.getFullYear();
                        valor = `${year}-${month}-${day}`; // <-- dd/mm/yyyy, string SIEMPRE
                    }
                } else if (clave === "HORA") {
                    valor = valor.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");
                } else if (clave === "SEGUNDOS") {
                    valor = isNaN(parseInt(valor)) ? 0 : parseInt(valor);
                }
                datos[clave] = valor;
            }
        }
        return datos;
    }
}

const extractor = new DataExtractorTxt();
extractor
    .extraerDatos("20250416110334_460810323846693422_3_1532.txt")
    .then((datos) => {
        console.log(datos);
    });
