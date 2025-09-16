import type Car from "./Car";

export default interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    photoUrl: string;
    admin?: boolean;
    car?: Car[] | null
}