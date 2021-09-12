import { UsageRecord } from "../entities/usage-record";



interface UsageRecordGateway {
    save(record: UsageRecord): Promise<any>
    findOne(criteria: object): Promise<UsageRecord>
    delete(record: UsageRecord): Promise<any>,
    find(criteria: object): Promise<UsageRecord[]>
}

export { UsageRecordGateway }
