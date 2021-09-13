import { Connection, createConnection } from "typeorm";
import "reflect-metadata";
import { ProductGateway } from "../src/gateways/product-gateway";
import { UsageRecordGateway } from "../src/gateways/usage-record-gateway";
import { ProductDB } from "../src/db/schema/Product";
import { UsageRecordDB } from "../src/db/schema/UsageRecord";
import { ContentSupplier } from "../src/entities/content-supplier";
import { createProduct, createSupplier } from "./utils";
import { SupplierGateway } from "../src/gateways/supplier-gateway";
import { ContentSupplierDB } from "../src/db/schema/ContentSupplier";
import { Product } from "../src/entities/product";
import { v4 as uuidv4 } from 'uuid';
import { CalculateRoyaltiesUseCase } from "../src/useCases/calculate-royalties";
import { UsageRecord } from "../src/entities/usage-record";

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
        record = await createRecord();
        useCase = new CalculateRoyaltiesUseCase(
            supplierGW,
            productGW,
            recordGW
        )
    })

    test("Test for a single chargeable consumption", async () => {
        expect((await productGW.findOne(product.id)).supplier).toBeDefined();
        expect(product.id).toEqual(record.product);
        expect(product.supplier).toEqual(supplier.id)
        const report = await useCase.execute()
        expect(report.items.length).toEqual(1)
        expect(report.items[0].value).toEqual(5)
    })

    afterAll(async () => {
        await connection.close();
    })

    async function createRecord() {
        const record = new UsageRecordDB();
        record.reset(uuidv4);
        record.accumulated = 600;
        record.product = product.id;
        record.user = user;
        await recordGW.save(record);
        return record;
    }
})


