import { EnvelopeSimpleIcon, PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react"

function Contato() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-[#f7f9fb] to-[#e8eef3]">

                {/* Seção Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-6 md:px-20 py-16">
                    <div className="flex justify-center md:justify-start">
                        <div className="flex flex-col gap-8 justify-center items-start">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#034153]">
                                Fale Conosco
                            </h1>
                            <p className="text-[#678391] text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
                                Tem alguma dúvida, precisa de uma cotação ou quer saber mais sobre nossos serviços?
                                <br /><br />
                                Estamos à disposição para te ajudar! Entre em contato conosco através do formulário abaixo ou pelos nossos canais de atendimento. Nossa equipe está pronta para oferecer o melhor suporte e as soluções ideais para suas necessidades de seguro.
                                <br /><br />
                                <span className="text-[#056174] font-semibold">Preencha o formulário ao lado e retornaremos o mais breve possível.</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* Círculo decorativo de fundo */}
                            <div className="absolute inset-0 w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#96A3AB] to-[#76AABF] opacity-30 -z-10"></div>
                            <img
                                src="https://i.ibb.co/wN3hsHhm/imagecarro.png"
                                alt="Imagem família sorrindo no carro"
                                className="rounded-2xl w-full  h-auto object-cover transform transition-transform duration-500 hover:scale-105 shadow-xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Seção de Contato e Formulário */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white items-start px-6 md:px-20 py-16 mx-6 md:mx-20 rounded-2xl shadow-xl border-t-4 border-[#034153]">
                    
                    {/* Informações de Contato */}
                    <div className="flex flex-col items-start gap-8">
                        <h3 className="text-3xl md:text-4xl font-bold text-[#034153]">Entre em contato</h3>
                        
                        <div className="flex flex-col gap-6 w-full">
                            <a 
                                href="tel:08007777777"
                                className="flex items-center gap-4 p-4 bg-[#e8f4f8] rounded-xl hover:bg-[#76AABF]/20 transition-all duration-300 hover:scale-105 group"
                                aria-label="Ligar para 0800 777 7777"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#76AABF] flex items-center justify-center group-hover:bg-[#034153] transition-colors">
                                    <PhoneIcon size={24} color="white" weight="fill" />
                                </div>
                                <div>
                                    <p className="text-[#034153] font-semibold text-lg">Telefone</p>
                                    <p className="text-[#678391]">0800 777 7777</p>
                                </div>
                            </a>

                            <a
                                href="https://wa.me/5511977777777"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-[#e8f4f8] rounded-xl hover:bg-[#76AABF]/20 transition-all duration-300 hover:scale-105 group"
                                aria-label="Abrir WhatsApp"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#76AABF] flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                                    <WhatsappLogoIcon size={24} color="white" weight="fill" />
                                </div>
                                <div>
                                    <p className="text-[#034153] font-semibold text-lg">WhatsApp</p>
                                    <p className="text-[#678391]">(11) 97777-7777</p>
                                </div>
                            </a>

                            <a
                                href="mailto:contato@nexoseguros.com.br"
                                className="flex items-center gap-4 p-4 bg-[#e8f4f8] rounded-xl hover:bg-[#76AABF]/20 transition-all duration-300 hover:scale-105 group"
                                aria-label="Enviar email"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#76AABF] flex items-center justify-center group-hover:bg-[#056174] transition-colors">
                                    <EnvelopeSimpleIcon size={24} color="white" weight="fill" />
                                </div>
                                <div>
                                    <p className="text-[#034153] font-semibold text-lg">E-mail</p>
                                    <p className="text-[#678391]">contato@nexoseguros.com.br</p>
                                </div>
                            </a>
                        </div>

                        {/* Informações Adicionais */}
                        <div className="bg-gradient-to-r from-[#034153] to-[#056174] p-6 rounded-xl text-white w-full">
                            <h4 className="font-bold text-xl mb-3">Horário de Atendimento</h4>
                            <div className="space-y-2 text-[#e8f4f8]">
                                <p><strong className="text-white">Segunda a Sexta:</strong> 8h às 18h</p>
                                <p><strong className="text-white">Sábado:</strong> 8h às 14h</p>
                                <p><strong className="text-white">Domingo e Feriados:</strong> Emergências 24h</p>
                            </div>
                        </div>
                    </div>

                    {/* Formulário */}
                    <div className="w-full bg-gradient-to-br from-[#e8f4f8] to-white shadow-xl rounded-2xl p-8 border-t-4 border-[#056174]">
                        <h2 className="text-3xl text-center mb-6 text-[#034153] font-bold">Formulário de Contato</h2>
                        <form className="flex flex-col space-y-5">
                            <input 
                                name="nome" 
                                type="text" 
                                placeholder="Nome completo" 
                                className="border-2 border-[#76AABF]/30 rounded-lg p-4 focus:border-[#034153] focus:outline-none transition-colors bg-white text-[#678391] placeholder-[#96A3AB]" 
                            />
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                className="border-2 border-[#76AABF]/30 rounded-lg p-4 focus:border-[#034153] focus:outline-none transition-colors bg-white text-[#678391] placeholder-[#96A3AB]" 
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input 
                                    type="tel" 
                                    placeholder="Telefone" 
                                    className="border-2 border-[#76AABF]/30 rounded-lg p-4 focus:border-[#034153] focus:outline-none transition-colors bg-white text-[#678391] placeholder-[#96A3AB]" 
                                />
                                <input 
                                    type="tel" 
                                    placeholder="Celular" 
                                    className="border-2 border-[#76AABF]/30 rounded-lg p-4 focus:border-[#034153] focus:outline-none transition-colors bg-white text-[#678391] placeholder-[#96A3AB]" 
                                />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Título do Assunto" 
                                className="border-2 border-[#76AABF]/30 rounded-lg p-4 focus:border-[#034153] focus:outline-none transition-colors bg-white text-[#678391] placeholder-[#96A3AB]" 
                            />
                            <textarea 
                                placeholder="Escreva sua mensagem..." 
                                rows={5} 
                                className="border-2 border-[#76AABF]/30 rounded-lg p-4 focus:border-[#034153] focus:outline-none transition-colors bg-white text-[#678391] placeholder-[#96A3AB] resize-vertical" 
                            />
                            <button 
                                type="submit" 
                                className="bg-gradient-to-r from-[#034153] to-[#056174] text-white rounded-lg p-4 font-semibold text-lg hover:from-[#056174] hover:to-[#034153] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            >
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>

                {/* Seção de Localização (Opcional) */}
                <div className="px-6 md:px-20 py-16">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#034153]">
                        <h3 className="text-3xl font-bold text-center text-[#034153] mb-8">Nossa Localização</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h4 className="text-xl font-bold text-[#056174] mb-4">Endereço</h4>
                                <div className="space-y-3 text-[#678391]">
                                    <p className="flex items-start gap-2">
                                        <span className="font-semibold text-[#034153]">Rua:</span>
                                        Av. Paulista, 1000 - Conjunto 123
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="font-semibold text-[#034153]">Bairro:</span>
                                        Bela Vista
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="font-semibold text-[#034153]">Cidade:</span>
                                        São Paulo - SP
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="font-semibold text-[#034153]">CEP:</span>
                                        01310-100
                                    </p>
                                </div>
                            </div>
                            <div className="bg-[#e8f4f8] p-6 rounded-xl">
                                <h4 className="text-xl font-bold text-[#056174] mb-4">Como Chegar</h4>
                                <ul className="space-y-2 text-[#678391]">
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#76AABF]"></div>
                                        Estação Trianon-MASP (Linha Verde)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#76AABF]"></div>
                                        Várias linhas de ônibus na Av. Paulista
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#76AABF]"></div>
                                        Estacionamento no edifício
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contato