import express from 'express'
import { CreateConsumptionController } from './controllers/createConsumption'
import { GenerateReportController } from './controllers/generateReport'


function setServer(
    reportController: GenerateReportController,
    consumptionController: CreateConsumptionController) {

    const app = express()
    const port = 3000

    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    app.get('/report', (req, res) => reportController.handle(req, res))
    app.post('/consumption', (req, res) => consumptionController.handle(req, res))

    app.listen(port, () => {
        console.log(`Server is up and running on http://localhost:${port}`)
    })
}

export { setServer }


