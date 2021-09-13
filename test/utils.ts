import { ContentSupplierDB } from "../src/db/schema/ContentSupplier";
import { v4 as uuidv4 } from 'uuid';
import { ProductDB } from "../src/db/schema/Product";
import { UserDB } from "../src/db/schema/User";
import { Connection } from "typeorm";

function createSupplier() {
    const supplier = new ContentSupplierDB();
    supplier.reset(uuidv4);
    supplier.name = "Editora Pilgrin";
    return supplier;
}

async function createProduct(products) {
    let product = new ProductDB();
    product.reset(uuidv4);
    product.price = 50;
    product.size = 1000;
    product.title = "Devocional";
    await products.save(product);
    return product;
}

async function createUser(users) {
    const user = new UserDB();
    user.reset(uuidv4);
    user.firstName = "Carlito";
    user.lastName = "Paes";
    user.age = 50;
    await users.save(user);
    return user;
}

async function clear(connection: Connection) {
    const entities = connection.entityMetadatas;

    for (const entity of entities) {
        const repository = connection.getRepository(entity.name);
        await repository.clear();
    }
};

export {
    createUser,
    createSupplier,
    createProduct,
    clear
}
