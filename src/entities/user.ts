import { Resetable } from "./resetable";

interface User extends Resetable {
    id: string,
    firstName: string;
    lastName: string;
    age: number;
    consumptions: string[];
    addConsumption(id:string):void
}

export { User }
