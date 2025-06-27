import { ExcelProcessor } from "./excelProcessor";

export function filtrar(archivoFiltro: string) {
    const excelProcessor = new ExcelProcessor(archivoFiltro);
    const data = excelProcessor.processFile();

    const filtro: string[] = [];

    for (let i = 0; i < data.length; i++) {
        filtro.push(data[i].Id);
    }

    return filtro;
}
