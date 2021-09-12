import { Resetable } from "./resetable";

interface Consumption extends Resetable {
    id: string,
    product: string,
    user: string,
    start_location: number
    end_location: number
    getRange(): number
}

export { Consumption }
