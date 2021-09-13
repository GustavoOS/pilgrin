interface ReportPresenter {
    receive(report: Report): void
}

class ReportItem {
    supplier: string;
    title: string;
    product: string;
    value: number = 0;

    addValue(value: number) {
        this.value += value
    }
}

class Report {
    items: ReportItem[] = [];
    date = new Date();
}

export {Report, ReportPresenter, ReportItem}
