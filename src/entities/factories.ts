import { Consumption } from "./consumption";
import { ContentSupplier } from "./content-supplier";
import { Product } from "./product";
import { UsageRecord } from "./usage-record";
import { User } from "./user";

interface ConsumptionFactory {
    create(): Consumption
}

interface SupplierFactory {
    create(): ContentSupplier
}

interface ProductFactory {
    create(): Product
}

interface UserFactory {
    create(): User
}

interface UsageRecordFactory{
    create(): UsageRecord
}

export {
    ConsumptionFactory,
    SupplierFactory,
    ProductFactory,
    UserFactory,
    UsageRecordFactory
}
