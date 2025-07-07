import { ExcelProcessor } from "../helpers/excelProcessor";

const excelProcessor = new ExcelProcessor("prueba1.xlsx");
const data = excelProcessor.processFile();

const filtro: string[] = [];

console.time("for-loop");
for (let i = 0; i < data.length; i++) {
    filtro.push(data[i].Id);
}
console.log(filtro);
console.timeEnd("for-loop");

export function filtrar(archivoFiltro: string) {
    const excelProcessor = new ExcelProcessor(archivoFiltro);
    const data = excelProcessor.processFile();

    const filtro: string[] = [];

    // console.time("for-loop");
    for (let i = 0; i < data.length; i++) {
        filtro.push(data[i].Id);
    }
    // console.log(filtro);
    // console.timeEnd("for-loop");

    console.log(`Filtro generado con ${filtro} elementos.`);

    return filtro;
}

// console.log(new Date().toISOString().split("T")[0]);
