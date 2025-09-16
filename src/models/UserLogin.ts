export default interface UserLogin {
    id: number;
    name: string;
    username: string;
    password: string;
    photoUrl: string;
    admin?: boolean;
    token: string;
}