import { Report, ReportPresenter } from "../../useCases/presenters/report";

class CSVReportPresenter implements ReportPresenter {

    receive(report: Report): void {
        throw new Error("Method not implemented.");
    }
}