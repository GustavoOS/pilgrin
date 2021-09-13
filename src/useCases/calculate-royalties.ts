import { ProductGateway } from "../gateways/product-gateway";
import { SupplierGateway } from "../gateways/supplier-gateway";
import { UsageRecordGateway } from "../gateways/usage-record-gateway";

class CalculateRoyaltiesUseCase {
    report: Report;

    constructor(
        private supplierGW: SupplierGateway,
        private productGW: ProductGateway,
        private registerGW: UsageRecordGateway
    ) { }

    async execute() {
        const registers = await this.registerGW.find(null);
        this.report = new Report();
        for (const register of registers)
            await this.generateReportFromRegister(register)
        return this.report;
    }

    async generateReportFromRegister(register) {
        let reportItem = this.report.items.find(el => el.product === register.product)
        const product = await this.productGW.findOne(register.product);
        const supplier = await this.supplierGW.findOne(product.supplier);
        if (!reportItem) {
            reportItem = new ReportItem();
            reportItem.product = register.product;
            reportItem.supplier = supplier.name;
            this.report.items.push(reportItem);
        }
        if (product.canCharge(register.accumulated))
            reportItem.addValue(product.calculateCharge())
    }
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

export { CalculateRoyaltiesUseCase }
