import {Column, Entity, PrimaryColumn} from "typeorm";
import { Consumption } from "../../entities/consumption";

@Entity()
export class ConsumptionDB implements Consumption {

    @PrimaryColumn()
    id: string

    @Column()
    start_location: number

    @Column()
    end_location: number

    @Column()
    product: string

    @Column()
    user: string;

    getRange(): number {
        return Math.abs(this.end_location - this.start_location);
    }

    reset(func){
        this.id = func();
    }
}
