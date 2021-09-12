import { Product } from "../entities/product";


interface ProductGateway {
    save(user: Product): Promise<any>
    findOne(id: string): Promise<Product>
    delete(user: Product): Promise<any>,
    find(criteria: object): Promise<Product[]>
}

export { ProductGateway }
