import { useContext, useEffect, useState } from "react";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type Insurance from "../../models/Insurance";
import { PencilSimple, Trash, CaretDown, CaretUp, MagnifyingGlass, X, Plus, SignOut } from "phosphor-react";

function DashboardAdmin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [filteredInsurances, setFilteredInsurances] = useState<Insurance[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Sua sessão expirou, por favor, logue novamente!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarInsurances();
  }, [insurances.length]);

  // Filtrar seguros com base na busca por placa
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredInsurances(insurances);
    } else {
      const filtered = insurances.filter(insurance => 
        insurance.car && insurance.car.some(carro => 
          carro.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredInsurances(filtered);
    }
  }, [searchTerm, insurances]);

  async function buscarInsurances() {
    try {
      setIsLoading(true);
      await buscar("/plano", setInsurances, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Função para alternar expansão de um card
  const toggleCardExpansion = (insuranceId: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(insuranceId)) {
      newExpanded.delete(insuranceId);
    } else {
      newExpanded.add(insuranceId);
    }
    setExpandedCards(newExpanded);
  };

  // Função para expandir todos os cards
  const expandAllCards = () => {
    const allIds = new Set(filteredInsurances.map(insurance => insurance.id));
    setExpandedCards(allIds);
  };

  // Função para colapsar todos os cards
  const collapseAllCards = () => {
    setExpandedCards(new Set());
  };

  // Função para limpar busca
  const clearSearch = () => {
    setSearchTerm("");
  };

  // KPIs baseados nos dados filtrados
  const totalCarrosFiltrados = filteredInsurances.reduce(
    (acc, ins) => acc + (ins.car ? ins.car.length : 0),
    0
  );
  const valorTotalCarrosFiltrados = filteredInsurances.reduce(
    (acc, ins) =>
      acc +
      (ins.car
        ? ins.car.reduce((soma, c) => soma + Number(c.price), 0)
        : 0),
    0
  );

  // KPIs totais (sem filtro)
  const totalCarros = insurances.reduce(
    (acc, ins) => acc + (ins.car ? ins.car.length : 0),
    0
  );
  const valorTotalCarros = insurances.reduce(
    (acc, ins) =>
      acc +
      (ins.car
        ? ins.car.reduce((soma, c) => soma + Number(c.price), 0)
        : 0),
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f7f9fb] to-[#e8eef3]">
      <div className="p-4 mx-auto max-w-7xl flex-grow">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#034153]">
              <span className="text-xl font-bold text-[#034153]">
                Carregando dados...
              </span>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="flex items-center justify-between py-6 bg-white rounded-2xl shadow-xl mb-6 px-6 border-t-4 border-[#034153]">
          <div className="flex-none">
            <img
              src="https://i.ibb.co/7dYs2wWs/output-onlinepngtools.png"
              alt="Logo da Empresa"
              className="w-30 transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
            />
          </div>
          <div className="flex-grow text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#034153]">Dashboard Administrador</h1>
            <p className="text-[#678391] text-sm mt-1">Gerencie seguros e visualize estatísticas</p>
          </div>
          <div className="flex-none flex items-center gap-4">
            <Link to="/cadastrarseguro">
              <button className="px-6 py-3 bg-gradient-to-r from-[#034153] to-[#056174] text-white rounded-lg font-bold hover:from-[#056174] hover:to-[#034153] transition-all duration-300 transform hover:scale-105 flex items-center gap-2 hover:cursor-pointer">
                <Plus size={20} />
                Novo Seguro
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="px-6 py-3 border-2 border-[#034153] text-[#056174] rounded-lg font-bold hover:from-red-600 hover:to-red-500 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 hover:cursor-pointer "
            >
              <SignOut size={20} />
              Sair
            </button>
          </div>
        </header>

        {/* Campo de Busca */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlass className="h-5 w-5 text-[#76AABF]" />
            </div>
            <input
              type="text"
              placeholder="Buscar por placa do carro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-10 py-4 border-2 border-[#76AABF]/30 rounded-xl focus:ring-2 focus:ring-[#034153] focus:border-[#034153] text-[#678391] bg-white shadow-lg transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-[#76AABF] hover:text-[#034153] transition-colors" />
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-center text-sm text-[#678391] mt-2">
              Mostrando resultados para: "<strong className="text-[#034153]">{searchTerm}</strong>"
            </p>
          )}
        </div>

        {/* Controles de Expansão */}
        {filteredInsurances.length > 0 && (
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={expandAllCards}
              className="px-6 py-3 bg-[#76AABF] text-white rounded-lg hover:bg-[#056174] text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <CaretDown size={16} />
              Expandir Todos
            </button>
            <button
              onClick={collapseAllCards}
              className="px-6 py-3 bg-[#96A3AB] text-white rounded-lg hover:bg-[#678391] text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <CaretUp size={16} />
              Colapsar Todos
            </button>
          </div>
        )}

        {/* KPIs */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-[#056174]">
          <h2 className="text-2xl font-bold text-[#034153] text-center mb-6">Estatísticas do Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-gradient-to-br from-[#e8f4f8] to-[#76AABF]/20 p-6 rounded-xl border-l-4 border-[#034153]">
              <h3 className="text-lg font-semibold text-[#034153] mb-2">
                Total de Seguros
              </h3>
              <p className="text-3xl font-bold text-[#056174]">
                {searchTerm ? `${filteredInsurances.length} / ${insurances.length}` : insurances.length}
              </p>
              {searchTerm && (
                <p className="text-xs text-[#678391] mt-1">filtrados / total</p>
              )}
            </div>
            <div className="bg-gradient-to-br from-[#e8f4f8] to-[#76AABF]/20 p-6 rounded-xl border-l-4 border-[#056174]">
              <h3 className="text-lg font-semibold text-[#034153] mb-2">
                Valor Total dos Carros
              </h3>
              <p className="text-3xl font-bold text-[#056174]">
                R${" "}
                {(searchTerm ? valorTotalCarrosFiltrados : valorTotalCarros).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
              {searchTerm && valorTotalCarrosFiltrados !== valorTotalCarros && (
                <p className="text-xs text-[#678391] mt-1">
                  de R$ {valorTotalCarros.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
            <div className="bg-gradient-to-br from-[#e8f4f8] to-[#76AABF]/20 p-6 rounded-xl border-l-4 border-[#034153]">
              <h3 className="text-lg font-semibold text-[#034153] mb-2">
                Total de Carros Segurados
              </h3>
              <p className="text-3xl font-bold text-[#056174]">
                {searchTerm ? `${totalCarrosFiltrados} / ${totalCarros}` : totalCarros}
              </p>
              {searchTerm && (
                <p className="text-xs text-[#678391] mt-1">filtrados / total</p>
              )}
            </div>
          </div>
        </div>

        {/* Lista de seguros */}
        <div className="mt-8">
          {filteredInsurances.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-xl border-t-4 border-[#678391]">
              {searchTerm ? (
                <div>
                  <p className="text-[#678391] mb-4 text-lg">
                    Nenhum seguro encontrado para a placa "<strong className="text-[#034153]">{searchTerm}</strong>".
                  </p>
                  <button
                    onClick={clearSearch}
                    className="px-6 py-3 bg-gradient-to-r from-[#034153] to-[#056174] text-white rounded-lg hover:from-[#056174] hover:to-[#034153] transition-all duration-300 transform hover:scale-105"
                  >
                    Limpar busca
                  </button>
                </div>
              ) : (
                <p className="text-[#678391] text-lg">Nenhum seguro encontrado.</p>
              )}
            </div>
          ) : (
            filteredInsurances.map((insurance) => {
              const isExpanded = expandedCards.has(insurance.id);
              
              return (
                <div
                  key={insurance.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 border-t-4 border-[#034153] transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Cabeçalho do seguro */}
                  <div className="bg-gradient-to-r from-[#e8f4f8] to-white px-6 py-6 flex justify-between items-center">
                    <div className="flex-grow">
                      <h2 className="text-xl md:text-2xl font-bold text-[#034153] mb-2">
                        {insurance.title}
                      </h2>
                      <p className="text-[#678391] text-sm md:text-base mb-2">
                        {insurance.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#76AABF]"></div>
                        <p className="text-xs text-[#678391]">
                          {insurance.car ? insurance.car.length : 0} carro(s) vinculado(s)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Botão de expandir/colapsar */}
                      <button
                        onClick={() => toggleCardExpansion(insurance.id)}
                        className="p-3 text-[#678391] hover:text-[#034153] hover:bg-[#76AABF]/20 rounded-xl transition-all duration-300 transform hover:scale-110 hover:cursor-pointer"
                        title={isExpanded ? "Colapsar" : "Expandir"}
                      >
                        {isExpanded ? <CaretUp size={24} /> : <CaretDown size={24} />}
                      </button>
                      
                      {/* Botões de ação */}
                      <Link to={`/editarseguro/${insurance.id}`}>
                       <button 
                            className="p-2 border-2  text-white bg-gradient-to-l from-[#034153] to-[#056174] rounded-lg transition-all duration-300 transform hover:scale-110 hover:cursor-pointer" 
                            title="Editar"
                          >
                          <PencilSimple size={20} />
                        </button>
                      </Link>

                      <Link to={`/deletarseguro/${insurance.id}`}>
                        <button 
                            className="p-2 text-[#034153] border-2 border-[#034153]  rounded-lg transition-all duration-300 transform hover:scale-110 hover:cursor-pointer" 
                            title="Excluir"
                          >
                          <Trash size={20} />
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Lista de carros associados - só mostra se expandido */}
                  {isExpanded && (
                    <>
                      {insurance.car && insurance.car.length > 0 ? (
                        <div className="divide-y divide-[#76AABF]/20">
                          {/* Cabeçalho da tabela */}
                          <div className="px-6 py-4 bg-gradient-to-r from-[#034153] to-[#056174] grid grid-cols-5 gap-4 text-sm font-semibold text-white">
                            <span>Modelo</span>
                            <span>Placa</span>
                            <span>Ano</span>
                            <span>Valor</span>
                            <span className="text-right">Prêmio</span>
                          </div>
                          
                          {insurance.car.map((carro, index) => {
                            // Destacar carros que correspondem à busca
                            const matchesSearch = searchTerm && 
                              carro.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
                            
                            return (
                              <div
                                key={carro.id}
                                className={`px-6 py-4 grid grid-cols-5 gap-4 text-sm items-center transition-colors duration-200 ${
                                  matchesSearch 
                                    ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400" 
                                    : index % 2 === 0 ? "bg-white hover:bg-[#f7f9fb]" : "bg-[#f7f9fb] hover:bg-[#e8eef3]"
                                }`}
                              >
                                <span className="font-medium text-[#034153]">{carro.model}</span>
                                <span className={`font-mono ${matchesSearch ? 'font-bold text-yellow-800' : 'text-[#678391]'}`}>
                                  {carro.licensePlate}
                                </span>
                                <span className="text-[#678391]">
                                  {new Date(carro.manufacturingYear).getFullYear()}
                                </span>
                                <span className="text-[#056174] font-semibold">
                                  R${" "}
                                  {carro.price.toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                  })}
                                </span>
                                <span className="text-right font-bold text-[#76AABF]">
                                  {insurance.porcentInsurance}%
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="px-6 py-8 text-[#678391] italic text-center bg-[#f7f9fb]">
                          Nenhum carro vinculado a este seguro.
                        </p>
                      )}
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#034153] to-[#056174] text-white p-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-4 text-[#e8f4f8]">Entre em contato</h3>
              <ul className="text-sm space-y-3">
                <li className="flex items-center gap-3 hover:text-[#76AABF] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#76AABF]"></div>
                  <span className="font-medium">Telefone:</span>
                  <a
                    href="tel:08007777777"
                    className="hover:underline"
                    aria-label="Ligar para 0800 777 7777"
                  >
                    0800 777 7777
                  </a>
                </li>
                <li className="flex items-center gap-3 hover:text-[#76AABF] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#76AABF]"></div>
                  <span className="font-medium">WhatsApp:</span>
                  <a
                    href="https://wa.me/5511977777777"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    aria-label="Abrir WhatsApp"
                  >
                    (11) 97777-7777
                  </a>
                </li>
                <li className="flex items-center gap-3 hover:text-[#76AABF] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#76AABF]"></div>
                  <span className="font-medium">E-mail:</span>
                  <a
                    href="mailto:contato@carprotect.com.br"
                    className="hover:underline"
                    aria-label="Enviar email"
                  >
                    email@email.com.br
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex justify-end items-center">
              <img 
                src="https://i.ibb.co/MLCDmSL/raw.png" 
                alt="Logo Footer" 
                className="w-60 opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
          <div className="border-t border-[#76AABF]/30 mt-8 pt-6 text-center">
            <p className="text-[#e8f4f8] text-sm">
              © 2025 Nexo Seguros. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardAdmin;