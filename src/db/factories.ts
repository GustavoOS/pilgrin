import {
    ConsumptionFactory,
    ProductFactory,
    SupplierFactory,
    UsageRecordFactory,
    UserFactory
} from "../entities/factories";
import { ConsumptionDB } from "./schema/ConsumptionDB";
import { ContentSupplierDB } from "./schema/ContentSupplier";
import { ProductDB } from "./schema/Product";
import { UsageRecordDB } from "./schema/UsageRecord";
import { UserDB } from "./schema/User";
import { v4 as uuidv4 } from 'uuid';
import { Resetable } from "../entities/resetable";

class ConsumptionDBFactory implements ConsumptionFactory {
    create(): ConsumptionDB {
        return reset(new ConsumptionDB());
    }
}

class SupplierDBFactory implements SupplierFactory {
    create(): ContentSupplierDB {
        return reset(new ContentSupplierDB());
    }
}

class ProductDBFactory implements ProductFactory {
    create(): ProductDB {
        return reset(new ProductDB());
    }
}

class UserDBFactory implements UserFactory {
    create(): UserDB {
        return reset(new UserDB());
    }
}

class UsageRecordDBFactory implements UsageRecordFactory {
    create(): UsageRecordDB {
        return reset(new UsageRecordDB());
    }
}

function reset(resetable:Resetable):any {
    resetable.reset(uuidv4);
    return resetable;
}

export {
    ConsumptionDBFactory,
    SupplierDBFactory,
    ProductDBFactory,
    UserDBFactory,
    UsageRecordDBFactory
}
