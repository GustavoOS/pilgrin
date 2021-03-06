import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { ConsumptionDB } from "../src/db/schema/ConsumptionDB";
import { ContentSupplierDB } from "../src/db/schema/ContentSupplier";
import { ProductDB } from "../src/db/schema/Product";
import { UserDB } from "../src/db/schema/User";
import { createProduct, createSupplier, createUser } from "./utils";



describe('test database', () => {
    let connection: Connection

    beforeAll(async () => {
        connection = await createConnection();
    })

    test('test user', async () => {
        const users = connection.getRepository(UserDB);
        const user = new UserDB();
        user.reset(uuidv4);
        user.firstName = "Carlito";
        user.lastName = "Paes";
        user.age = 50;
        await users.save(user);
        const stored: UserDB = await users.findOne(user.id);
        expect(stored.firstName).toEqual("Carlito");
        expect(stored.lastName).toEqual("Paes")
        expect(stored.age).toEqual(50)
        await users.delete(user)
    })

    test('test supplier', async () => {
        const suppliers = connection.getRepository(ContentSupplierDB);
        const supplier = createSupplier();
        await suppliers.save(supplier);
        const stored: ContentSupplierDB = await suppliers.findOne(supplier.id);
        expect(stored.id).toEqual(supplier.id);
        expect(stored.name).toEqual("Editora Pilgrin")
        expect(Array.isArray(stored.products)).toBeTruthy()
        await suppliers.delete(supplier)
    })

    test('test product', async () => {
        const suppliers = connection.getRepository(ContentSupplierDB);
        const products = connection.getRepository(ProductDB);
        const supplier = createSupplier();
        let product = new ProductDB();
        product.reset(uuidv4);
        product.price = 50;
        product.size = 1000;
        product.title = "Devocional";
        product.supplier = supplier.id;
        await products.save(product);
        expect(product.canCharge(400)).toBeFalsy()
        expect(product.canCharge(600)).toBeTruthy()
        supplier.products = [product.id];
        await suppliers.save(supplier);
        expect(product.supplier).toEqual(supplier.id);
        expect(supplier.products[0]).toEqual(product.id)
        expect(product.title).toEqual("Devocional");
        products.delete(product);
        suppliers.delete(supplier);
    })

    test('test consumption', async () => {
        const products = connection.getRepository(ProductDB);
        const users = connection.getRepository(UserDB);
        let product = await createProduct(products);
        await products.save(product);
        let user = await createUser(users)
        const consumptions = connection.getRepository(ConsumptionDB);
        let consumption = new ConsumptionDB();
        consumption.reset(uuidv4);
        consumption.start_location = 0;
        consumption.end_location = 25;
        consumption.product = product.id;
        consumption.user = user.id
        consumptions.save(consumption);
        user.consumptions = [consumption.id];
        await users.save(user);
        product.consumptions = [consumption.id];
        await products.save(product);
        expect(consumption.user).toEqual(user.id)
        expect(consumption.product).toEqual(product.id)
        expect(user.consumptions[0]).toEqual(consumption.id)
        expect(product.consumptions[0]).toEqual(consumption.id)
        expect(consumption.date).toBeDefined();
        await consumptions.delete(consumption);
        await products.delete(product);
        await users.delete(user);
    })

    test("After 2 users created, find One will fetch the right user", async () => {
        const userRepository = connection.getRepository(UserDB)
        const user1 = await createUser(userRepository)
        const user2 = await createUser(userRepository)
        const fetched = await userRepository.findOne(user2.id)
        expect(fetched.id).not.toEqual(user1.id)
        expect(fetched.id).toEqual(user2.id)
        userRepository.delete(user2)
        userRepository.delete(user1)
    })

    test("Test user consumption array save", async () => {
        const users = connection.getRepository(UserDB)
        let user = await createUser(users)
        user.consumptions.push("1")
        user.consumptions.push("2")
        await users.save(user);
        user = await users.findOne(user.id)
        expect(user.consumptions.length).toEqual(2)
        users.delete(user)
    })

    test('Test Manual Consumption 1', async () => {
        const consumptions = connection.getRepository(ConsumptionDB);
        expect(consumptions).toBeDefined();
        const consumption: ConsumptionDB = new ConsumptionDB();
        consumption.reset(uuidv4)
        consumption.start_location = 0;
        consumption.end_location = 25;
        consumption.product = "produto";
        consumption.user = "user"
        expect(consumption.id).toBeDefined()
        await consumptions.save(consumption)
        let created = await consumptions.findOne(consumption.id);
        expect(created).toBeDefined()
    })

    afterAll(async () => {
        await connection.close();
    })
})



