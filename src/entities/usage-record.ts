import { Resetable } from "./resetable";

interface UsageRecord extends Resetable{
    id: string
    user: string
    product: string
    accumulated: number
    add(consumption: number):void
}

export {UsageRecord}
