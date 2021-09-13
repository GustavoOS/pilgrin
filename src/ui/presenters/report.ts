import { Report, ReportPresenter } from "../../useCases/presenters/report";
import { ExportToCsv } from 'export-to-csv';
import fs from 'fs';
import path from 'path'

class CSVReportPresenter implements ReportPresenter {
    report: Report
    csv: any
    public receive(report: Report): void {
        this.report = report;
        this.exportReportToCSV();
    }

    public saveCSV(){
        const dir = '../../../reports/'
        const fileName = `${this.report.date.toISOString()}.csv`
        fs.writeFileSync(path.join(__dirname, dir, fileName), this.csv)
    }

    private exportReportToCSV(){
    
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
        
        this.csv = csvExporter.generateCsv(this.report.items.map(item=>{
            return {
                'Royalties': item.value,
                'Usuários totais': item.users,
                'Editora': item.supplier
            }
        }), true);
    }
}

export {CSVReportPresenter}
