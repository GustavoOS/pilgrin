import { Entity, PrimaryColumn, ManyToOne, Column, OneToMany } from "typeorm";
import { Product } from "../../entities/product";
import { ConsumptionDB } from "./ConsumptionDB";
import { ContentSupplierDB } from "./ContentSupplier";


@Entity()
export class ProductDB implements Product {

    @PrimaryColumn()
    id: string;

    @Column({nullable: true})
    supplier: string

    @Column()
    title: string

    @Column()
    size: number

    @Column()
    price: number

    @Column("simple-array")
    consumptions: string[]

    reset(func: CallableFunction) {
        this.id = func();
        this.consumptions = [];
    }
}
