import { Entity, PrimaryColumn, ManyToOne, Column, OneToMany } from "typeorm";
import { Product } from "../../entities/product";
import { ConsumptionDB } from "./ConsumptionDB";
import { ContentSupplierDB } from "./ContentSupplier";


@Entity()
export class ProductDB implements Product {

    @PrimaryColumn()
    id: string;

    @ManyToOne(() => ContentSupplierDB, supplier => supplier.products, { onDelete: 'CASCADE' })
    supplier: ContentSupplierDB

    @Column()
    title: string

    @Column()
    size: number

    @Column()
    price: number

    @OneToMany(() => ConsumptionDB, consumption => consumption.product)
    consumptions: ConsumptionDB[]
}
