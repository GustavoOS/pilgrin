import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { User } from "../../entities/user";
import { ConsumptionDB } from "./ConsumptionDB";

@Entity()
export class UserDB implements User{

    @PrimaryColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column("simple-array")
    consumptions: string[]

    reset(func: CallableFunction) {
        this.id = func();
        this.consumptions = []
    }

}
