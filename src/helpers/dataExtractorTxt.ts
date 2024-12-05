import fs from "fs/promises";

export class DataExtractorTxt {
    private camposNecesarios: string[];

    constructor() {
        this.camposNecesarios = [
            "fecha",
            "hora",
            "nodo",
            "canal",
            "segundos",
            "entrasale",
            "nrolinea",
            "nroremoto",
            "linkid",
            "idlinea",
            "campaña",
            "cliente",
        ];
    }

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

            // Reemplazo explícito de caracteres problemáticos (como "Campa�a")
            lineaNormalizada = lineaNormalizada
                .replace(/Campa�a/g, "campaña")
                .trim();

            const coincidencia = lineaNormalizada
                .trim()
                .match(/([\wñáéíóúÁÉÍÓÚüÜ\s]+)=\s*(.+)/);

            if (coincidencia) {
                let clave = coincidencia[1].toLowerCase().trim();
                let valor: string | number | Date = coincidencia[2].trim();

                if (clave === "fecha") {
                    if (/^\d{8}$/.test(valor)) {
                        valor = new Date(
                            parseInt(valor.slice(0, 4)),
                            parseInt(valor.slice(4, 6)) - 1,
                            parseInt(valor.slice(6, 8))
                        );
                    }
                } else if (clave === "hora") {
                    valor = valor.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");
                } else if (clave === "segundos") {
                    valor = isNaN(parseInt(valor)) ? 0 : parseInt(valor);
                }

                datos[clave] = valor;
            }
        }

        // Validar que todos los campos necesarios estén presentes
        const faltantes = this.camposNecesarios.filter(
            (campo) => !(campo in datos)
        );
        if (faltantes.length > 0) {
            throw new Error(`Faltan los campos: ${faltantes.join(", ")}`);
        }

        return datos;
    }
}
