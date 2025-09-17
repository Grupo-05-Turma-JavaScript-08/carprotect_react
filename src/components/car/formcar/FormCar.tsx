import { useState, type ChangeEvent, type FormEvent, useEffect, useContext } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import type Car from "../../../models/Car";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Insurance from "../../../models/Insurance";
import { AuthContext } from "../../../contexts/AuthContext";
import { Calendar, CurrencyDollarSimple, Hash, Shield, Tag, ArrowLeft, FloppyDisk, Car as CarIcon } from "@phosphor-icons/react";

function FormCar() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [car, setCar] = useState<Car>({} as Car);
  const [insurances, setInsurances] = useState<Insurance[]>([]);

  const { id } = useParams<{ id: string }>();
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function buscarCarId(id: string) {
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

  async function buscarInsurances() {
    try {
      await buscar("/plano", setInsurances, {
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
      ToastAlerta("Voce precisa estar logado", "warning");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarInsurances();
    if (id !== undefined) {
      buscarCarId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setCar({
      ...car,
      [name]: name === "price" ? Number(value) : value,
      user: user
    });
  }

  function retornar() {
    navigate("/dashboardcliente");
  }

  async function salvarCar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`carro`, car, setCar, { headers: { Authorization: token } });
        ToastAlerta("Carro atualizado com sucesso!", "success");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar carro.", "error");
        }
      }
    } else {
      try {
        await cadastrar(`carro`, car, setCar, { headers: { Authorization: token } });
        ToastAlerta("Carro cadastrado com sucesso!", "success");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar carro.", "error");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f9fb] to-[#e8eef3] p-4 sm:p-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border-t-4 border-[#034153] p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-[#76AABF]/30">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#034153] to-[#056174] flex items-center justify-center">
                <CarIcon size={32} color="white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#034153] mb-2">
              {id === undefined ? "Cadastrar Carro" : "Editar Carro"}
            </h1>
            <p className="text-[#678391] text-lg">Preencha os dados do veículo para continuar</p>
          </div>

          <form className="space-y-8" onSubmit={salvarCar}>
            
            {/* Seção: Informações do Carro */}
            <div className="bg-gradient-to-br from-[#e8f4f8] to-white p-6 rounded-xl border-l-4 border-[#034153]">
              <h3 className="text-xl font-bold text-[#034153] flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#76AABF] flex items-center justify-center">
                  <CarIcon size={20} color="#034153" />
                </div>
                Informações do Carro
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="model" className="flex items-center gap-2 text-sm font-semibold text-[#034153]">
                    <Tag size={16} className="text-[#76AABF]" />
                    Modelo do Carro *
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    placeholder="Ex: Fiesta, Uno, Civic..."
                    className="w-full px-4 py-3 bg-white border-2 border-[#76AABF]/30 rounded-xl text-[#678391] placeholder-[#96A3AB] focus:border-[#034153] focus:outline-none transition-colors"
                    value={car.model || ""}
                    onChange={atualizarEstado}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="licensePlate" className="flex items-center gap-2 text-sm font-semibold text-[#034153]">
                    <Hash size={16} className="text-[#76AABF]" />
                    Placa do Veículo *
                  </label>
                  <input
                    type="text"
                    id="licensePlate"
                    name="licensePlate"
                    placeholder="ABC-1234"
                    className="w-full px-4 py-3 bg-white border-2 border-[#76AABF]/30 rounded-xl text-[#678391] placeholder-[#96A3AB] focus:border-[#034153] focus:outline-none transition-colors font-mono"
                    value={car.licensePlate || ""}
                    onChange={atualizarEstado}
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-[#034153]">
                    <Tag size={16} className="text-[#76AABF]" />
                    Descrição do Carro *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Descreva as características do veículo..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white border-2 border-[#76AABF]/30 rounded-xl text-[#678391] placeholder-[#96A3AB] focus:border-[#034153] focus:outline-none transition-colors resize-vertical"
                    value={car.description || ""}
                    onChange={atualizarEstado}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Seção: Informações Financeiras */}
            <div className="bg-gradient-to-br from-[#e8f4f8] to-white p-6 rounded-xl border-l-4 border-[#056174]">
              <h3 className="text-xl font-bold text-[#056174] flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#76AABF] flex items-center justify-center">
                  <CurrencyDollarSimple size={20} color="#056174" />
                </div>
                Informações Financeiras
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="price" className="flex items-center gap-2 text-sm font-semibold text-[#056174]">
                    <CurrencyDollarSimple size={16} className="text-[#76AABF]" />
                    Valor do Veículo *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="50000"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-white border-2 border-[#76AABF]/30 rounded-xl text-[#678391] placeholder-[#96A3AB] focus:border-[#056174] focus:outline-none transition-colors"
                    value={car.price || ""}
                    onChange={atualizarEstado}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="manufacturingYear" className="flex items-center gap-2 text-sm font-semibold text-[#056174]">
                    <Calendar size={16} className="text-[#76AABF]" />
                    Ano de Fabricação *
                  </label>
                  <input
                    type="date"
                    id="manufacturingYear"
                    name="manufacturingYear"
                    className="w-full px-4 py-3 bg-white border-2 border-[#76AABF]/30 rounded-xl text-[#678391] focus:border-[#056174] focus:outline-none transition-colors"
                    value={car.manufacturingYear || ""}
                    onChange={atualizarEstado}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Seção: Seguro */}
            <div className="bg-gradient-to-br from-[#e8f4f8] to-white p-6 rounded-xl border-l-4 border-[#034153]">
              <h3 className="text-xl font-bold text-[#034153] flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#76AABF] flex items-center justify-center">
                  <Shield size={20} color="#034153" />
                </div>
                Plano de Seguro
              </h3>

              <div className="space-y-3">
                <label htmlFor="insuranceId" className="flex items-center gap-2 text-sm font-semibold text-[#034153]">
                  <Shield size={16} className="text-[#76AABF]" />
                  Selecione o Plano de Seguro *
                </label>
                <select
                  id="insuranceId"
                  className="w-full px-4 py-3 bg-white border-2 border-[#76AABF]/30 rounded-xl text-[#678391] focus:border-[#034153] focus:outline-none transition-colors"
                  onChange={(e) =>
                    setCar({
                      ...car,
                      insurance: { id: Number(e.target.value) }
                    })
                  }
                  value={car.insurance?.id || ""}
                  required
                >
                  <option value="">Escolha um plano de seguro</option>
                  {insurances.map((seguro) => (
                    <option key={seguro.id} value={seguro.id}>
                      {seguro.title} - {seguro.porcentInsurance}% de prêmio
                    </option>
                  ))}
                </select>
                
                {insurances.length === 0 && (
                  <p className="text-[#678391] text-sm italic">
                    Carregando planos de seguro...
                  </p>
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[#76AABF]/30">
              <button
                type="button"
                onClick={retornar}
                className="flex-1 px-6 py-4 bg-[#96A3AB] hover:bg-[#678391] text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 hover:cursor-pointer"
              >
                <ArrowLeft size={20} />
                Cancelar
              </button>

              <button
                className="flex-1 px-6 py-4 bg-gradient-to-r from-[#034153] to-[#056174] hover:from-[#056174] hover:to-[#034153] text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:cursor-pointer"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <FloppyDisk size={20} />
                    {id === undefined ? "Cadastrar Carro" : "Atualizar Carro"}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#034153] text-center">
                <div className="w-16 h-16 border-4 border-[#76AABF] border-t-[#034153] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#034153] font-semibold text-lg">
                  {id === undefined ? "Cadastrando carro..." : "Atualizando carro..."}
                </p>
                <p className="text-[#678391] text-sm mt-2">Aguarde um momento</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormCar;