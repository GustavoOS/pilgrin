import { ContentSupplier } from "../entities/content-supplier";

interface SupplierGateway {
    save(user: ContentSupplier): Promise<any>
    findOne(id: string): Promise<ContentSupplier>
    delete(user: ContentSupplier): Promise<any>
    find(criteria: object): Promise<ContentSupplier[]>
}

export { SupplierGateway }