import { Consumption } from "../entities/consumption";

interface ConsumptionGateway {
    save(user: Consumption): Promise<any>
    findOne(id: string): Promise<Consumption>
    delete(user: Consumption): Promise<any>,
    find(criteria: object): Promise<Consumption[]>
}

export { ConsumptionGateway }
