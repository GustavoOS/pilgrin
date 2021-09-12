import { Resetable } from "./resetable";

interface Product extends Resetable {
    id: string,
    title: string,
    size: number,
    price: number,
    supplier: string,
    consumptions: string[]
}

export { Product }