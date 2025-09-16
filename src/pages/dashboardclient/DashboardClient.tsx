import { useEffect, useState } from "react";

interface Car {
    id: number;
    model: string;
    licensePlate: string;
    price: number;
    description: string;
    manufacturingYear: Date;
    premiumAmount: number;
    insuranceStatus: string;
}

const carrosFicticios: Car[] = [
    {
        id: 1,
        model: 'Ford Ka',
        licensePlate: 'ABC-1234',
        price: 45000,
        description: 'Compacto ideal para a cidade.',
        manufacturingYear: new Date('2019-03-10'),
        premiumAmount: 500,
        insuranceStatus: 'insured',
    },
    {
        id: 2,
        model: 'Volkswagen Gol',
        licensePlate: 'DEF-5678',
        price: 52000,
        description: 'Carro popular, excelente custo-benefício.',
        manufacturingYear: new Date('2020-07-22'),
        premiumAmount: 0,
        insuranceStatus: 'not-insured',
    },
    {
        id: 3,
        model: 'Hyundai HB20',
        licensePlate: 'GHI-9012',
        price: 61000,
        description: 'Design moderno e bom desempenho.',
        manufacturingYear: new Date('2021-02-15'),
        premiumAmount: 700,
        insuranceStatus: 'insured',
    },
    {
        id: 4,
        model: 'Chevrolet Onix',
        licensePlate: 'JKL-3456',
        price: 65000,
        description: 'O mais vendido do Brasil, com muita tecnologia.',
        manufacturingYear: new Date('2022-04-01'),
        premiumAmount: 850,
        insuranceStatus: 'insured',
    },
    {
        id: 5,
        model: 'Toyota Corolla',
        licensePlate: 'MNO-7890',
        price: 120000,
        description: 'Sedan de luxo, sinônimo de confiabilidade.',
        manufacturingYear: new Date('2023-11-20'),
        premiumAmount: 0,
        insuranceStatus: 'not-insured',
    },
];

function DashboardClient() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [carros, setCarros] = useState<Car[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setCarros(carrosFicticios);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 mx-auto max-w-7xl flex-grow">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <span className="text-xl font-bold text-gray-700">Carregando dados...</span>
          </div>
        )}
        
        <header className="flex items-center justify-between py-6">
            <div className="flex-none">
                <img src="https://i.ibb.co/7dYs2wWs/output-onlinepngtools.png" alt="Logo da Empresa" className="w-20" />
            </div>
            <div className="flex-grow text-center">
                <h1 className="text-3xl font-bold">Dashboard de Carros</h1>
            </div>
            <div className="flex-none flex items-center gap-4">
                <button className="px-6 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600">
                    Novo Carro
                </button>
            </div>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-700">Total de Carros</h3>
                    <p className="text-2xl font-bold text-blue-900">{carros.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-700">Valor Total dos Carros</h3>
                    <p className="text-2xl font-bold text-green-900">
                        R$ {carros.reduce((total, carro) => total + carro.price, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-700">Prêmios a Pagar</h3>
                    <p className="text-2xl font-bold text-yellow-900">
                        R$ {carros.reduce((total, carro) => total + carro.premiumAmount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-700">Carros Segurados</h3>
                    <p className="text-2xl font-bold text-purple-900">
                        {carros.filter(carro => carro.insuranceStatus === 'insured').length} de {carros.length}
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-8">
            {carros.length === 0 ? (
                <p className="text-center text-gray-500">Nenhum carro encontrado.</p>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Cabeçalho da tabela */}
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                            <div className="col-span-3">Modelo</div>
                            <div className="col-span-2">Placa</div>
                            <div className="col-span-1">Ano</div>
                            <div className="col-span-2">Preço</div>
                            <div className="col-span-2">Status Seguro</div>
                            <div className="col-span-2">Prêmio</div>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {carros.map((carro, index) => (
                            <div 
                                key={carro.id} 
                                className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                                }`}
                            >
                                <div className="grid grid-cols-12 gap-4 items-center text-sm">
                                    <div className="col-span-3">
                                        <p className="font-medium text-gray-900">{carro.model}</p>
                                        <p className="text-gray-500 text-xs mt-1">{carro.description}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-900">{carro.licensePlate}</span>
                                    </div>
                                    <div className="col-span-1">
                                        <span className="text-gray-900">{new Date(carro.manufacturingYear).getFullYear()}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-900 font-medium">R$ {carro.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                            carro.insuranceStatus === 'insured' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {carro.insuranceStatus === 'insured' ? 'Segurado' : 'Não Segurado'}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-900">
                                            {carro.premiumAmount > 0 
                                                ? `R$ ${carro.premiumAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
                                                : '-'
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>

      <footer className=" bg-gray-800 text-white p-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">Entre em contato</h3>
              <ul className="text-sm space-y-1">
                <li>
                  <span className="font-medium">Telefone:</span>{" "}
                  <a
                    href="tel:08007777777"
                    className="hover:underline"
                    aria-label="Ligar para 0800 777 7777"
                  >
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
                    aria-label="Abrir WhatsApp"
                  >
                    (11) 97777-7777
                  </a>
                </li>
                <li>
                  <span className="font-medium">E-mail:</span>{" "}
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
            <div className="flex justify-end">
              <p className="text-lg mt-4">Copyright © 2025</p>
            <div className="text-center md:text-right">

                {/*} 
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                    Suporte
                </button>{*/}
            </div>
          </div>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardClient;
