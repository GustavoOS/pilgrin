import { ContentSupplier } from "./content-supplier";

interface Product {
    id: string,
    title: string,
    size: number,
    price: number,
    supplier: ContentSupplier
}

export { Product }