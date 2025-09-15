import { EnvelopeSimpleIcon, PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react"

function Contato() {
    return (
        <>
            <div className="grid grid-rows-2 gap-10 bg-sky-900">

                <div className="grid grid-cols-2 items-center rounded-2xl m-20 my-auto bg-slate-300 ">
                    <div className="flex justify-center md:justify-start">
                        <div className="flex flex-col gap-20 justify-center items-center ">
                            <h1 className="text-7xl font-extrabold text-black">
                                Fale Conosco
                            </h1>
                            <p className="text-black text-2xl font-semibold w-3/4 text-center">Tem alguma dúvida, precisa de uma cotação ou quer saber mais sobre nossos serviços?

                                Estamos à disposição para te ajudar! Entre em contato conosco através do formulário abaixo ou pelos nossos canais de atendimento. Nossa equipe está pronta para oferecer o melhor suporte e as soluções ideais para suas necessidades de seguro.

                                Preencha o formulário ao lado e retornaremos o mais breve possível.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end ">
                        <img
                            src="https://i.ibb.co/RpPCSchv/Imagem-do-Whats-App-de-2025-09-14-as-13-41-39-ba89d92a.jpg"
                            alt="Imagem família sorrindo no carro"
                            className=" rounded-r-2xl h-160 w-auto"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-20 bg-slate-200 items-start px-100 py-10">
                    <div className="flex flex-col items-start gap-6">
                        <h3 className="text-3xl font-bold text-gray-800">Entre em contato</h3>
                        <div className="flex items-center gap-6">
                            <PhoneIcon size={48} />
                            <WhatsappLogoIcon size={48} />
                            <EnvelopeSimpleIcon size={48} />
                        </div>
                        <span className="text-gray-700 font-medium mt-4 text-lg">
                            contato@seudominio.com
                        </span>
                    </div>
                    
                    <div className=" w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
                        <h2 className="text-3xl text-center mb-4 ">Formulario</h2>
                        <form className="flex flex-col space-y-4">
                            <input name="nome" type="text" placeholder="Nome" className="border rounded-md p-3" />
                            <input type="email" placeholder="E-mail" className="border rounded-md p-3" />
                            <input type="tel" placeholder="Telefone" className="border rounded-md p-3" />
                            <input type="tel" placeholder="Celular" className="border rounded-md p-3" />
                            <input type="text" placeholder="Título do Assunto" className="border rounded-md p-3" />
                            <textarea placeholder="Escreva sua mensagem..." rows={4} className="border rounded-md p-3" />
                            <button type="submit" className="bg-blue-700 text-white rounded-md p-3 hover:bg-blue-800">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contato
