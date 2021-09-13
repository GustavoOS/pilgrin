
import { Connection, createConnection } from "typeorm";
import { ConsumptionDBFactory, UsageRecordDBFactory } from "../db/factories";
import { ConsumptionDB } from "../db/schema/ConsumptionDB";
import { ContentSupplierDB } from "../db/schema/ContentSupplier";
import { ProductDB } from "../db/schema/Product";
import { UsageRecordDB } from "../db/schema/UsageRecord";
import { UserDB } from "../db/schema/User";
import { CalculateRoyaltiesUseCase } from "../useCases/calculate-royalties";
import { CreateConsumptionUseCase } from "../useCases/create-consumption";
import { CreateConsumptionController } from "./controllers/createConsumption";
import { GenerateReportController } from "./controllers/generateReport";
import { CSVReportPresenter } from "./presenters/report";
import { setServer } from "./server";


let createConsumptionUC: CreateConsumptionUseCase;
let consumptionController: CreateConsumptionController
let calculateUC: CalculateRoyaltiesUseCase
let reportController: GenerateReportController
let presenter = new CSVReportPresenter();

(async () => {
    const connection: Connection = await createConnection();
    createConsumptionUC = new CreateConsumptionUseCase(
        connection.getRepository(UserDB),
        connection.getRepository(ProductDB),
        connection.getRepository(ConsumptionDB),
        connection.getRepository(UsageRecordDB),
        new ConsumptionDBFactory(),
        new UsageRecordDBFactory()
    )
    consumptionController = new CreateConsumptionController(createConsumptionUC);

    calculateUC = new CalculateRoyaltiesUseCase(
        connection.getRepository(ContentSupplierDB),
        connection.getRepository(ProductDB),
        connection.getRepository(UsageRecordDB),
        presenter
    )

    reportController = new GenerateReportController(calculateUC, presenter);

    setServer(reportController, consumptionController)
})();

