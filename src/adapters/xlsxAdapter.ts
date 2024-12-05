import XLSX from "xlsx";

export class XlsxAdapter {
    public static readFile(filePath: string): XLSX.WorkBook {
        return XLSX.readFile(filePath);
    }

    public static getSheetNames(workbook: XLSX.WorkBook): string[] {
        return workbook.SheetNames;
    }

    public static getSheet(
        workbook: XLSX.WorkBook,
        sheetName: string
    ): XLSX.WorkSheet {
        return workbook.Sheets[sheetName];
    }

    public static sheetToJson(
        sheet: XLSX.WorkSheet,
        options: XLSX.Sheet2JSONOpts = { header: 1 }
    ): any[] {
        return XLSX.utils.sheet_to_json(sheet, options);
    }
}
