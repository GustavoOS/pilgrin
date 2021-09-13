import { Connection, createConnection } from "typeorm";
import "reflect-metadata";
import { ProductGateway } from "../src/gateways/product-gateway";
import { UsageRecordGateway } from "../src/gateways/usage-record-gateway";
import { ProductDB } from "../src/db/schema/Product";
import { UsageRecordDB } from "../src/db/schema/UsageRecord";
import { ContentSupplier } from "../src/entities/content-supplier";
import { createProduct, createSupplier } from "./utils";
import { SupplierGateway } from "../src/gateways/supplier-gateway";
import { Product } from "../src/entities/product";
import { v4 as uuidv4 } from 'uuid';
import { CalculateRoyaltiesUseCase } from "../src/useCases/calculate-royalties";
import { UsageRecord } from "../src/entities/usage-record";
import { Report, ReportPresenter } from "../src/useCases/presenters/report";
import { CSVReportPresenter } from "../src/ui/presenters/report";
import { ContentSupplierDB } from "../src/db/schema/ContentSupplier";

describe("Calculate royalties", () => {
    let connection: Connection;

    let productGW: ProductGateway;
    let recordGW: UsageRecordGateway;
    let supplierGW: SupplierGateway;

    const user = "usuario";
    let supplier: ContentSupplier;
    let product: Product;
    let record: UsageRecord;

    let useCase: CalculateRoyaltiesUseCase;
    let presenter: ReportPresenterTestImpl;

    beforeAll(async () => {
        connection = await createConnection();
    })

    beforeEach(async () => {
        productGW = connection.getRepository(ProductDB);
        recordGW = connection.getRepository(UsageRecordDB);
        supplierGW = connection.getRepository(ContentSupplierDB);
        supplier = createSupplier();
        await supplierGW.save(supplier);
        product = await createProduct(productGW);
        product.supplier = supplier.id;
        await productGW.save(product);
        record = await createRecord(user);
        presenter = new ReportPresenterTestImpl();
        useCase = new CalculateRoyaltiesUseCase(
            supplierGW,
            productGW,
            recordGW,
            presenter
        )
    })
    
    test("Test for a single chargeable consumption", async () => {
        expect((await productGW.findOne(product.id)).supplier).toBeDefined();
        expect(product.id).toEqual(record.product);
        expect(product.supplier).toEqual(supplier.id)
        await useCase.execute()
        expect(presenter.report.items.length).toEqual(1)
        expect(presenter.report.items[0].value).toEqual(5)
        expect(presenter.report.items[0].users).toEqual(1)
    })

    test("Test for 2 chargable consumptions", async() => {
        const r = await createRecord(user);
        await useCase.execute()
        expect(presenter.report.items.length).toEqual(1)
        expect(presenter.report.items[0].value).toEqual(10)
        expect(presenter.report.items[0].users).toEqual(2)
        recordGW.delete(r);
    })

    test("Test CSV file generation", async () => {
        const csv = new CSVReportPresenter();
        useCase = new CalculateRoyaltiesUseCase(
            supplierGW,
            productGW,
            recordGW,
            csv
        )
        await useCase.execute()
        expect(csv.csv).toBeDefined();
    })

    afterEach(async () => {
        productGW.delete(product)
        supplierGW.delete(supplier)
        recordGW.delete(record)
    })

    afterAll(async () => {
        await connection.close();
    })

    async function createRecord(_user: string) {
        const record = new UsageRecordDB();
        record.reset(uuidv4);
        record.accumulated = 600;
        record.product = product.id;
        record.user = _user;
        await recordGW.save(record);
        return record;
    }
})

class ReportPresenterTestImpl implements ReportPresenter {
    public report: Report
    receive(report: Report): void {
        this.report = report;
    }
}
