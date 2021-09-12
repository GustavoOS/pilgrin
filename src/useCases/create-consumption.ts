import { Consumption } from "../entities/consumption";
import { ConsumptionFactory, UsageRecordFactory } from "../entities/factories";
import { User } from "../entities/user";
import { ConsumptionGateway } from "../gateways/consumption";
import { ProductGateway } from "../gateways/product-gateway";
import { UsageRecordGateway } from "../gateways/usage-record-gateway";
import { UserGateway } from "../gateways/user-gateway";

class CreateConsumptionUseCase {

    public consumption: Consumption
    private user: User

    constructor(
        private userGW: UserGateway,
        private productGW: ProductGateway,
        private consumptionGW: ConsumptionGateway,
        private usageRecordGW: UsageRecordGateway,
        private consumptionFactory: ConsumptionFactory,
        private usageRecordFactory: UsageRecordFactory) { }

    async execute(consumptionDAO: ConsumptionCreationDAO) {
        await this.validateDAO(consumptionDAO)
        await this.createConsumption(consumptionDAO);
        await this.saveConsumptionIntoUser(consumptionDAO);
        await this.saveConsumptionIntoProduct(consumptionDAO);
    }

    private async validateDAO(dao: ConsumptionCreationDAO)
    {
        this.user = await this.userGW.findOne(dao.user);
        this.validateFound(this.user)
        const product = await this.productGW.findOne(dao.product)
        this.validateFound(product)
    }

    private validateFound(found){
        if(!found)
            throw new Error("Resource not found");
    }

    private async saveConsumptionIntoProduct(dao: ConsumptionCreationDAO) {
        let record = await this.usageRecordGW.findOne({
            user: dao.user,
            product: dao.product
        })
        if (!record){
            record = this.usageRecordFactory.create();
            record.user = dao.user;
            record.product = dao.product
        }
        record.add(this.consumption.getRange())
        await this.usageRecordGW.save(record)
    }

    private async saveConsumptionIntoUser(dao: ConsumptionCreationDAO) {
        this.user.consumptions.push(this.consumption.id)
        await this.userGW.save(this.user);
    }

    private async createConsumption(dao: ConsumptionCreationDAO) {
        this.consumption = this.consumptionFactory.create();
        this.consumption.user = dao.user;
        this.consumption.product = dao.product;
        this.consumption.start_location = dao.start_location;
        this.consumption.end_location = dao.end_location;
        await this.consumptionGW.save(this.consumption);
    }
}

interface ConsumptionCreationDAO {
    user: string,
    product: string,
    start_location: number,
    end_location: number
}

export { CreateConsumptionUseCase }
