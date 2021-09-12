import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import { Consumption } from "../../entities/consumption";
import { ProductDB } from "./Product";
import { UserDB } from "./User";

@Entity()
export class ConsumptionDB implements Consumption {

    @PrimaryColumn()
    id: string

    @Column()
    start_location: number

    @Column()
    end_location: number

    @ManyToOne(() => ProductDB, product => product.consumptions, { cascade: true })
    product: ProductDB

    @ManyToOne(() => UserDB, user => user.consumptions, { cascade: true })
    user: UserDB;

    getRange(): number {
        return Math.abs(this.end_location - this.start_location);
    }
}
