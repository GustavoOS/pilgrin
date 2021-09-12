import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { ConsumptionDB } from "../src/db/schema/ConsumptionDB";
import { ContentSupplierDB } from "../src/db/schema/ContentSupplier";
import { ProductDB } from "../src/db/schema/Product";
import { UserDB } from "../src/db/schema/User";



describe('test database', () => {
    let connection: Connection

    beforeAll(async () => {
        connection = await createConnection();
    })

    // test('test user', async () => {
    //     const users = connection.getRepository(UserDB);
    //     const id = uuidv4();
    //     const user = new UserDB();
    //     user.id = id;
    //     user.firstName = "Carlito";
    //     user.lastName = "Paes";
    //     user.age = 50;
    //     await users.save(user);
    //     const stored: UserDB = await users.findOne({ 'id': id });
    //     expect(stored.firstName).toEqual("Carlito");
    //     expect(stored.lastName).toEqual("Paes")
    //     expect(stored.age).toEqual(50)
    //     await users.delete(user)
    // })

    // test('test supplier', async () => {
    //     const suppliers = connection.getRepository(ContentSupplierDB);
    //     const supplier = createSupplier();
    //     await suppliers.save(supplier);
    //     const stored: ContentSupplierDB = await suppliers.findOne(supplier);
    //     expect(stored.id).toEqual(supplier.id);
    //     expect(stored.name).toEqual("Editora Pilgrin")
    //     expect(stored.products).toBeUndefined()
    //     await suppliers.delete(supplier)
    // })

    test('test product', async () => {
        const suppliers = connection.getRepository(ContentSupplierDB);
        const products = connection.getRepository(ProductDB);
        let product = new ProductDB();
        product.id = uuidv4();
        product.price = 50;
        product.size = 1000;
        product.title = "Devocional"
        await products.save(product);
        const supplier = createSupplier();
        supplier.addProduct(product);
        await suppliers.save(supplier);
        product = await products.findOne(product.id, {relations: ['supplier']});
        expect(product.supplier.id).toEqual(supplier.id);
        expect(product.title).toEqual("Devocional");
        products.delete(product);
        // TODO investigate why supplier cannot be deleted
        suppliers.delete(supplier);
    })

    // test('test consumption', async()=>{
    //     const products = connection.getRepository(ProductDB);
    //     const suppliers = connection.getRepository(ContentSupplierDB);
    //     const users = connection.getRepository(UserDB);
    //     let product = await createProduct(products);
    //     await products.save(product);
    //     const supplier = createSupplier();
    //     supplier.addProduct(product);
    //     await suppliers.save(supplier);
    //     let user = await createUser(uuidv4(), users)
    //     const consumptions = connection.getRepository(ConsumptionDB);
    //     let consumption = new ConsumptionDB();
    //     consumption.id = uuidv4();
    //     consumption.start_location = 0;
    //     consumption.end_location = 25;
    //     consumptions.save(consumption);
    //     user.consumptions = [consumption];
    //     await users.save(user);
    //     product.consumptions = [consumption];
    //     await products.save(product);
    //     console.log(consumption.user);
    //     expect(user.consumptions[0].product).toBeDefined();
    // })
})

async function createUser(id: any, users) {
    const user = new UserDB();
    user.id = id;
    user.firstName = "Carlito";
    user.lastName = "Paes";
    user.age = 50;
    await users.save(user);
    return user;
}

async function createProduct(products) {
    let product = new ProductDB();
    product.id = uuidv4();
    product.price = 50;
    product.size = 1000;
    product.title = "Devocional";
    await products.save(product);
    return product;
}

function createSupplier() {
    const supplier = new ContentSupplierDB();
    supplier.id = uuidv4();
    supplier.name = "Editora Pilgrin";
    return supplier;
}