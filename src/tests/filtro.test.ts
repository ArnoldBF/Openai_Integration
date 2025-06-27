// const data = [
//     { Id: "460043488150094379" },
//     { Id: "460043385074811419" },
//     { Id: "460043647083610664" },
//     { Id: "460043385092375078" },
//     { Id: "460044184154800643" },
//     { Id: "460044244303413791" },
//     { Id: "460044265797517863" },
//     { Id: "460044265801646641" },
// ];

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
