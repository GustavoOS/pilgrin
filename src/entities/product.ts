import { Consumption } from "./consumption";
import { ContentSupplier } from "./content-supplier";

interface Product {
    id: string,
    title: string,
    size: number,
    price: number,
    supplier: ContentSupplier,
    consumptions: Consumption[]
}

export { Product }