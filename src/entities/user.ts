import { Resetable } from "./resetable";

interface User extends Resetable {
    id: string,
    firstName: string;
    lastName: string;
    age: number;
    consumptions: string[];
}

export { User }
