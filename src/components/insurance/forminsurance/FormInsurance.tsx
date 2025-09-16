import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import {  ShieldCheck, Tag } from "@phosphor-icons/react";
import { ClipLoader } from "react-spinners";
import type Insurance from "../../../models/Insurance";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

function FormInsurance() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [insurance, setInsurance] = useState<Insurance>({} as Insurance);
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

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
      ToastAlerta('Sua sessão expirou, por favor, logue novamente!', 'info');
      navigate('/');
    }
  }, [token]);


  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInsurance({
      ...insurance,
      [name]: value,
    });
  }

  function retornar() {
    navigate("/dashboardadmin");
  }

  async function salvarSeguro(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // validação simples
    if (!insurance.title || !insurance.description || !insurance.porcentInsurance) {
      ToastAlerta("Preencha os campos obrigatórios!", "warning");
      setIsLoading(false);
      return;
    } else {

      if (id !== undefined) {
        try {
          await atualizar(`/plano`, insurance, setInsurance, {
            headers: { Authorization: token }
          });
          ToastAlerta("Seguro atualizado com sucesso!", "success");

        } catch (error: any) {
          if (error.toString().includes('401')) {
            handleLogout();
          } else {
            ToastAlerta('Erro ao atualizar Seguro!', 'error');
          }
        }

      } else {
        try {
          await cadastrar(`/plano`, insurance, setInsurance, {
            headers: { Authorization: token }
          });
          ToastAlerta("Seguro cadastrado com sucesso!", "success");
        } catch (error: any) {
          if (error.toString().includes('401')) {
            handleLogout();
          } else {
            ToastAlerta('Erro ao cadastrar tema!', 'error');
          }
        }
      }

      setIsLoading(false);
      retornar();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#034153] to-[#76AABF] text-[#96A3AB] font-sans">

      <div className="flex-1 ml-80 mr-20">


        <div className="flex items-center justify-between px-10 py-6 mb-16 border-b border-[#678391] bg-[#034153] rounded-xl">
          <h1 className="text-2xl font-bold flex items-center gap-3 text-[#76AABF]">
            <div className="p-2 rounded-lg bg-[#056174]">
              <ShieldCheck size={28} weight="bold" className="text-[#96A3AB]" />
            </div>
            Seguros
          </h1>
          <div className="flex items-center gap-4">
            <span className="px-5 py-2 rounded-lg bg-[#678391] text-[#034153] font-medium flex items-center gap-2">
              {new Date().toLocaleString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <span className="px-5 py-2 rounded-lg bg-[#678391] text-[#034153] font-medium flex items-center gap-2">
              {new Date().toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>

            <span className="ml-4 px-4 py-2 rounded-full bg-[#76AABF]/50 text-[#034153] text-xs font-semibold gap-2 flex">
              <span className="text-[#056174] font-bold animate-pulse">●</span>
              Sistema Online
            </span>
          </div>
        </div>


        <div className="bg-[#034153]/80 backdrop-blur-sm border border-[#678391] rounded-2xl shadow-2xl mx-10 p-8">
          <div className="container max-w-4xl mx-auto">

            <div className="text-center mb-8 pb-6 border-b border-[#678391]">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#76AABF] to-[#056174] mb-2">
                {id === undefined ? "Cadastrar Seguro" : "Editar Seguro"}
              </h1>
              <p className="text-[#96A3AB]">Preencha os dados do seguro</p>
            </div>

            <div className="w-full">

              <form className="mx-auto w-full space-y-8" onSubmit={salvarSeguro}>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#76AABF] flex items-center gap-2 pb-2 border-b border-[#678391]">
                    <ShieldCheck size={20} className="text-[#056174]" />
                    Informações do Seguro
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-[#96A3AB]">
                        <Tag size={16} className="text-[#056174]" />
                        Nome do Seguro *
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        id="title"
                        value={insurance.title}
                        onChange={atualizarEstado}
                        className="w-full px-4 py-3 bg-[#678391]/50 border border-[#96A3AB]/50 rounded-xl text-[#034153] placeholder-[#96A3AB] focus:outline-none focus:ring-2 focus:ring-[#76AABF]/50 focus:border-[#76AABF]/50 transition-all duration-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-[#96A3AB]">
                        <Tag size={16} className="text-[#056174]" />
                        Descrição *
                      </label>
                      <input
                        type="text"
                        name="description"
                        placeholder="Descrição"
                        id="description"
                        value={insurance.description}
                        onChange={atualizarEstado}
                        className="w-full px-4 py-3 bg-[#678391]/50 border border-[#96A3AB]/50 rounded-xl text-[#034153] placeholder-[#96A3AB] focus:outline-none focus:ring-2 focus:ring-[#76AABF]/50 focus:border-[#76AABF]/50 transition-all duration-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="porcentInsurance" className="flex items-center gap-2 text-sm font-medium text-[#96A3AB]">
                        <Tag size={16} className="text-[#056174]" />
                        % do Prêmio *
                      </label>
                      <input
                        type="number"
                        name="porcentInsurance"
                        id="porcentInsurance"
                        placeholder="Porcentagem do prêmio"
                        value={insurance.porcentInsurance}
                        onChange={atualizarEstado}
                        className="w-full px-4 py-3 bg-[#678391]/50 border border-[#96A3AB]/50 rounded-xl text-[#034153] placeholder-[#96A3AB] focus:outline-none focus:ring-2 focus:ring-[#76AABF]/50 focus:border-[#76AABF]/50 transition-all duration-200"
                      />
                    </div>

                 




                  </div>
                </div>







                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[#678391]">
                  <button
                    type="button"
                    onClick={retornar}
                    className="flex-1 px-6 py-3 bg-[#678391]/50 hover:bg-[#678391]/70 border border-[#96A3AB]/50 text-[#034153] rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    Cancelar
                  </button>

                  <button
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#056174] to-[#76AABF] hover:from-[#034153] hover:to-[#678391] disabled:from-[#678391] disabled:to-[#96A3AB] text-white rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                    type="submit"

                  >
                    {isLoading ? (
                      <>
                        <ClipLoader color="#034153" size={20} />
                        <span>Processando...</span>
                      </>
                    ) : (
                      <span>{id === undefined ? "Cadastrar Seguro" : "Atualizar Seguro"}</span>
                    )}
                  </button>
                </div>

              </form>


            </div>

          </div>
        </div>
      </div>

    </div>


  )
}

export default FormInsurance