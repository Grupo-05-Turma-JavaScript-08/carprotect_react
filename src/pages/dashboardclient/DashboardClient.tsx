import { useContext, useEffect, useState } from "react";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type Car from "../../models/Car";
import { PencilSimple, Trash, Plus, SignOut, Car as CarIcon, CalendarCheck } from "@phosphor-icons/react";

function DashboardClient() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [car, setCar] = useState<Car[]>([]);
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    if (token === '') {
      ToastAlerta('O Usuário precisa estar logado!', 'warning');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarCarro();
  }, [car.length]);

  async function buscarCarro() {
    setIsLoading(true);

    try {
      setIsLoading(true);
      await buscar("/carro", setCar, {
        headers: { Authorization: token }
      })

    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  const carrosDoUsuario = car.filter(
    (carro) => carro.user?.username === user.username
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f7f9fb] to-[#e8eef3]">
      <div className="p-4 mx-auto w-full max-w-7xl flex-grow">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#034153]">
              <span className="text-xl font-bold text-[#034153]">Carregando dados...</span>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between py-6 bg-white rounded-2xl shadow-xl mb-6 px-6 border-t-4 border-[#056174] gap-4">
          <div className="flex-none">
            <img 
              src="https://i.ibb.co/7dYs2wWs/output-onlinepngtools.png" 
              alt="Logo da Empresa" 
              className="w-32 transition-transform duration-300 hover:scale-105 "
            />
          </div>
          <div className="flex-grow text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-[#034153]">Dashboard Cliente</h1>
            <p className="text-[#678391] text-sm mt-1">Gerencie seus veículos e seguros</p>
          </div>
          <div className="flex-none flex flex-col sm:flex-row items-center gap-4">
            <Link to='/cadastrarcarro'>
              <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#034153] to-[#056174] text-white rounded-lg font-bold hover:from-[#056174] hover:to-[#034153] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 hover:cursor-pointer">
                <Plus size={20} />
                Novo Carro
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-6 py-3 border-2 border-[#034153] text-[#056174] rounded-lg font-bold    transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 hover:cursor-pointer"
            >
              <SignOut size={20} />
              Sair
            </button>
          </div>
        </header>

        {/* KPIs */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border-t-4 border-[#034153]">
          <h2 className="text-xl sm:text-2xl font-bold text-[#034153] text-center mb-6">Resumo dos Seus Veículos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            <div className="bg-gradient-to-br from-[#e8f4f8] to-[#76AABF]/20 p-6 rounded-xl border-l-4 border-[#034153]">
              <div className="w-12 h-12 rounded-full bg-[#76AABF] flex items-center justify-center mx-auto mb-3">
                <CarIcon size={24} color="#034153" weight="fill" />
              </div>
              <h3 className="text-md sm:text-lg font-semibold text-[#034153] mb-2">Total de Carros</h3>
              <p className="text-2xl sm:text-3xl font-bold text-[#056174]">{carrosDoUsuario.length}</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#e8f4f8] to-[#76AABF]/20 p-6 rounded-xl border-l-4 border-[#056174]">
              <div className="w-12 h-12 rounded-full bg-[#76AABF] flex items-center justify-center mx-auto mb-3">
                <span className="text-[#034153] font-bold text-lg">R$</span>
              </div>
              <h3 className="text-md sm:text-lg font-semibold text-[#034153] mb-2">Valor Total dos Carros</h3>
              <p className="text-xl sm:text-2xl font-bold text-[#056174]">
                R$ {carrosDoUsuario.reduce((total, carro) => total + Number(carro.price), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#e8f4f8] to-[#76AABF]/20 p-6 rounded-xl border-l-4 border-[#034153]">
              <div className="w-12 h-12 rounded-full bg-[#76AABF] flex items-center justify-center mx-auto mb-3">
                <span className="text-[#034153] font-bold text-lg">%</span>
              </div>
              <h3 className="text-md sm:text-lg font-semibold text-[#034153] mb-2">Prêmios a Pagar</h3>
              <p className="text-xl sm:text-2xl font-bold text-[#056174]">
                R$ {carrosDoUsuario.reduce((total, carro) => total + Number(carro.premiumAmount), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#e8f4f8] to-[#76AABF]/20 p-6 rounded-xl border-l-4 border-[#056174]">
              <div className="w-12 h-12 rounded-full bg-[#76AABF] flex items-center justify-center mx-auto mb-3">
                <CalendarCheck size={24} color="#034153" weight="fill" />
              </div>
              <h3 className="text-md sm:text-lg font-semibold text-[#034153] mb-2">Carros Segurados</h3>
              <p className="text-2xl sm:text-3xl font-bold text-[#056174]">
                {carrosDoUsuario.filter(carro => carro.insuranceStatus !== null).length} / {carrosDoUsuario.length}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#e8f4f8] to-[#76AABF]/20 p-6 rounded-xl border-l-4 border-[#034153]">
              <div className="w-12 h-12 rounded-full bg-[#96A3AB] flex items-center justify-center mx-auto mb-3">
                <CarIcon size={24} color="#034153" weight="fill" />
              </div>
              <h3 className="text-md sm:text-lg font-semibold text-[#034153] mb-2">Carros Antigos</h3>
              <p className="text-2xl sm:text-3xl font-bold text-[#056174]">
                {carrosDoUsuario.filter(carro => carro.insuranceStatus == "Carro Antigo").length} / {carrosDoUsuario.length}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Carros */}
        <div className="mt-8">
          {carrosDoUsuario.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-xl border-t-4 border-[#678391]">
              <div className="w-16 h-16 rounded-full bg-[#e8f4f8] flex items-center justify-center mx-auto mb-4">
                <CarIcon size={32} color="#678391" />
              </div>
              <p className="text-[#678391] text-lg mb-4">Nenhum carro encontrado.</p>
              <Link to='/cadastrarcarro'>
                <button className="px-6 py-3 bg-gradient-to-r from-[#034153] to-[#056174] text-white rounded-lg hover:from-[#056174] hover:to-[#034153] transition-all duration-300 transform hover:scale-105 hover:cursor-pointer">
                  Cadastrar Primeiro Carro
                </button>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#056174]">
              {/* Cabeçalho da tabela para telas grandes */}
              <div className="hidden lg:grid bg-gradient-to-r from-[#034153] to-[#056174] px-6 py-4 grid-cols-13 gap-4 text-sm font-medium text-white">
                  <div className="col-span-2">Modelo</div>
                  <div className="col-span-2">Placa</div>
                  <div className="col-span-1">Ano</div>
                  <div className="col-span-2">Preço</div>
                  <div className="col-span-2">Nome Seguro</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Carro</div>
                  <div className="col-span-1">Prêmio</div>
                  <div className="col-span-1">Ações</div>
              </div>
              
              <div className="divide-y divide-[#76AABF]/20">
                {carrosDoUsuario.map((carro, index) => (
                  <div
                    key={carro.id}
                    className={`px-6 py-4 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    {/* Layout para telas grandes (tabela) */}
                    <div className="hidden lg:grid grid-cols-13 gap-4 items-center text-sm">
                      <div className="col-span-2">
                        <p className="font-medium text-[#034153]">{carro.model}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#678391] font-mono">{carro.licensePlate}</span>
                      </div>
                      <div className="col-span-1">
                        <span className="text-[#678391]">{new Date(carro.manufacturingYear).getFullYear()}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#056174] font-semibold">
                          R$ {carro.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#034153] font-medium">{carro.insurance?.title || '-'}</span>
                      </div>
                      <div className="col-span-1 -ml-5">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${carro.insurance !== null ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {carro.insurance !== null ? 'Segurado' : 'Não Segurado'}
                        </span>
                      </div>
                      <div className="col-span-1">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${carro.insuranceStatus == 'Carro Atual' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {carro.insuranceStatus == 'Carro Atual'? 'Atual' : 'Antigo'}
                        </span>
                      </div>
                      <div className="col-span-1 ">
                        <span className="text-[#678391] font-medium">
                          {carro.premiumAmount > 0 ? `R$ ${carro.premiumAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}
                        </span>
                      </div>
                      <div className="col-span-1 flex flex-row gap-2">
                        <Link to={`/editarcarro/${carro.id}`}>
                          <button className="p-2.5 text-white bg-gradient-to-l from-[#034153] to-[#056174] rounded-lg hover:cursor-pointer" title="Editar">
                            <PencilSimple size={16} />
                          </button>
                        </Link>
                        <Link to={`/deletarcarro/${carro.id}`}>
                          <button className="p-2 text-[#034153] border-2 border-[#034153] rounded-lg hover:cursor-pointer" title="Excluir">
                            <Trash size={16} />
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Layout para telas pequenas (cartão) */}
                    <div className="lg:hidden flex flex-col gap-4 text-sm">
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-lg text-[#034153]">{carro.model}</p>
                        <div className="flex flex-row gap-2">
                          <Link to={`/editarcarro/${carro.id}`}>
                            <button className="p-2 text-white bg-gradient-to-l from-[#034153] to-[#056174] rounded-lg" title="Editar">
                              <PencilSimple size={16} />
                            </button>
                          </Link>
                          <Link to={`/deletarcarro/${carro.id}`}>
                            <button className="p-2 text-[#034153] border-2 border-[#034153] rounded-lg" title="Excluir">
                              <Trash size={16} />
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                          <p className="font-semibold text-[#678391]">Placa</p>
                          <p className="font-mono text-[#056174]">{carro.licensePlate}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#678391]">Ano</p>
                          <p>{new Date(carro.manufacturingYear).getFullYear()}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#678391]">Preço</p>
                          <p className="font-semibold text-[#056174]">R$ {carro.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#678391]">Seguro</p>
                          <p>{carro.insurance?.title || 'Não segurado'}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#678391]">Prêmio</p>
                          <p>{carro.premiumAmount > 0 ? `R$ ${carro.premiumAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#678391]">Status</p>
                          <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${carro.insurance !== null ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {carro.insurance !== null ? 'Segurado' : 'Não Segurado'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} 
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#034153] to-[#056174] text-white p-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-[#e8f4f8]">Entre em contato</h3>
              <ul className="text-sm space-y-3">
                <li className="flex items-center justify-center md:justify-start gap-3 hover:text-[#76AABF] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#76AABF]"></div>
                  <span className="font-medium">Telefone:</span>
                  <a href="tel:08007777777" className="hover:underline">0800 777 7777</a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 hover:text-[#76AABF] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#76AABF]"></div>
                  <span className="font-medium">WhatsApp:</span>
                  <a href="https://wa.me/5511977777777" target="_blank" rel="noopener noreferrer" className="hover:underline">(11) 97777-7777</a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 hover:text-[#76AABF] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#76AABF]"></div>
                  <span className="font-medium">E-mail:</span>
                  <a href="mailto:contato@carprotect.com.br" className="hover:underline">email@email.com.br</a>
                </li>
              </ul>
            </div>
            <div className="hidden md:flex justify-end items-center">
              <img src="https://i.ibb.co/MLCDmSL/raw.png" alt="Logo Footer" className="w-60 opacity-80"/>
            </div>
          </div>
          <div className="border-t border-[#76AABF]/30 mt-8 pt-6 text-center">
            <p className="text-[#e8f4f8] text-sm">© 2025 Nexo Seguros. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardClient;