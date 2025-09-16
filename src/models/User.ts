
export default interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    photoUrl: string;
    car?: Car[] | null
}