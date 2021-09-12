import { Consumption } from "./consumption";
import { ContentSupplier } from "./content-supplier";
import { Product } from "./product";
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

export {
    ConsumptionFactory,
    SupplierFactory,
    ProductFactory,
    UserFactory
}
