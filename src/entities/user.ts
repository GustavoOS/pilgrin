import { Consumption } from "./consumption";

interface User {
    id: string,
    firstName: string;
    lastName: string;
    age: number;
    consumptions: Consumption[];
}

export { User }
