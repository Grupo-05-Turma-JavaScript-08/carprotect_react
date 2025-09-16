
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Insurance from "../../../models/Insurence";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarInsurance() {
  const navigate = useNavigate();

  const [insurance, setInsurance] = useState<Insurance>({} as Insurance);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {

    await buscar(`/insurance/${id}`, setInsurance);

  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarInsurance() {
    setIsLoading(true);
    try {
      await deletar(`/insurance/${id}`);

      ToastAlerta("Plano excluido com sucesso!", "success");
      retornar();
    } catch (error: any) {

      ToastAlerta("Erro ao excluir o plano.", "error");

    }
    setIsLoading(false);
  }

  function retornar() {
    navigate("/insurance");
  }

  return (
    <section className="font-bold flex flex-col items-center justify-center min-h-screen p-6 text-white
    ">
      <div className="">
        <div className="max-w-md mx-auto mt-16 p-6  rounded-lg shadow-md font-sans text-center bg-[#0e6c8b]/30">
          <h2 className="text-2xl font-semibold  mb-6">Confirmar Exclusão</h2>
          <p className="text-lg mb-8">
            Tem certeza que deseja deletar o Plano de Seguro?{" "}
            <strong>{insurance.model || "?"}</strong>?
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={deletarInsurance}
              disabled={isLoading}
              className={`px-6 py-2 rounded-md font-bold text-white ${isLoading ? "bg-red-300 cursor-not-allowed" : "bg-red-800 hover:bg-red-500"} transition-colors duration-200`}
            >
              {isLoading ? "Deletando..." : "Sim, deletar"}
            </button>

            <button
              onClick={retornar}
              disabled={isLoading}
              className={`px-6 py-2 rounded-md font-bold text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"} transition-colors duration-200`}
            >
              Não, cancelar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeletarInsurance;