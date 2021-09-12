import { User } from "../entities/user";

interface UserGateway {
    save(user: User): Promise<any>
    findOne(id: string): Promise<User>
    delete(user: User): Promise<any>
    find(criteria: object): Promise<User[]>
}

export { UserGateway }