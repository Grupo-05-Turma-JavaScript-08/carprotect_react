import { useEffect, useRef, useState } from "react";
import ModalRating from "../../components/rating/modalrating/ModalRating";
import { CarBatteryIcon, ClockIcon, KeyIcon, TireIcon, TrophyIcon } from "@phosphor-icons/react";
import { ToastAlerta } from "../../utils/ToastAlerta";
import WhatsApp from "../../components/whatsapp/WhatsApp";

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasInputChanged, setHasInputChanged] = useState(false);
    const timerRef = useRef<number | null>(null);

    const whatsappNumber = "5511999999999";
    const whatsappMessage = "Olá, gostaria de saber mais sobre o seguro!";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        celular: '',
        tipoVeiculo: 'Carro',
        montadora: '',
        modelo: '',
        ano: '',
        placa: '',
        possuiVeiculo: 'Já possui o Veículo?',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (!hasInputChanged) {
            setHasInputChanged(true);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                console.log("Input preenchido. O modal não irá aparecer.");
            }
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setHasInputChanged(true);

        const { nome, email, telefone, celular, tipoVeiculo, montadora, modelo, ano, placa, possuiVeiculo } = formData;

        if (!nome || !email || !celular) {
            ToastAlerta("Por favor, preencha os campos Nome, E-mail e Celular.", "erro");
            return;
        }

        const message = `Olá, gostaria de uma cotação de seguro com as seguintes informações:
        Nome: ${nome}
        E-mail: ${email}
        Telefone: ${telefone}
        Celular: ${celular}
        Tipo de Veículo: ${tipoVeiculo}
        Montadora: ${montadora}
        Modelo: ${modelo}
        Ano: ${ano}
        Placa: ${placa}
        Possui o veículo?: ${possuiVeiculo}`;

        const whatsappQuoteLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappQuoteLink, '_blank');
    };



    useEffect(() => {
        if (!hasInputChanged) {
            timerRef.current = setTimeout(() => {
                setIsModalOpen(true);
            }, 9000);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [hasInputChanged]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ModalRating isOpen={isModalOpen} onClose={handleCloseModal} />
            <WhatsApp/>

            <section className="bg-gradient-to-br from-[#f7f9fb] to-[#e8eef3] flex justify-center items-center py-10 px-6 flex-col min-h-screen">
                <div className="flex flex-col lg:flex-row w-full max-w-7xl justify-center">

                    <article className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start">
                        <div className="flex justify-center lg:justify-start items-baseline">
                            <h3 className="text-[#056174] text-4xl sm:text-5xl flex items-center">
                                Seguro
                            </h3>
                            <span className="text-[#056174] text-2xl ml-2 font-bold">de</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#034153]">
                            Automóveis
                        </h1>
                        <div className="relative mt-6 w-full max-w-lg mx-auto lg:mx-0">
                            <img
                                src="https://i.ibb.co/xqZxzmH1/output-onlinepngtools-1.png"
                                alt="Carro com família sorrindo"
                                className="rounded-lg relative z-10 transition-transform duration-500 hover:scale-105 w-full"
                            />
                            <img src="https://i.ibb.co/DD7gYbCk/3645816-Photoroom.png" alt=""
                                className="w-1/2 absolute -top-10 -left-10 sm:-top-15 sm:-left-15 opacity-80" />
                        </div>
                    </article>

                    <article className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border-t-4 border-[#034153] ">
                            <div className=" text-[#034153] rounded-t-2xl p-2">
                                <h2 className="text-2xl text-center">
                                    Solicite uma
                                </h2>
                                <h3 className="text-4xl font-bold text-center mb-2">
                                    cotação gratuita
                                </h3>
                            </div>
                            <div className="p-8 bg-white">
                                <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                                    <input
                                        type="text"
                                        name="nome"
                                        placeholder="Nome"
                                        className="p-3 rounded-lg border-2 border-[#76AABF]/30 bg-white focus:border-[#034153] focus:outline-none transition-colors"
                                        onChange={handleChange}
                                        value={formData.nome}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-mail"
                                        className="p-3 rounded-lg border-2 border-[#76AABF]/30 bg-white focus:border-[#034153] focus:outline-none transition-colors"
                                        onChange={handleChange}
                                        value={formData.email}
                                    />
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="tel"
                                            name="telefone"
                                            placeholder="Telefone"
                                            className="p-3 rounded-lg border-2 border-[#76AABF]/30 w-full sm:w-1/2 bg-white focus:border-[#034153] focus:outline-none transition-colors"
                                            onChange={handleChange}
                                            value={formData.telefone}
                                        />
                                        <input
                                            type="tel"
                                            name="celular"
                                            placeholder="Celular"
                                            className="p-3 rounded-lg border-2 border-[#76AABF]/30 w-full sm:w-1/2 bg-white focus:border-[#034153] focus:outline-none transition-colors"
                                            onChange={handleChange}
                                            value={formData.celular}
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <select name="tipoVeiculo" onChange={handleChange} value={formData.tipoVeiculo} className="p-3 rounded-lg border-2 border-[#76AABF]/30 w-full sm:w-1/2 bg-white focus:border-[#034153] focus:outline-none transition-colors text-[#678391]">
                                            <option>Carro</option>
                                            <option>Moto</option>
                                            <option>Caminhão</option>
                                        </select>
                                        <input
                                            type="text"
                                            name="montadora"
                                            placeholder="Montadora"
                                            className="p-3 rounded-lg border-2 border-[#76AABF]/30 w-full sm:w-1/2 bg-white focus:border-[#034153] focus:outline-none transition-colors"
                                            onChange={handleChange}
                                            value={formData.montadora}
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            name="modelo"
                                            placeholder="Modelo do Veículo"
                                            className="p-3 rounded-lg border-2 border-[#76AABF]/30 w-full sm:w-1/2 bg-white focus:border-[#034153] focus:outline-none transition-colors"
                                            onChange={handleChange}
                                            value={formData.modelo}
                                        />
                                        <input
                                            type="text"
                                            name="ano"
                                            placeholder="Ano do Veículo"
                                            className="p-3 rounded-lg border-2 border-[#76AABF]/30 w-full sm:w-1/2 bg-white focus:border-[#034153] focus:outline-none transition-colors"
                                            onChange={handleChange}
                                            value={formData.ano}
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            name="placa"
                                            placeholder="Placa do Veículo"
                                            className="p-3 rounded-lg border-2 border-[#76AABF]/30 w-full sm:w-1/2 bg-white focus:border-[#034153] focus:outline-none transition-colors"
                                            onChange={handleChange}
                                            value={formData.placa}
                                        />
                                        <select name="possuiVeiculo" onChange={handleChange} value={formData.possuiVeiculo} className="p-3 rounded-lg border-2 border-[#76AABF]/30 w-full sm:w-1/2 bg-white focus:border-[#034153] focus:outline-none transition-colors text-[#678391]">
                                            <option>Já possui o Veículo?</option>
                                            <option>Sim</option>
                                            <option>Não</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-[#034153] to-[#056174] text-white font-bold py-4 rounded-lg hover:from-[#056174] hover:to-[#034153] transition-all duration-300 hover:cursor-pointer hover:shadow-lg transform hover:scale-105"
                                    >
                                        COTAR AGORA
                                    </button>
                                </form>
                            </div>
                        </div>
                    </article>

                </div>

                {/* Seção de Serviços */}
                <article className="mt-10 bg-white w-full max-w-7xl flex flex-wrap justify-center rounded-2xl items-center shadow-xl border-t-4 border-[#034153]">
                    <div className="flex flex-col items-center gap-3 p-4 md:p-6 lg:p-8">
                        <div className="bg-[#76AABF] rounded-full p-4 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                            <ClockIcon size={48} color="#034153" weight="fill" />
                        </div>
                        <span className="text-lg font-bold text-center text-[#034153]">Suporte 24h</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 p-4 md:p-6 lg:p-8">
                        <div className="bg-[#76AABF] rounded-full p-4 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                            <KeyIcon size={48} color="#034153" weight="fill" />
                        </div>
                        <span className="text-lg font-bold text-center text-[#034153]">Serviço de Chaveiro</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 p-4 md:p-6 lg:p-8">
                        <div className="bg-[#76AABF] rounded-full p-4 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                            <TrophyIcon size={48} color="#034153" weight="fill" />
                        </div>
                        <span className="text-lg font-bold text-center text-[#034153]">Abrangência Nacional</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 p-4 md:p-6 lg:p-8">
                        <div className="bg-[#76AABF] rounded-full p-4 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                            <TireIcon size={48} color="#034153" weight="fill" />
                        </div>
                        <span className="text-lg font-bold text-center text-[#034153]">Troca de Pneus</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 p-4 md:p-6 lg:p-8">
                        <div className="bg-[#76AABF] rounded-full p-4 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                            <CarBatteryIcon size={48} color="#034153" weight="fill" />
                        </div>
                        <span className="text-lg font-bold text-center text-[#034153]">Carga de Bateria</span>
                    </div>
                </article>

                {/* Cards de Planos */}
                <div className="p-8 bg-gradient-to-br from-[#e8f4f8] to-white w-full max-w-7xl justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-b-2xl shadow-xl gap-6">
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden border-t-4 border-[#034153] transform transition-all duration-300 hover:scale-105">
                            <div className="p-6 space-y-4 flex flex-col justify-center items-center">
                                <div className="space-y-4 w-full flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-bold text-[#034153] mx-auto text-center">
                                        Seguro Auto Completo
                                    </h3>
                                    <p className="text-[#678391] text-base text-center">
                                        Proteção completa para seu veículo com cobertura contra colisões, roubo, furto e danos a terceiros.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-between p-4">
                                    <span className="text-[#056174] font-medium">a partir de:</span>
                                    <div className="flex items-baseline">
                                        <span className="font-bold text-[#76AABF] text-lg">R$ </span>
                                        <span className="text-5xl font-bold text-[#76AABF]">189</span>
                                        <div className="flex flex-col ml-1">
                                            <span className="font-bold text-[#76AABF] text-lg">,90</span>
                                            <span className="font-bold text-[#76AABF] text-sm">/mês</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 pt-0">
                                <button
                                    className="w-full bg-gradient-to-r from-[#034153] to-[#056174] hover:from-[#056174] hover:to-[#034153] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center hover:cursor-pointer transition-all duration-300 transform hover:scale-105"
                                    onClick={() => window.open(whatsappLink, '_blank')}
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                                    </svg>
                                    Falar no WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden border-t-4 border-[#056174] transform transition-all duration-300 hover:scale-105">
                            <div className="p-6 space-y-4 flex flex-col justify-center items-center">
                                <div className="space-y-4 w-full flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-bold text-[#056174] mx-auto text-center">
                                        Seguro Auto Intermediário
                                    </h3>
                                    <p className="text-[#678391] text-base text-center">
                                        Proteção essencial para seu veículo com cobertura contra roubo, furto e principais danos.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-between p-4">
                                    <span className="text-[#056174] font-medium">a partir de:</span>
                                    <div className="flex items-baseline">
                                        <span className="font-bold text-[#76AABF] text-lg">R$ </span>
                                        <span className="text-5xl font-bold text-[#76AABF]">149</span>
                                        <div className="flex flex-col ml-1">
                                            <span className="font-bold text-[#76AABF] text-lg">,90</span>
                                            <span className="font-bold text-[#76AABF] text-sm">/mês</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 pt-0">
                                <button
                                    className="w-full bg-gradient-to-r from-[#034153] to-[#056174] hover:from-[#056174] hover:to-[#034153] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center hover:cursor-pointer transition-all duration-300 transform hover:scale-105"
                                    onClick={() => window.open(whatsappLink, '_blank')}
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                                    </svg>
                                    Falar no WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden border-t-4 border-[#034153] transform transition-all duration-300 hover:scale-105">
                            <div className="p-6 space-y-4 flex flex-col justify-center items-center">
                                <div className="space-y-4 w-full flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-bold text-[#034153] mx-auto text-center">
                                        Seguro Auto Básico
                                    </h3>
                                    <p className="text-[#678391] text-base text-center">
                                        Proteção fundamental para seu veículo com cobertura básica contra principais riscos.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-between p-4">
                                    <span className="text-[#056174] font-medium">a partir de:</span>
                                    <div className="flex items-baseline">
                                        <span className="font-bold text-[#76AABF] text-lg">R$ </span>
                                        <span className="text-5xl font-bold text-[#76AABF]">119</span>
                                        <div className="flex flex-col ml-1">
                                            <span className="font-bold text-[#76AABF] text-lg">,90</span>
                                            <span className="font-bold text-[#76AABF] text-sm">/mês</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 pt-0">
                                <button
                                    className="w-full bg-gradient-to-r from-[#034153] to-[#056174] hover:from-[#056174] hover:to-[#034153] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center hover:cursor-pointer transition-all duration-300 transform hover:scale-105"
                                    onClick={() => window.open(whatsappLink, '_blank')}
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                                    </svg>
                                    Falar no WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
