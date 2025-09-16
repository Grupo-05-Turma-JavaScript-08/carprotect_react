import { useState, type ChangeEvent, type FormEvent, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Car from "../../../models/Car";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Insurance from "../../../models/Insurance";
import { AuthContext } from "../../../contexts/AuthContext";
import { Calendar, Cpu, CurrencyDollarSimple, Hash, Shield, Tag } from "phosphor-react";
import { CarIcon } from "@phosphor-icons/react";

function FormCar() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [car, setCar] = useState<Car>({} as Car);
  const [insurances, setInsurances] = useState<Insurance[]>([]);

  const [insurance, setInsurance] = useState<Insurance>({ id: 0, description: '', title: '', porcentInsurance: 0, car: null });

  const { id } = useParams<{ id: string }>();
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function buscarCarId(id: string) {
    try {
      await buscar(`/carro/${id}`, setCar, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    }
  }

  async function burcarInsurancePorId(id: string) {
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

  async function buscarInsurances() {
    try {
      await buscar('/plano', setInsurances, {
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
      ToastAlerta('Voce precisa estar logado', 'warning');
      navigate('/');
    }
  }, [token]);


  useEffect(() => {
    buscarInsurances();
    if (id !== undefined) {
      buscarCarId(id);
    }
  }, [id]);

  useEffect(() => {
    setCar({
      ...car,
      insurance: insurance
    })
  })


  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setCar({
      ...car,
      [e.target.name]: e.target.value,
      insurance: insurance,
      user: user
    })
  }

  function retornar() {
    navigate("/dashboard");
  }

  async function salvarCar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // validação simples
    if (
      !car.model ||
      !car.licensePlate ||
      !car.price ||
      !car.description ||
      !car.manufacturingYear
    
    
    ) {
      ToastAlerta("Preencha todos os campos obrigatórios!", "warn");
      setIsLoading(false);
      return;
    }

    try {
      if (id !== undefined) {
        await atualizar(`carro`, car, setCar, { headers: { Authorization: token } });
        ToastAlerta("Carro atualizado com sucesso!", "success");
      } else {
        await cadastrar(`carro`, car, setCar, { headers: { Authorization: token } });
        ToastAlerta("Carro cadastrado com sucesso!", "success");
      }

      retornar();
    } catch (error: any) {
      ToastAlerta("Erro ao salvar carro.", "error");
    }

    setIsLoading(false);
  }


  const carregandoSeguro = insurance.title === '';

  return (

    <div className="flex items-center justify-center  bg-gray-900 flex-col">
      <div className="text-center mb-8 pb-6 border-b border-slate-700/30">
                            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
                                {id === undefined ? "Cadastrar Eletrônico" : "Editar Eletrônico"}
                            </h1>
                            <p className="text-slate-400">Preencha os dados do dispositivo eletrônico</p>
                        </div>
      <form className="mx-auto w-full space-y-8" onSubmit={salvarCar}>

        {/* Seção: Informações do Dispositivo */}
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
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                value={car.model}
                onChange={atualizarEstado}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <Tag size={16} className="text-blue-400" />
                descrição do carro *
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Ex: Carro bom pra vida toda...  "
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                value={car.description}
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
                placeholder="Digite o número da Placa"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                value={car.licensePlate}
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
              <label htmlFor="insuredValue" className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <CurrencyDollarSimple size={16} className="text-emerald-400" />
                Preço do Veiculo *
              </label>
             <input
                type="text"
                id="price"
                name="price"
                placeholder="Digite o modelo do dispositivo"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                value={car.price}
                onChange={atualizarEstado}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="purchaseDate" className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <Calendar size={16} className="text-emerald-400" />
                Data de Compra *
              </label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                required
                value={car.manufacturingYear}
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
            <label htmlFor="tema" className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Shield size={16} className="text-purple-400" />
              Selecione o Plano de Seguro *
            </label>
            <select
              name="tema"
              id="tema"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
              onChange={(e) => burcarInsurancePorId(e.currentTarget.value)}
            >
              <option value="" >Selecione um Plano</option>
              {insurances.map((tema) => (
                <option key={tema.id} value={tema.id} className="bg-slate-800">
                  {tema.title}
                </option>
              ))}
            </select>
          </div>

          {/* Preview do Seguro Selecionado */}
          {insurance.title && (
            <div className="mt-4 p-4 bg-purple-900/20 border border-purple-700/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-purple-400" />
                <span className="text-purple-300 font-medium">{insurance.title}</span>
              </div>
              <p className="text-slate-400 text-sm">{insurance.description}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-purple-300 text-sm">Prêmio: {insurance.porcentInsurance}%</p>
               
              </div>
            </div>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-700/30">
          <button
            type="button"
            onClick={retornar}
            className="flex-1 px-6 py-3 bg-slate-600/50 hover:bg-slate-600/70 border border-slate-500/50 text-slate-300 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Cancelar
          </button>

          <button
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            type="submit"
            disabled={carregandoSeguro}
          >
            {isLoading ? (
              <>
                
                <span>Processando...</span>
              </>
            ) : (
              <span>{id === undefined ? "Cadastrar Eletrônico" : "Atualizar Eletrônico"}</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

export default FormCar;
