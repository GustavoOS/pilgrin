import { Connection, createConnection } from "typeorm";
import "reflect-metadata";
import { UserDB } from "./schema/User";
import { v4 as uuidv4 } from 'uuid';
import { ContentSupplierDB } from "./schema/ContentSupplier";
import { ProductDB } from "./schema/Product";


(async () => {
    const connection = await createConnection();
    const users = [
        (await createUser(connection, "Joe", "Smith", 18)).id,
        (await createUser(connection, "Mary", "Jane", 19)).id
    ];

    const inspire = await createSupplier(connection, "Editora Inspire");
    const pilgrim = await createSupplier(connection, "Pilgrim");
    const suppliers = [inspire.id, pilgrim.id]

    const products = [
        await createProduct(connection, inspire, "Uma Vida Com Propósitos", 42, 50),
        await createProduct(connection, inspire, "A trindade", 365, 40),
        await createProduct(connection, pilgrim, "Manso e humilde", 220, 30),
        await createProduct(connection, pilgrim, "Oração da noite", 70, 20)
    ]
    console.log("DB Populated")
    console.log({users, suppliers, products});

    connection.close();
})();

async function createUser(connection: Connection,
    firstName: string,
    lastName: string,
    age: number) {
    const gw = connection.getRepository(UserDB)
    const user = new UserDB();
    user.reset(uuidv4);
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    await gw.save(user)
    return user;
}

async function createSupplier(connection, name) {
    const gw = connection.getRepository(ContentSupplierDB);
    const supplier = new ContentSupplierDB();
    supplier.reset(uuidv4);
    supplier.name = name;
    await gw.save(supplier);
    return supplier;
}

async function createProduct(
    connection: Connection,
    supplier: ContentSupplierDB,
    title: string,
    size: number,
    price: number) {
    const pGW = connection.getRepository(ProductDB)
    const sGW = connection.getRepository(ContentSupplierDB);

    const product = new ProductDB();
    product.reset(uuidv4);
    product.supplier = supplier.id;
    product.size = size;
    product.title = title;
    product.price = price;
    await pGW.save(product)
    supplier.products.push(product.id);
    sGW.save(supplier);
    return product.id;
}
