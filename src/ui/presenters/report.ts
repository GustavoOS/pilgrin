import { Report, ReportPresenter } from "../../useCases/presenters/report";
import { ExportToCsv } from 'export-to-csv';
import fs from 'fs';
import path from 'path'

const NO_ENOUGHT_DATA = "Não há dados suficientes para produzir um relatório";

class CSVReportPresenter implements ReportPresenter {
    report: Report
    csv: any

    public receive(report: Report): void {
        this.report = report;
        this.exportReportToCSV();
    }

    public saveCSV() {
        const dir = '../../../reports/'
        const fileName = `${this.report.date.toISOString()}.csv`
        const filePath = path.join(__dirname, dir, fileName)
        fs.writeFileSync(filePath, this.csv)
        return filePath;
    }

    private exportReportToCSV() {

        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: `Relatório gerado ${this.report.date.toLocaleString()}`,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };

        const csvExporter = new ExportToCsv(options);
        if(this.report.items.length < 1)
            throw new Error(NO_ENOUGHT_DATA)

        this.csv = csvExporter.generateCsv(this.report.items.map(item => {
            return {
                'Royalties': item.value,
                'Usuários totais': item.users,
                'Editora': item.supplier
            }
        }), true);
    }
}

export { CSVReportPresenter }
