export class DataExtractorExcel {
    private data: any;
    private headers: any;
    private dataExtracted: any;

    constructor(data: any) {
        this.data = data;
        this.headers = this.data[0];
        this.dataExtracted = this.data.slice(1);
    }

    public extractData() {
        const dataExtracted = this.dataExtracted.map((row: any) => {
            const dataRow: any = {};
            row.forEach((cell: any, index: any) => {
                dataRow[this.headers[index]] = cell;
            });
            return dataRow;
        });
        return dataExtracted;
    }
}
