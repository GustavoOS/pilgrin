import { Product } from "./product";

interface ContentSupplier {
    id: string,
    name: string,
    products: Product[]
    addProduct(product: Product): void
}

export { ContentSupplier }
