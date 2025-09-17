import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { ShieldCheck, Tag, Percent, ArrowLeft, FloppyDisk } from "@phosphor-icons/react";
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

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setInsurance({
      ...insurance,
      [name]: name === "porcentInsurance" ? Number(value) : value,
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
    }

    if (insurance.porcentInsurance <= 0 || insurance.porcentInsurance > 100) {
      ToastAlerta("A porcentagem deve estar entre 1 e 100!", "warning");
      setIsLoading(false);
      return;
    }

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
          ToastAlerta('Erro ao cadastrar seguro!', 'error');
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f9fb] to-[#e8eef3] p-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border-t-4 border-[#034153] p-8">
          
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-[#76AABF]/30">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#034153] to-[#056174] flex items-center justify-center">
                <ShieldCheck size={32} color="white" weight="fill" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#034153] mb-2">
              {id === undefined ? "Cadastrar Seguro" : "Editar Seguro"}
            </h1>
            <p className="text-[#678391] text-lg">Configure os detalhes do plano de seguro</p>
          </div>

          <form className="space-y-8" onSubmit={salvarSeguro}>
            
            {/* Seção: Informações Básicas */}
            <div className="bg-gradient-to-br from-[#e8f4f8] to-white p-6 rounded-xl border-l-4 border-[#034153]">
              <h3 className="text-xl font-bold text-[#034153] flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#76AABF] flex items-center justify-center">
                  <ShieldCheck size={20} color="#034153" />
                </div>
                Informações Básicas do Seguro
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-[#034153]">
                    <Tag size={16} className="text-[#76AABF]" />
                    Nome do Plano *
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Ex: Seguro Auto Completo"
                    id="title"
                    value={insurance.title || ""}
                    onChange={atualizarEstado}
                    className="w-full px-4 py-3 bg-white border-2 border-[#76AABF]/30 rounded-xl text-[#678391] placeholder-[#96A3AB] focus:border-[#034153] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="porcentInsurance" className="flex items-center gap-2 text-sm font-semibold text-[#034153]">
                    <Percent size={16} className="text-[#76AABF]" />
                    Porcentagem do Prêmio *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="porcentInsurance"
                      id="porcentInsurance"
                      placeholder="5.5"
                      min="0.1"
                      max="100"
                      step="0.1"
                      value={insurance.porcentInsurance || ""}
                      onChange={atualizarEstado}
                      className="w-full px-4 py-3 pr-12 bg-white border-2 border-[#76AABF]/30 rounded-xl text-[#678391] placeholder-[#96A3AB] focus:border-[#034153] focus:outline-none transition-colors"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <span className="text-[#76AABF] font-bold">%</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#678391]">
                    Valor entre 0.1% e 100%
                  </p>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-[#034153]">
                    <Tag size={16} className="text-[#76AABF]" />
                    Descrição do Plano *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Descreva as coberturas e benefícios deste plano de seguro..."
                    id="description"
                    rows={4}
                    value={insurance.description || ""}
                    onChange={atualizarEstado}
                    className="w-full px-4 py-3 bg-white border-2 border-[#76AABF]/30 rounded-xl text-[#678391] placeholder-[#96A3AB] focus:border-[#034153] focus:outline-none transition-colors resize-vertical"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Preview do Seguro */}
            {(insurance.title || insurance.description || insurance.porcentInsurance) && (
              <div className="bg-gradient-to-br from-[#e8f4f8] to-white p-6 rounded-xl border-l-4 border-[#056174]">
                <h3 className="text-xl font-bold text-[#056174] flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#76AABF] flex items-center justify-center">
                    <ShieldCheck size={20} color="#056174" />
                  </div>
                  Preview do Plano
                </h3>
                
                <div className="bg-white p-4 rounded-lg border border-[#76AABF]/20">
                  <h4 className="font-bold text-[#034153] text-lg mb-2">
                    {insurance.title || "Nome do Plano"}
                  </h4>
                  <p className="text-[#678391] mb-3">
                    {insurance.description || "Descrição do plano"}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#678391]">Prêmio:</span>
                    <span className="font-bold text-[#76AABF] text-lg">
                      {insurance.porcentInsurance || 0}%
                    </span>
                  </div>
                </div>
              </div>
            )}

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
                    {id === undefined ? "Cadastrar Seguro" : "Atualizar Seguro"}
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
                  {id === undefined ? "Cadastrando seguro..." : "Atualizando seguro..."}
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

export default FormInsurance