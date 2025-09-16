import type Car from "./Car"


export default interface Insurance {
    id: number
    description: string
    title: string
    porcentInsurance: number
    car: Car[] | null
}