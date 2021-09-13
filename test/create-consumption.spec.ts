import { CreateConsumptionUseCase } from "../src/useCases/create-consumption"
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { UserDB } from "../src/db/schema/User";
import { ConsumptionDB } from "../src/db/schema/ConsumptionDB";
import { ProductDB } from "../src/db/schema/Product";
import { ConsumptionDBFactory, UsageRecordDBFactory } from "../src/db/factories";
import { createProduct, createUser } from "./utils";
import { UsageRecordDB } from "../src/db/schema/UsageRecord";


describe("Test Create Consumption Use Case", () => {
    let connection: Connection;
    let userGW, productGW, useCase, consumptionGW, records;
    let user, product;

    beforeAll(async () => {
        connection = await createConnection();
    })

    beforeEach(async () => {
        build_use_case(connection);
        user = await createUser(userGW);
        product = await createProduct(productGW);
    })

    test('Test Happy path', async () => {
        const request = {
            'user': user.id,
            'product': product.id,
            'end_location': 75,
            'start_location': 3
        };
        await useCase.execute(request);
        user = await userGW.findOne(user.id)
        product = await productGW.findOne(product.id)
        expect(user.consumptions.length).toEqual(1);
        const consumption = await consumptionGW.findOne(useCase.consumption.id);

        const record = await records.findOne({ user: user.id, product: product.id })
        expect(record.accumulated).toEqual(72)
        expect(useCase.consumption).toBeDefined()
        expect(useCase.consumption.id).toBeDefined()
        expect(consumption).toBeDefined()
        expect(consumption.end_location).toEqual(75)
        expect(consumption.start_location).toEqual(3)
        expect(consumption.user).toEqual(request.user)
        expect(consumption.product).toEqual(product.id)
        consumptionGW.delete(consumption)
    })

    test("Test 2 consumptions", async () => {
        let request = {
            'user': user.id,
            'product': product.id,
            'end_location': 10,
            'start_location': 0
        };
        await useCase.execute(request);
        request.start_location = 10
        request.end_location = 20
        await useCase.execute(request);
        const record = await records.findOne({ user: user.id, product: product.id });
        expect(record).toBeDefined();
        expect(record.accumulated).toEqual(20);
        records.delete(record);
    })

    test("Test Invalid user", async () => {
        const request = {
            'user': 'hu3BR',
            'product': product.id,
            'end_location': 10,
            'start_location': 0
        };
        try {
            await useCase.execute(request);
            fail('Did not throw')
        } catch (error) {
            expect(error.message).toEqual("Resource not found")
            const record = await records.findOne(null);
            records.delete(record);
        }
    })

    test("Test Invalid Product", async () => {
        const request = {
            'user': user.id,
            'product': 'hu3BR',
            'end_location': 10,
            'start_location': 0
        };
        try {
            await useCase.execute(request);
            fail('Did not throw')
        } catch (error) {
            expect(error.message).toEqual("Resource not found")
        }
    })

    afterEach(async () => {
        userGW.delete(user)
        productGW.delete(product)
    })

    afterAll(async () => {
        await connection.close();
    })

    function build_use_case(connection: Connection) {
        userGW = connection.getRepository(UserDB);
        productGW = connection.getRepository(ProductDB);
        consumptionGW = connection.getRepository(ConsumptionDB);
        records = connection.getRepository(UsageRecordDB)
        useCase = new CreateConsumptionUseCase(
            userGW,
            productGW,
            consumptionGW,
            records,
            new ConsumptionDBFactory(),
            new UsageRecordDBFactory()
        );
    }
})
