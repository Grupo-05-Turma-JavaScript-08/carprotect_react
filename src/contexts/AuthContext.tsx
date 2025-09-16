import { createContext, useState, type ReactNode } from "react";
import type UserLogin from "../models/UserLogin";
import { ToastAlerta } from "../utils/ToastAlerta";
import { login } from "../services/Service";



interface AuthContextProps {
    user: UserLogin;
    handleLogout(): void;
    handleLogin(userLogin: UserLogin): void;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({children} : AuthProviderProps) {

    const [user, setUser] = useState<UserLogin>({
        id: 0,
        name: '',
        username: '',
        password: '',
        photoUrl: '',
        admin: false,
        token: ''
    });

    const [isLoading, setIsLoading] = useState(true);

    async function handleLogin(userLogin:UserLogin) {
        setIsLoading(true);
        try{
            await login('/usuarios/logar', userLogin, setUser);
            ToastAlerta('Login realizado com sucesso', 'success');
        } catch (error) {
            ToastAlerta('Dados do usuário inválidos', 'error');
        }
        setIsLoading(false);
    }

    function handleLogout() {
        setUser({
            id: 0,
            name: '',
            username: '',
            password: '',
            photoUrl: '',
            admin: false,
            token: ''
        });
    }

    return (
        <AuthContext.Provider value={{user, handleLogin, handleLogout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )

}