import {Column, Entity, PrimaryColumn} from "typeorm";
import { UsageRecord } from "../../entities/usage-record";

@Entity()
export class UsageRecordDB implements UsageRecord{
    @PrimaryColumn()
    id: string;

    @Column()
    user: string;

    @Column()
    accumulated: number;

    @Column()
    product: string;

    add(consumption: number): void {
        this.accumulated += consumption;
    }

    reset(func: CallableFunction): void {
        this.id = func();
        this.accumulated = 0;
    }
}
