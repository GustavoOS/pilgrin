import { Resetable } from "./resetable";

interface ContentSupplier extends Resetable{
    id: string,
    name: string,
    products: string[]
}

export { ContentSupplier }
