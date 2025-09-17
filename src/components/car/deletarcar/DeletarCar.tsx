import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Car from "../../../models/Car";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";
import { Trash, ArrowLeft, Warning, Car as CarIcon } from "@phosphor-icons/react";

function DeletarCar() {
  const navigate = useNavigate();

  const [car, setCar] = useState<Car>({} as Car);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/carro/${id}`, setCar, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "warning");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarCarro() {
    if (!id) return;

    setIsLoading(true);
    try {
      await deletar(`/carro/${id}`, {
        headers: { Authorization: token }
      });

      ToastAlerta("Carro excluído com sucesso!", "success");
      retornar();
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao excluir o carro.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/dashboardcliente");
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

          {/* Informações do Carro */}
          {car.model && (
            <div className="bg-gradient-to-br from-[#e8f4f8] to-white p-6 rounded-xl border-l-4 border-red-500 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <CarIcon size={24} color="#ef4444" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-[#034153] text-lg mb-2">Dados do Veículo</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-[#678391] font-medium">Modelo:</span>
                      <span className="text-[#034153] font-bold text-right sm:text-left">{car.model}</span>
                    </div>
                    {car.licensePlate && (
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="text-[#678391] font-medium">Placa:</span>
                        <span className="text-[#056174] font-mono font-bold text-right sm:text-left">{car.licensePlate}</span>
                      </div>
                    )}
                    {car.price && (
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="text-[#678391] font-medium">Valor:</span>
                        <span className="text-[#034153] font-bold text-right sm:text-left">
                          R$ {car.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}
                    {car.manufacturingYear && (
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="text-[#678391] font-medium">Ano:</span>
                        <span className="text-[#034153] font-bold text-right sm:text-left">
                          {new Date(car.manufacturingYear).getFullYear()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mensagem de Confirmação */}
          <div className="text-center mb-8">
            <p className="text-[#678391] text-lg leading-relaxed">
              Tem certeza que deseja deletar o carro{" "}
              <strong className="text-[#034153]">{car.model || "selecionado"}</strong>?
            </p>
            <p className="text-red-600 text-sm mt-2 font-medium">
              ⚠️ Esta ação removerá permanentemente todas as informações do veículo
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={retornar}
              disabled={isLoading}
              className="flex-1 px-6 py-4 bg-[#96A3AB] hover:bg-[#678391] disabled:bg-gray-300 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Cancelar
            </button>

            <button
              onClick={deletarCarro}
              disabled={isLoading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 disabled:from-red-300 disabled:to-red-300 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              💡 <strong>Dica:</strong> Se você não tem certeza, cancele e revise as informações antes de prosseguir
            </p>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-red-500 text-center">
              <div className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#034153] font-semibold text-lg">Excluindo veículo...</p>
              <p className="text-[#678391] text-sm mt-2">Esta operação pode levar alguns segundos</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeletarCar;