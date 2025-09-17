import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Insurance from "../../../models/Insurance";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";


function DeleteInsurance() {

    const navigate = useNavigate();

    const [insurance, setInsurance] = useState<Insurance>({} as Insurance);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { user, handleLogout } = useContext(AuthContext);
    const token = user.token

    const { id } = useParams<{ id: string }>();
    async function buscarPorId(id: string) {
        try {
            await buscar(`/plano/${id}`, setInsurance, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Sua sessão expirou!', 'info');
            navigate('/');
        }
    }, [token]);


    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);


    async function deletarInsurance() {
        setIsLoading(true);
        try {
            await deletar(`/plano/${id}`, {
                headers: { Authorization: token }
            });
            ToastAlerta("Plano excluido com sucesso!", "success");
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                ToastAlerta("Erro ao excluir o plano.", "error");
            }
        }
        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate("/dashboardadmin");
    }


    return (
        <section className="font-bold flex flex-col items-center justify-center min-h-screen p-6 text-white
    ">
            <div className="">
                <div className="max-w-md mx-auto mt-16 p-6  rounded-lg shadow-md font-sans text-center bg-[#0e6c8b]/30">
                    <h2 className="text-2xl font-semibold  mb-6">Confirmar Exclusão</h2>
                    <p className="text-lg mb-8">
                        Tem certeza que deseja deletar o seguro{" "}
                        <strong>{insurance.title || "?"}</strong>?
                    </p>

                    <div className="flex justify-center gap-6">
                        <button
                            onClick={deletarInsurance}
                            disabled={isLoading}
                            className={`px-6 py-2 rounded-md font-bold text-white ${isLoading ? "bg-red-300 cursor-not-allowed" : "bg-red-800 hover:bg-red-500"
                                } transition-colors duration-200`}
                        >
                            {isLoading ? "Deletando..." : "Sim, deletar"}
                        </button>

                        <button
                            onClick={retornar}
                            disabled={isLoading}
                            className={`px-6 py-2 rounded-md font-bold text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"
                                } transition-colors duration-200`}
                        >
                            Não, cancelar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DeleteInsurance