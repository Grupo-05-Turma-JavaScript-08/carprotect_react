import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Insurance from "../../../models/Insurance";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { Warning, ArrowLeft, Trash, ShieldCheck, Percent } from "@phosphor-icons/react";

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
        if (!id) return;
        
        setIsLoading(true);
        try {
            await deletar(`/plano/${id}`, {
                headers: { Authorization: token }
            });
            ToastAlerta("Plano excluído com sucesso!", "success");
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
        <div className="min-h-screen bg-gradient-to-br from-[#f7f9fb] to-[#e8eef3] flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-lg mx-auto">
                
                {/* Card Principal */}
                <div className="bg-white rounded-2xl shadow-xl border-t-4 border-red-500 p-6 sm:p-8">
                    
                    {/* Header com ícone de aviso */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                                <Warning size={32} color="white" weight="fill" />
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#034153] mb-2">Confirmar Exclusão</h1>
                        <p className="text-[#678391]">Esta ação não pode ser desfeita</p>
                    </div>

                    {/* Informações do Seguro */}
                    {insurance.title && (
                        <div className="bg-gradient-to-br from-[#e8f4f8] to-white p-6 rounded-xl border-l-4 border-red-500 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck size={24} color="#ef4444" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-[#034153] text-lg mb-3">Dados do Plano de Seguro</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="text-[#678391] font-medium">Nome do Plano:</span>
                                            <span className="text-[#034153] font-bold text-right sm:text-left">{insurance.title}</span>
                                        </div>
                                        {insurance.description && (
                                            <div className="border-t border-[#76AABF]/20 pt-3 mt-3">
                                                <span className="text-[#678391] font-medium block mb-2">Descrição:</span>
                                                <p className="text-[#056174] leading-relaxed bg-[#e8f4f8] p-3 rounded-lg">
                                                    {insurance.description}
                                                </p>
                                            </div>
                                        )}
                                        {insurance.porcentInsurance && (
                                            <div className="flex justify-between items-center border-t border-[#76AABF]/20 pt-3 mt-3">
                                                <span className="text-[#678391] font-medium flex items-center gap-2">
                                                    <Percent size={16} className="text-[#76AABF]" />
                                                    Prêmio:
                                                </span>
                                                <span className="text-[#034153] font-bold text-lg">
                                                    {insurance.porcentInsurance}%
                                                </span>
                                            </div>
                                        )}
                                        {insurance.car && insurance.car.length > 0 && (
                                            <div className="border-t border-[#76AABF]/20 pt-3 mt-3">
                                                <span className="text-[#678391] font-medium">Carros Vinculados:</span>
                                                <span className="text-[#034153] font-bold ml-2">
                                                    {insurance.car.length} veículo(s)
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Aviso sobre carros vinculados */}
                    {insurance.car && insurance.car.length > 0 && (
                        <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                            <div className="flex items-start gap-3">
                                <Warning size={20} color="#f59e0b" className="flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-orange-800 mb-1">Atenção!</h4>
                                    <p className="text-orange-700 text-sm">
                                        Este plano possui <strong>{insurance.car.length} veículo(s)</strong> vinculado(s). 
                                        Ao excluir este seguro, os carros ficarão sem cobertura.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mensagem de Confirmação */}
                    <div className="text-center mb-8">
                        <p className="text-[#678391] text-lg leading-relaxed mb-3">
                            Tem certeza que deseja excluir o plano{" "}
                            <strong className="text-[#034153]">{insurance.title || "selecionado"}</strong>?
                        </p>
                        <p className="text-red-600 text-sm font-medium">
                            ⚠️ Esta ação removerá permanentemente o plano e todas suas configurações
                        </p>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={retornar}
                            disabled={isLoading}
                            className="flex-1 px-6 py-4 bg-[#96A3AB] hover:bg-[#678391] disabled:bg-gray-300 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:cursor-pointer"
                        >
                            <ArrowLeft size={20} />
                            Cancelar
                        </button>

                        <button
                            onClick={deletarInsurance}
                            disabled={isLoading}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 disabled:from-red-300 disabled:to-red-300 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Excluindo...
                                </> 
                            ) : (
                                <>
                                    <Trash size={20} />
                                    Sim, excluir
                                </>
                            )}
                        </button>
                    </div>

                    {/* Informação adicional */}
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-amber-800 text-sm text-center">
                            💡 <strong>Dica:</strong> Certifique-se de que não há carros dependentes deste plano antes de excluir
                        </p>
                    </div>
                </div>

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-red-500 text-center">
                            <div className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-[#034153] font-semibold text-lg">Excluindo plano de seguro...</p>
                            <p className="text-[#678391] text-sm mt-2">Esta operação pode levar alguns segundos</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DeleteInsurance;