import { CreateConsumptionUseCase } from "../src/useCases/create-consumption"
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { UserDB } from "../src/db/schema/User";
import { ConsumptionDB } from "../src/db/schema/ConsumptionDB";
import { ProductDB } from "../src/db/schema/Product";
import { ConsumptionDBFactory } from "../src/db/factories";
import { v4 as uuidv4 } from 'uuid';
import { createProduct, createUser } from "./utils";


describe("Test Create Consumption Use Case", ()=>{
    let connection: Connection;

    beforeAll(async () => {
        connection = await createConnection();
    })

    test('Test Happy path', async () => {
        const uGW = connection.getRepository(UserDB);
        const pGW = connection.getRepository(ProductDB);
        const cGW = connection.getRepository(ConsumptionDB);
        const useCase = new CreateConsumptionUseCase(
            uGW,
            pGW,
            cGW,
            new ConsumptionDBFactory(),
            uuidv4
        )
        let user = await createUser(uGW);
        let product = await createProduct(pGW);
        expect(user.id).not.toEqual("9becdb27-a77f-4f30-858a-582f3a643d0c")
        const request = {
            'user': user.id,
            'product': product.id,
            'end_location': 75,
            'start_location': 3
        };
        await useCase.execute(request);

        user = await uGW.findOne(user.id)
        product = await pGW.findOne(product.id)
        expect(user.consumptions.length).toEqual(1);
        const consumption = await cGW.findOne(useCase.consumption.id);
        expect(user.consumptions[0]).toEqual(product.consumptions[0])
        expect(useCase.consumption).toBeDefined()
        expect(useCase.consumption.id).toBeDefined()
        expect(consumption).toBeDefined()
        expect(consumption.end_location).toEqual(75)
        expect(consumption.start_location).toEqual(3)
        expect(consumption.user).toEqual(request.user)
        expect(consumption.product).toEqual(product.id)
    })
    afterAll(async ()=>{
        await connection.close();
    })
})
