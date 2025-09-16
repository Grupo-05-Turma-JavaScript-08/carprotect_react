import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Car from "../../../models/Car";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";

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
      navigate("/dashboard");
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
    navigate("/dashboard");
  }

  return (
    <section className="font-bold flex flex-col items-center justify-center min-h-screen p-6 text-white">
      <div>
        <div className="max-w-md mx-auto mt-16 p-6 rounded-lg shadow-md font-sans text-center bg-[#0e6c8b]/30">
          <h2 className="text-2xl font-semibold mb-6">Confirmar Exclusão</h2>
          <p className="text-lg mb-8">
            Tem certeza que deseja deletar o carro{" "}
            <strong>{car.model || "?"}</strong>?
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={deletarCarro}
              disabled={isLoading}
              className={`px-6 py-2 rounded-md font-bold text-white ${
                isLoading
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-800 hover:bg-red-500"
              } transition-colors duration-200`}
            >
              {isLoading ? "Deletando..." : "Sim, deletar"}
            </button>

            <button
              onClick={retornar}
              disabled={isLoading}
              className={`px-6 py-2 rounded-md font-bold text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700"
              } transition-colors duration-200`}
            >
              Não, cancelar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeletarCar;

