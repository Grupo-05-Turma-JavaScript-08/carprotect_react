import { useContext, useEffect, useState } from "react";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type Insurance from "../../models/Insurance";
import { PencilSimple, Trash, CaretDown, CaretUp, MagnifyingGlass, X } from "phosphor-react";

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
    <div className="flex flex-col min-h-screen">
      <div className="p-4 mx-auto max-w-7xl flex-grow">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <span className="text-xl font-bold text-gray-700">
              Carregando dados...
            </span>
          </div>
        )}

        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex-none">
            <img
              src="https://i.ibb.co/7dYs2wWs/output-onlinepngtools.png"
              alt="Logo da Empresa"
              className="w-20"
            />
          </div>
          <div className="flex-grow text-center">
            <h1 className="text-3xl font-bold">Dashboard Administrador</h1>
          </div>
          <div className="flex-none flex items-center gap-4">
            <Link to="/cadastrarseguro">
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600">
                Novo Seguro
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </header>

        {/* Campo de Busca */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlass className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por placa do carro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-center text-sm text-gray-600 mt-2">
              Mostrando resultados para: "<strong>{searchTerm}</strong>"
            </p>
          )}
        </div>

        {/* Controles de Expansão */}
        {filteredInsurances.length > 0 && (
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={expandAllCards}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium"
            >
              Expandir Todos
            </button>
            <button
              onClick={collapseAllCards}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-medium"
            >
              Colapsar Todos
            </button>
          </div>
        )}

        {/* KPIs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700">
                Total de Seguros
              </h3>
              <p className="text-2xl font-bold text-blue-900">
                {searchTerm ? `${filteredInsurances.length} / ${insurances.length}` : insurances.length}
              </p>
              {searchTerm && (
                <p className="text-xs text-blue-600 mt-1">filtrados / total</p>
              )}
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">
                Valor Total dos Carros
              </h3>
              <p className="text-2xl font-bold text-green-900">
                R${" "}
                {(searchTerm ? valorTotalCarrosFiltrados : valorTotalCarros).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
              {searchTerm && valorTotalCarrosFiltrados !== valorTotalCarros && (
                <p className="text-xs text-green-600 mt-1">
                  de R$ {valorTotalCarros.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-700">
                Total de Carros Segurados
              </h3>
              <p className="text-2xl font-bold text-purple-900">
                {searchTerm ? `${totalCarrosFiltrados} / ${totalCarros}` : totalCarros}
              </p>
              {searchTerm && (
                <p className="text-xs text-purple-600 mt-1">filtrados / total</p>
              )}
            </div>
          </div>
        </div>

        {/* Lista de seguros */}
        <div className="mt-8">
          {filteredInsurances.length === 0 ? (
            <div className="text-center py-8">
              {searchTerm ? (
                <div>
                  <p className="text-gray-500 mb-4">
                    Nenhum seguro encontrado para a placa "<strong>{searchTerm}</strong>".
                  </p>
                  <button
                    onClick={clearSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Limpar busca
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">Nenhum seguro encontrado.</p>
              )}
            </div>
          ) : (
            filteredInsurances.map((insurance) => {
              const isExpanded = expandedCards.has(insurance.id);
              
              return (
                <div
                  key={insurance.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
                >
                  {/* Cabeçalho do seguro */}
                  <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold text-gray-800">
                        {insurance.title}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        {insurance.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {insurance.car ? insurance.car.length : 0} carro(s) vinculado(s)
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Botão de expandir/colapsar */}
                      <button
                        onClick={() => toggleCardExpansion(insurance.id)}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                        title={isExpanded ? "Colapsar" : "Expandir"}
                      >
                        {isExpanded ? <CaretUp size={20} /> : <CaretDown size={20} />}
                      </button>
                      
                      {/* Botões de ação */}
                      <Link to={`/editarseguro/${insurance.id}`}>
                        <button
                          className="p-2 text-white transition hover:text-black rounded bg-blue-500
                        hover:bg-blue-600 active:bg-blue-600/20"
                          title="Editar"
                        >
                          <PencilSimple size={22} />
                        </button>
                      </Link>

                      <Link to={`/deletarseguro/${insurance.id}`}>
                        <button
                          className="p-2 text-white transition hover:text-black rounded bg-red-500
                        hover:bg-red-600 active:bg-red-600/20"
                          title="Excluir"
                        >
                          <Trash size={22} />
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Lista de carros associados - só mostra se expandido */}
                  {isExpanded && (
                    <>
                      {insurance.car && insurance.car.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                          {/* Cabeçalho da tabela */}
                          <div className="px-6 py-3 bg-gray-50 grid grid-cols-5 gap-4 text-sm font-semibold text-gray-700">
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
                                className={`px-6 py-4 grid grid-cols-5 gap-4 text-sm items-center ${
                                  matchesSearch 
                                    ? "bg-yellow-50 border-l-4 border-yellow-400" 
                                    : index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                              >
                                <span className="font-medium">{carro.model}</span>
                                <span className={`font-mono ${matchesSearch ? 'font-bold text-yellow-800' : ''}`}>
                                  {carro.licensePlate}
                                </span>
                                <span>
                                  {new Date(carro.manufacturingYear).getFullYear()}
                                </span>
                                <span>
                                  R${" "}
                                  {carro.price.toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                  })}
                                </span>
                                <span className="text-right font-semibold">
                                  {insurance.porcentInsurance}%
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="px-6 py-4 text-gray-500 italic">
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
      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold mb-2">Entre em contato</h3>
            <ul className="text-sm space-y-1">
              <li>
                <span className="font-medium">Telefone:</span>{" "}
                <a href="tel:08007777777" className="hover:underline">
                  0800 777 7777
                </a>
              </li>
              <li>
                <span className="font-medium">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/5511977777777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  (11) 97777-7777
                </a>
              </li>
              <li>
                <span className="font-medium">E-mail:</span>{" "}
                <a
                  href="mailto:contato@carprotect.com.br"
                  className="hover:underline"
                >
                  email@email.com.br
                </a>
              </li>
            </ul>
          </div>
          <p className="text-sm">Copyright © 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default DashboardAdmin;