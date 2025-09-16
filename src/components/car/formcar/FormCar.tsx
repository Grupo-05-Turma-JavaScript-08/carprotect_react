import { useState, type ChangeEvent, type FormEvent, useEffect, useContext } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import type Car from "../../../models/Car";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Insurance from "../../../models/Insurance";
import { AuthContext } from "../../../contexts/AuthContext";
import { Calendar, CurrencyDollarSimple, Hash, Shield, Tag } from "phosphor-react";
import { CarIcon } from "@phosphor-icons/react";

function FormCar() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [car, setCar] = useState<Car>({} as Car);
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [insurance, setInsurance] = useState<Insurance | null>(null);

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

  // Atualiza insurance no car sempre que mudar
  useEffect(() => {
    if (insurance) {
      setCar((prev) => ({
        ...prev,
        insurance: { id: insurance.id }
      }));
    }
  }, [insurance]);

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

    console.log("Payload enviado:", car); // DEBUG: confira antes de enviar

    if (id !== undefined) {
      try {
        await atualizar(`carro`, car, setCar, { headers: { Authorization: token } });
        ToastAlerta("Carro atualizado com sucesso!", "success");
        retornar();
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
         retornar();
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

  const carregandoSeguro = !car.insurance?.id;

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl shadow-2xl mx-10 p-8">
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center justify-center bg-gray-900 flex-col p-6 rounded-lg">
          <div className="text-center mb-8 pb-6 border-b border-slate-700/30">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
              {id === undefined ? "Cadastrar Carro" : "Editar Carro"}
            </h1>
            <p className="text-slate-400">Preencha os dados do veículo</p>
          </div>

          <form className="mx-auto w-full space-y-8" onSubmit={salvarCar}>
            {/* Seção: Informações do Carro */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2 pb-2 border-b border-slate-700/50">
                <CarIcon size={20} className="text-blue-400" />
                Informações do Carro
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="model" className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Tag size={16} className="text-blue-400" />
                    Modelo do Carro *
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    placeholder="Ex: Fiesta, Uno..."
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white"
                    value={car.model || ""}
                    onChange={atualizarEstado}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Tag size={16} className="text-blue-400" />
                    Descrição do carro *
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Ex: Carro bem conservado..."
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white"
                    value={car.description || ""}
                    onChange={atualizarEstado}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="licensePlate" className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Hash size={16} className="text-blue-400" />
                    Número da Placa *
                  </label>
                  <input
                    type="text"
                    id="licensePlate"
                    name="licensePlate"
                    placeholder="Digite o número da placa"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white"
                    value={car.licensePlate || ""}
                    onChange={atualizarEstado}
                  />
                </div>
              </div>
            </div>

            {/* Seção: Informações Financeiras */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2 pb-2 border-b border-slate-700/50">
                <CurrencyDollarSimple size={20} className="text-emerald-400" />
                Informações Financeiras
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="price" className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <CurrencyDollarSimple size={16} className="text-emerald-400" />
                    Preço do Veículo *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Digite o valor do veículo"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white"
                    value={car.price || ""}
                    onChange={atualizarEstado}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="manufacturingYear" className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Calendar size={16} className="text-emerald-400" />
                    Ano de Fabricação *
                  </label>
                  <input
                    type="date"
                    id="manufacturingYear"
                    name="manufacturingYear"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white"
                    value={car.manufacturingYear || ""}
                    onChange={atualizarEstado}
                  />
                </div>
              </div>
            </div>

            {/* Seção: Seguro */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2 pb-2 border-b border-slate-700/50">
                <Shield size={20} className="text-purple-400" />
                Plano de Seguro
              </h3>

              <div className="space-y-2">
                <label htmlFor="insuranceId" className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Shield size={16} className="text-purple-400" />
                  Selecione o Plano de Seguro *
                </label>
                <select
                  id="insuranceId"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white"
                  onChange={(e) =>
                    setCar({
                      ...car,
                      insurance: { id: Number(e.target.value) }
                    })
                  }
                >
                  <option value="">Selecione um Plano</option>
                  {insurances.map((seguro) => (
                    <option key={seguro.id} value={seguro.id}>
                      {seguro.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-700/30">
              <button
                type="button"
                onClick={retornar}
                className="flex-1 px-6 py-3 bg-slate-600/50 hover:bg-slate-600/70 text-slate-300 rounded-xl font-medium transition-all"
              >
                Cancelar
              </button>

              <button
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all"
                type="submit"
                disabled={carregandoSeguro}
              >
                {isLoading ? "Processando..." : id === undefined ? "Cadastrar Carro" : "Atualizar Carro"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormCar;
