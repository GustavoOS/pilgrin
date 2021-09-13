import { Resetable } from "./resetable";

interface Product extends Resetable {
    id: string,
    title: string,
    size: number,
    price: number,
    supplier: string,
    consumptions: string[],
    canCharge(consumption): boolean
    calculateCharge(): number
}

export { Product }