import type Car from "./Car";


export default interface Insurance {
    model: string;
    id: number;
    description: string;
    title: string;
    premiumPorcent: number;
    effectiveDate: string;
    expirationDate: string;
    car?: Car[] | null;
}