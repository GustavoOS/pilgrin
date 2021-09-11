import {Entity, Column, PrimaryColumn} from "typeorm";
import { User } from "../../entities/user";

@Entity()
export class UserDB implements User {

    @PrimaryColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
