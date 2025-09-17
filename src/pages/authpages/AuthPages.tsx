import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UserLogin from "../../models/UserLogin";
import type User from "../../models/User";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const { user, handleLogin } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [confirmarSenha, setConfirmarSenha] = useState<string>('');

    const [usuario, setUsuario] = useState<User>({
        id: 0,
        name: '',
        username: '',
        password: '',
        photoUrl: ''

    });

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar();
        }
    }, [usuario]);

    function retornar() {
        navigate('/');
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value);
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (confirmarSenha === usuario.password && usuario.password.length >= 8) {

            setIsLoading(true);

            try {
                await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario);
                ToastAlerta('Usuario cadastrado com sucesso!', 'success');
            } catch (error) {
                ToastAlerta('Erro ao cadastrar usuario!', 'error');
            }
        } else {
            ToastAlerta('Dados inconsistentes no cadastro! Tente novamente', 'error');
            setUsuario({ ...usuario, password: '' });
            setConfirmarSenha('');
        }
        setIsLoading(false);
    }


    const [userLogin, setUserLogin] = useState<UserLogin>(
        {} as UserLogin
    )

    useEffect(() => {
        if (user.token !== "") {
            if (user.admin === true) {
                navigate("/dashboardadmin");
            } else {
                navigate("/dashboardcliente");
            }
        }
    }, [user, navigate]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        });
    }

    function atualizarEstadoCadastro(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(userLogin);
    }



    return (
        <>

            <div className="grid grid-cols-2 h-screen bg-gradient-to-l from-[#056174] to-[#153441]">

                {/* Card centralizado na primeira coluna */}
                <div className="flex items-center justify-center">
                    <div className="w-[400px] bg-gray-300 shadow-lg rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-center mb-10">
                            {isLogin ? "Login" : "Cadastro"}
                        </h2>

                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.form
                                    key="login"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col space-y-4"
                                    onSubmit={login}
                                >

                                    <label htmlFor="username">Usuário</label>
                                    <input
                                        type="text"
                                        placeholder="Digite seu email"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-200"
                                        name="username"
                                        id="username"
                                        value={userLogin.username}
                                        onChange={atualizarEstado}
                                    />
                                    <label htmlFor="password">Senha</label>
                                    <input
                                        type="text"
                                        placeholder="Digite sua senha"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-200"
                                        name="password"
                                        id="password"
                                        value={userLogin.password}
                                        onChange={atualizarEstado}
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-[#056174] text-white py-2 rounded-lg hover:bg-[#028998] cursor-pointer"
                                    >
                                        Entrar
                                    </button>

                                </motion.form>
                            ) : (
                                <motion.form
                                    key="cadastro"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col space-y-2"
                                    onSubmit={cadastrarNovoUsuario}
                                >
                                    
                                <label htmlFor="name">Nome:</label>
                                    <input
                                        type="text"
                                        placeholder="Digite seu nome"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                                        id="name"
                                        name="name"
                                        value={usuario.name}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstadoCadastro(e)}
                                    />
                                    <label htmlFor="username">Usuário</label>
                                    <input
                                        type="text"
                                        placeholder="Digite seu melhor email"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                                        id="username"
                                        name="username"
                                        value={usuario.username}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstadoCadastro(e)}
                                    />
                                    <label htmlFor="photoUrl">Foto de Perfil</label>
                                    <input
                                        type="text"
                                        placeholder="coloque o link da sua foto de perfil"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                                        id="photoUrl"
                                        name="photoUrl"
                                        value={usuario.photoUrl}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstadoCadastro(e)}
                                    />
                                    <label htmlFor="password">Senha</label>
                                    <input
                                        type="password"
                                        placeholder="Digite sua senha"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                                        id="password"
                                        name="password"
                                        value={usuario.password}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstadoCadastro(e)}
                                    />

                                    <label htmlFor="confirmarSenha">Confirme sua Senha</label>
                                    <input
                                        type="password"
                                        placeholder="Confirme sua Senha"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                                        id="confirmarSenha"
                                        name="confirmarSenha"
                                        value={confirmarSenha}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-[#056174] text-white py-2 rounded-lg hover:bg-[#028998] transition cursor-pointer"
                                    >
                                        Cadastrar
                                    </button>

                                </motion.form>
                            )}
                        </AnimatePresence>

                        {/* Alternar login/cadastro */}
                        <p className="text-center mt-6 text-sm font-bold">
                            {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-[#056174] font-bold hover:underline"
                            >
                                {isLogin ? "Cadastre-se" : "Entrar"}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Imagem na segunda coluna */}
                <div className="flex items-center justify-center">
                     <img src="https://i.ibb.co/MLCDmSL/raw.png" alt=""
                                className="flex items-center justify-center mr-30" />
                </div>
            </div>
        </>
    );
}
