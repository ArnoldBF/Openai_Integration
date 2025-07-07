export function generarFormatoRespuesta(campos: any[]): string {
    const comunes = ['"True"', '"False"', '"N/A"'];
    const json: Record<string, string> = {};

    for (const campo of campos) {
        if (campo.includes("fecha")) {
            json[campo] = '"AAAA-MM-DD" / "N/A"';
        } else if (campo.startsWith("motivo_")) {
            json[campo] = '"texto" / "N/A"';
        } else {
            json[campo] = comunes.join(" / ");
        }
    }

    // Serializa manualmente sin formato JSON real para dejarlo como string plano
    return (
        "{\n" +
        Object.entries(json)
            .map(([k, v]) => ` "${k}": ${v}`)
            .join(",\n") +
        "\n}"
    );
}
const campos = [
    "compromiso_pago",
    "fecha_pago",
    "reclamo",
    "motivo_reclamo",
    "objecion",
    "motivo_objecion",
    "malas_palabras",
    "saludo_cordial",
];

console.log(generarFormatoRespuesta(campos));
