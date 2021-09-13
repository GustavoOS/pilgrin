import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";
import { ContentSupplier } from "../../entities/content-supplier";


@Entity()
class ContentSupplierDB implements ContentSupplier {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column("simple-array")
    products: string[];

    reset(func: CallableFunction) {
        this.id = func();
        this.products = [];
    }
}

export {ContentSupplierDB}
