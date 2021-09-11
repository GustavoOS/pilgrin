import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { User } from "../../entities/user";

@Entity()
export class UserDB implements User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
