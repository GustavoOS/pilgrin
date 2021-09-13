import { Request, Response } from "express";
import { CalculateRoyaltiesUseCase } from "../../useCases/calculate-royalties";
import { CSVReportPresenter } from "../presenters/report";

class GenerateReportController {
    constructor(
        private useCase: CalculateRoyaltiesUseCase,
        private presenter: CSVReportPresenter) { }

    public async handle(req: Request, res: Response) {
        console.log("Generate Report")
        try {
            await this.useCase.execute();
            const path = this.presenter.saveCSV()
            res.download(path);
        } catch (err) {
            console.error(err);
            return res.status(400).json(
                { message: err.message || 'Unexpected error.' }).send();
        }
    }
}

export { GenerateReportController }
