import { request, Request, Response } from "express";
import { CreateConsumptionUseCase } from "../../useCases/create-consumption";

class CreateConsumptionController {
    constructor(private useCase: CreateConsumptionUseCase) { }

    async handle(req: Request, res: Response) {
        console.log("Create Consumption");
        try {
            const { user,
                product,
                start_location,
                end_location } = req.body
            await this.useCase.execute({
                user,
                product,
                start_location,
                end_location
            });
            res.status(201).send();
        } catch (err) {
            console.error(err);
            return res.status(400).json(
                { message: err.message || 'Unexpected error.' }).send();
        }
    }
}

export { CreateConsumptionController }
