import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import { ContentSupplier } from "../../entities/content-supplier";
import { ProductDB } from "./Product";


@Entity()
export class ContentSupplierDB implements ContentSupplier {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => ProductDB, product => product.supplier)
    products: ProductDB[];
    
}
