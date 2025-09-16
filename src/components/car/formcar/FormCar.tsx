import { useState, type ChangeEvent, type FormEvent, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Car from "../../../models/Car";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Insurance from "../../../models/Insurance";
import { AuthContext } from "../../../contexts/AuthContext";

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

    //   useEffect(() => {
    //     if (token === '') {
    //         ToastAlerta('Voce precisa estar logado', 'warning');
    //         navigate('/');
    //     }
    // }, [token]);


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


  function atualizarEstado(e: ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) {
    setCar({
        ...car,
        [e.target.name]: e.target.value,
        insurance: insurance,
        user: user
    })
  }

    function retornar() {
        navigate("/carros");
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
            !car.manufacturingYear ||
            !car.premiumAmount ||
            !car.insuranceStatus
        ) {
            ToastAlerta("Preencha todos os campos obrigatórios!", "warn");
            setIsLoading(false);
            return;
        }

        try {
            if (id !== undefined) {
                await atualizar(`car`, car, setCar, { headers: { Authorization: token } });
                ToastAlerta("Carro atualizado com sucesso!", "success");
            } else {
                await cadastrar(`car`, car, setCar, { headers: { Authorization: token } });
                ToastAlerta("Carro cadastrado com sucesso!", "success");
            }

            retornar();
        } catch (error: any) {
            ToastAlerta("Erro ao salvar carro.", "error");
        }

        setIsLoading(false);
    }


  return (

    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={salvarCar}
        className="p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">
          {id ? "Editar Carro" : "Cadastrar Carro"}
        </h2>

        <input
          type="text"
          name="model"
          value={car.model || ""}
          onChange={atualizarEstado}
          placeholder="Modelo"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="licensePlate"
          value={car.licensePlate || ""}
          onChange={atualizarEstado}
          placeholder="Placa"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          value={car.price || ""}
          onChange={atualizarEstado}
          placeholder="Preço"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={car.description || ""}
          onChange={atualizarEstado}
          placeholder="Descrição"
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="manufacturingYear"
          value={
            car.manufacturingYear
              ? new Date(car.manufacturingYear).toISOString().split("T")[0]
              : ""
          }
          onChange={atualizarEstado}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="premiumAmount"
          value={car.premiumAmount || ""}
          onChange={atualizarEstado}
          placeholder="Valor do Prêmio"
          className="w-full border p-2 rounded"
        />

        <select
          name="insuranceStatus"
          value={car.insuranceStatus || ""}
          onChange={atualizarEstado}
          className="w-full border p-2 rounded"
        >
          <option value="">Selecione o status</option>
          <option value="normal">Normal</option>
          <option value="depreciado">Depreciado</option>
        </select>

        <div className="flex justify-between gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 rounded font-bold ${
              isLoading ? " " : " "
            }`}
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </button>

          <button
            type="button"
            onClick={retornar}
            className="px-6 py-2 rounded font-bold"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormCar;
