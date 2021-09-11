import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";
import { ContentSupplier } from "../../entities/content-supplier";
import { ProductDB } from "./Product";


@Entity()
export class ContentSupplierDB implements ContentSupplier {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => ProductDB, product => product.supplier,
        { cascade: true})
    products: ProductDB[];

    addProduct(product: ProductDB) {
        if (!this.products)
            this.products = [];
        this.products.push(product);
    }
}
