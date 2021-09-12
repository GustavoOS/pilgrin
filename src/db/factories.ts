import { ConsumptionFactory, ProductFactory, SupplierFactory, UserFactory } from "../entities/factories";
import { ConsumptionDB } from "./schema/ConsumptionDB";
import { ContentSupplierDB } from "./schema/ContentSupplier";
import { ProductDB } from "./schema/Product";
import { UserDB } from "./schema/User";

class ConsumptionDBFactory implements ConsumptionFactory {
    create(): ConsumptionDB {
        return new ConsumptionDB();
    }
}

class SupplierDBFactory implements SupplierFactory {
    create(): ContentSupplierDB {
        return new ContentSupplierDB();
    }
}

class ProductDBFactory implements ProductFactory {
    create(): ProductDB {
        return new ProductDB();
    }
}

class UserDBFactory implements UserFactory {
    create(): UserDB {
        return new UserDB();
    }
}

export {
    ConsumptionDBFactory,
    SupplierDBFactory,
    ProductDBFactory,
    UserDBFactory
}
