import type Insurance from "./Insurance";
import type User from "./User";

export default interface Car {
    
    id: number,
    model: string,
    licensePlate: string,
    price: number,
    description: string,
    manufacturingYear: Date,
    premiumAmount: number,
    insuranceStatus: string,
    user: User | null
    insurance: Insurance | null

}