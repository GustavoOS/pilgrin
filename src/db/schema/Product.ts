import { Entity, PrimaryColumn, ManyToOne, Column } from "typeorm";
import { Product } from "../../entities/product";
import { ContentSupplierDB } from "./ContentSupplier";


@Entity()
export class ProductDB implements Product {

    @PrimaryColumn()
    id: string;

    @ManyToOne(() => ContentSupplierDB, supplier => supplier.products)
    supplier: ContentSupplierDB

    @Column()
    title: string

    @Column()
    size: number

    @Column()
    price: number

}
