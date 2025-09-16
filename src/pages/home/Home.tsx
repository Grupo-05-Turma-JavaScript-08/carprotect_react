import { CarBatteryIcon, ClockIcon, KeyIcon, TireIcon, TrophyIcon } from "@phosphor-icons/react"

function Home() {
    return (
        <section className="bg-sky-900 flex justify-center items-center py-10 px-6 flex-col">
            <div className="flex flex-row w-full max-w-7xl ">


                <div className="w-1/2 flex flex-col justify-center ">
                    <h3 className="text-white text-lg bg-sky-800 w-1/3 -mb-5 ">
                        CarProtec  Seguro para
                    </h3>
                    <h1 className="text-8xl font-bold text-white">
                        Automóveis
                    </h1>
                    <div className="relative">
                        <img
                            src="https://i.ibb.co/xqZxzmH1/output-onlinepngtools-1.png"
                            alt="Carro com família sorrindo"
                            className="mt-6 rounded-lg relative z-10"
                        />
                        <img src="https://i.ibb.co/DD7gYbCk/3645816-Photoroom.png" alt=""
                            className="w-1/2 absolute -top-15 -left-15" />
                    </div>
                </div>


                <div className="w-1/2 flex justify-center">
                    <div className="bg-slate-200 rounded-2xl shadow-lg w-full max-w-md">
                        <div className="bg-sky-400 text-white rounded-t-2xl p-2">
                            <h2 className="text-2xl  text-center">
                                Solicite uma
                            </h2>
                            <h3 className="text-4xl font-bold text-center mb-2">
                                cotação gratuita
                            </h3>
                        </div>
                        <div className="p-8">
                            <form className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    className="p-2 rounded border border-gray-300"
                                />
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    className="p-2 rounded border border-gray-300"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="tel"
                                        placeholder="Telefone"
                                        className="p-2 rounded border border-gray-300 w-1/2"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Celular"
                                        className="p-2 rounded border border-gray-300 w-1/2"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <select className="p-2 rounded border border-gray-300 w-1/2">
                                        <option>Carro</option>
                                        <option>Moto</option>
                                        <option>Caminhão</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Montadora"
                                        className="p-2 rounded border border-gray-300 w-1/2"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Modelo do Veículo"
                                        className="p-2 rounded border border-gray-300 w-1/2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Ano do Veículo"
                                        className="p-2 rounded border border-gray-300 w-1/2"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Placa do Veículo"
                                        className="p-2 rounded border border-gray-300 w-1/2"
                                    />
                                    <select className="p-2 rounded border border-gray-300 w-1/2">
                                        <option>Já possui o Veículo?</option>
                                        <option>Sim</option>
                                        <option>Não</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-sky-900 text-white font-bold py-3 rounded-lg hover:bg-sky-800 transition"
                                >
                                    COTAR AGORA
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bg-white w-full flex justify-center flex-row">

                <div className="flex flex-col items-center gap-2 p-10" >
                    <div className="bg-sky-400 rounded-full p-5">
                        <ClockIcon size={80} color="black" weight="fill" />

                    </div>
                    <span className="text-2xl font-bold">Suporte 24h</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-10" >
                    <div className="bg-sky-400 rounded-full p-5">
                        <KeyIcon size={80} color="black" weight="fill" />

                    </div>
                    <span className="text-2xl font-bold">Servico de Chaveiro</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-10" >
                    <div className="bg-sky-400 rounded-full p-5">
                        <TrophyIcon size={80} color="black" weight="fill" />

                    </div>
                    <span className="text-2xl font-bold">Abrangência Nacional</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-10" >
                    <div className="bg-sky-400 rounded-full p-5">
                       
                            <TireIcon size={80} color="black" weight="fill" />
                     
                    </div>
                    <span className="text-2xl font-bold">Troca de Pneus </span>
                </div>
                <div className="flex flex-col items-center gap-2 p-10" >
                    <div className="bg-sky-400 rounded-full p-5">
                        <CarBatteryIcon size={80} color="black" weight="fill" />

                    </div>
                    <span className="text-2xl font-bold">Carga de Bateria</span>
                </div>
            </div>

            <div className="bg-white w-full flex justify-center flex-row">

            </div>
        </section>
    )
}

export default Home
