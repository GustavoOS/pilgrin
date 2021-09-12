import { Consumption } from "../entities/consumption";
import { ConsumptionFactory } from "../entities/factories";
import { ConsumptionGateway } from "../gateways/consumption";
import { ProductGateway } from "../gateways/product-gateway";
import { UserGateway } from "../gateways/user-gateway";

class CreateConsumptionUseCase {

    public consumption: Consumption

    constructor(private userGW: UserGateway,
        private productGW: ProductGateway,
        private consumptionGW: ConsumptionGateway,
        private consumptionFactory: ConsumptionFactory,
        private IDGenerator: CallableFunction) { }

    async execute(consumptionDAO: ConsumptionCreationDAO) {
        await this.createConsumption(consumptionDAO);
        await this.saveConsumptionIntoUser(consumptionDAO);
        await this.saveConsumptionIntoProduct(consumptionDAO);
    }
    
    private async saveConsumptionIntoProduct(consumptionDAO: ConsumptionCreationDAO) {
        const product = await this.productGW.findOne(consumptionDAO.product);
        product.consumptions.push(this.consumption.id);
        await this.productGW.save(product);
    }
    
    private async saveConsumptionIntoUser(dao: ConsumptionCreationDAO) {
        const user = await this.userGW.findOne(dao.user);
        user.addConsumption(this.consumption.id)
        await this.userGW.save(user);
    }
    
    private async createConsumption(dao: ConsumptionCreationDAO) {
        this.consumption = this.consumptionFactory.create();
        this.consumption.reset(this.IDGenerator);
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

export {CreateConsumptionUseCase}
