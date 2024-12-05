import { XlsxAdapter } from "../adapters/xlsxAdapter";
import { DataExtractorExcel } from "../helpers/dataExtractorExcel";

export class ExcelProcessor {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public processFile(): any {
        // Leer el archivo Excel usando el adaptador
        const workbook = XlsxAdapter.readFile(this.filePath);

        // Asumimos que los datos están en la primera hoja
        const sheetName = XlsxAdapter.getSheetNames(workbook)[0];
        const sheet = XlsxAdapter.getSheet(workbook, sheetName);

        // Convertir la hoja a un array de arrays usando el adaptador
        const data = XlsxAdapter.sheetToJson(sheet, { header: 1 });

        // Crear una instancia de DataExtractorExcel
        const extractor = new DataExtractorExcel(data);

        // Extraer los datos
        const extractedData = extractor.extractData();

        return extractedData;
    }
}
