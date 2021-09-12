import { Entity, Column, PrimaryColumn } from "typeorm";
import { User } from "../../entities/user";

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
