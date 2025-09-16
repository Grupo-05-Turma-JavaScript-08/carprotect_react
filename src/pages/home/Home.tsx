import { useEffect, useRef, useState } from "react";
import ModalRating from "../../components/rating/modalrating/ModalRating";

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasInputChanged, setHasInputChanged] = useState(false);
    const timerRef = useRef<number | null>(null);

    const whatsappNumber = "5511999999999";
    const whatsappMessage = "Olá, gostaria de saber mais sobre o seguro!";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


    // em todos input onChange={handleInputChange}
    const handleInputChange = () => {
        if (!hasInputChanged) {
            setHasInputChanged(true);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                console.log("Input preenchido. O modal não irá aparecer.");
            }
        }
    };
    // onClick={handleQuoteClick}   no botão de cotação
    const handleQuoteClick = (e: { preventDefault: () => void; }) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setHasInputChanged(true);
        e.preventDefault();
    };

    useEffect(() => {
        if (!hasInputChanged) {
            timerRef.current = setTimeout(() => {
                setIsModalOpen(true);
            }, 30000);
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
            <section className="bg-sky-900 flex justify-center items-center py-10 px-6 flex-col">
                <div className="flex flex-col lg:flex-row w-full max-w-7xl justify-center ">


                    <article className="w-full lg:w-1/2 flex flex-col justify-center ">
                        <h3 className="text-white text-lg bg-sky-800 w-full md:w-1/3 -mb-5 justify-center flex">
                            CarProtec  Seguro para
                        </h3>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white">
                            Automóveis
                        </h1>
                        <div className="relative left-15">
                            <img
                                src="https://i.ibb.co/xqZxzmH1/output-onlinepngtools-1.png"
                                alt="Carro com família sorrindo"
                                className="mt-6 rounded-lg relative z-10 "
                            />
                            <img src="https://i.ibb.co/DD7gYbCk/3645816-Photoroom.png" alt=""
                                className="w-1/2 absolute -top-15 -left-15" />
                        </div>
                    </article>


                    <article className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
                        <div className="bg-gray-100 rounded-2xl shadow-lg w-full max-w-md">
                            <div className="bg-sky-400 text-white rounded-t-2xl p-2">
                                <h2 className="text-2xl  text-center">
                                    Solicite uma
                                </h2>
                                <h3 className="text-4xl font-bold text-center mb-2">
                                    cotação gratuita
                                </h3>
                            </div>
                            <div className="p-8 bg-gray-100">
                                <form className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        placeholder="Nome"
                                        className="p-2 rounded border border-gray-300 bg-white"
                                    />
                                    <input
                                        type="email"
                                        placeholder="E-mail"
                                        className="p-2 rounded border border-gray-300 bg-white"
                                    />
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="tel"
                                            placeholder="Telefone"
                                            className="p-2 rounded border border-gray-300 w-full sm:w-1/2 bg-white"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Celular"
                                            className="p-2 rounded border border-gray-300 w-full sm:w-1/2 bg-white"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <select className="p-2 rounded border border-gray-300 w-full sm:w-1/2 bg-white">
                                            <option>Carro</option>
                                            <option>Moto</option>
                                            <option>Caminhão</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Montadora"
                                            className="p-2 rounded border border-gray-300 w-full sm:w-1/2 bg-white"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            placeholder="Modelo do Veículo"
                                            className="p-2 rounded border border-gray-300 w-full sm:w-1/2 bg-white"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Ano do Veículo"
                                            className="p-2 rounded border border-gray-300 w-full sm:w-1/2 bg-white"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            placeholder="Placa do Veículo"
                                            className="p-2 rounded border border-gray-300 w-full sm:w-1/2 bg-white"
                                        />
                                        <select className="p-2 rounded border border-gray-300 w-full sm:w-1/2 bg-white">
                                            <option>Já possui o Veículo?</option>
                                            <option>Sim</option>
                                            <option>Não</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-sky-900 text-white font-bold py-3 rounded-lg hover:bg-sky-800 transition"
                                        onClick={handleQuoteClick}
                                    >
                                        COTAR AGORA
                                    </button>
                                </form>
                            </div>
                        </div>
                    </article>

                </div>
                <article className="mt-10 bg-gradient-to-r from-sky-50 to-sky-100 w-full lg:w-2/3 flex justify-center flex-wrap rounded-t-2xl items-center" >

                    <div className="flex flex-col items-center gap-3 p-5 md:p-10" >
                        <div className="bg-sky-400 rounded-full p-5 flex items-center justify-center">
                            <ClockIcon size={60} color="black" weight="fill" />

                        </div>
                        <span className="text-xl font-bold text-center">Suporte 24h</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 p-5 md:p-10" >
                        <div className="bg-sky-400 rounded-full p-5 flex items-center justify-center">
                            <KeyIcon size={60} color="black" weight="fill" />

                        </div>
                        <span className="text-xl font-bold text-center">Servico de Chaveiro</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-5 md:p-10"  >
                        <div className="bg-sky-400 rounded-full p-5 flex items-center justify-center">
                            <TrophyIcon size={60} color="black" weight="fill" />

                        </div>
                        <span className="text-xl font-bold text-center">Abrangência Nacional</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 p-5 md:p-10" >
                        <div className="bg-sky-400 rounded-full p-5 flex items-center justify-center">

                            <TireIcon size={60} color="black" weight="fill" />

                        </div>
                        <span className="text-xl font-bold text-center">Troca de Pneus </span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-5 md:p-10" >
                        <div className="bg-sky-400 rounded-full p-5 flex items-center justify-center">
                            <CarBatteryIcon size={60} color="black" weight="fill" />

                        </div>
                        <span className="text-xl font-bold text-center">Carga de Bateria</span>
                    </div>
                </article>

                <div className="p-5 bg-gray-100 w-full lg:w-2/3  justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-b-2xl">
                    <div className="flex items-center justify-center p-6">
                        <div className="w-full max-w-md bg-sky-950 text-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                            <div className="p-6 space-y-4 flex flex-col justify-center items-center">
                                <div className="space-y-4 w-50 flex flex-col  items-center justify-center">
                                    <h3 className="text-2xl font-bold text-white mx-auto">
                                        Seguro Auto Completo
                                    </h3>
                                    <p className="text-white text-base">
                                        Proteção completa para seu veículo com cobertura contra colisões, roubo, furto e danos a terceiros.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-between p-4">
                                    <span className="text-white">a partir de:</span>
                                    <div className="flex ">

                                        <span className="font-bold text-green-600">R$ </span>
                                        <span className="text-5xl font-bold text-green-600">189</span>


                                        <div className="flex flex-col">
                                            <span className="font-bold text-green-600">,90</span>
                                            <span className="font-bold text-green-600">/mês</span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="p-6 pt-0">
                                <button
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center"
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
                    <div className="flex items-center justify-center p-6">
                        <div className="w-full max-w-md bg-sky-950 text-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                            <div className="p-6 space-y-4 flex flex-col justify-center items-center">
                                <div className="space-y-4 w-50 flex flex-col  items-center justify-center">
                                    <h3 className="text-2xl font-bold text-white mx-auto">
                                        Seguro Auto Completo
                                    </h3>
                                    <p className="text-white text-base">
                                        Proteção completa para seu veículo com cobertura contra colisões, roubo, furto e danos a terceiros.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-between p-4">
                                    <span className="text-white">a partir de:</span>
                                    <div className="flex ">

                                        <span className="font-bold text-green-600">R$ </span>
                                        <span className="text-5xl font-bold text-green-600">189</span>


                                        <div className="flex flex-col">
                                            <span className="font-bold text-green-600">,90</span>
                                            <span className="font-bold text-green-600">/mês</span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="p-6 pt-0">
                                <button
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center"
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
                    <div className="flex items-center justify-center p-6">
                        <div className="w-full max-w-md bg-sky-950 text-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                            <div className="p-6 space-y-4 flex flex-col justify-center items-center">
                                <div className="space-y-4 w-50 flex flex-col  items-center justify-center">
                                    <h3 className="text-2xl font-bold text-white mx-auto">
                                        Seguro Auto Completo
                                    </h3>
                                    <p className="text-white text-base">
                                        Proteção completa para seu veículo com cobertura contra colisões, roubo, furto e danos a terceiros.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-between p-4">
                                    <span className="text-white">a partir de:</span>
                                    <div className="flex ">

                                        <span className="font-bold text-green-600">R$ </span>
                                        <span className="text-5xl font-bold text-green-600">189</span>


                                        <div className="flex flex-col">
                                            <span className="font-bold text-green-600">,90</span>
                                            <span className="font-bold text-green-600">/mês</span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="p-6 pt-0">
                                <button
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center"
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
            </section >
        </>
    );
}

export default Home;
