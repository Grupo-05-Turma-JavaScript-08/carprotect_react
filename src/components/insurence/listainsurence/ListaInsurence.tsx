import { useEffect, useState } from "react";
import { buscar } from "../../../services/Service";
import type Insurance from "../../../models/Insurence";
import { motion } from "framer-motion";
import { Link, ShieldCheck } from "@phosphor-icons/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import CardInsurence from "../cardinsurence/CardInsurence";

function ListaInsurance() {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [insurances, setInsurances] = useState<Insurance[]>([]);

    useEffect(() => {
        buscarInsurances();
    }, [insurances.length]);

    async function buscarInsurances() {
        setIsLoading(true);

        await buscar('/insurance', setInsurances);

        setIsLoading(false);
    }

    return (
       <>
  <div className="p-4 ml-80 mr-20 mx-auto bg-[#034153] ">
        {isLoading && (
          <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm z-50">
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full opacity-30"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className="relative z-10 w-56 h-56"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="" // Logo de seguro
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              </motion.div>
            </div>

            <motion.span
              className="mt-4 text-gray-700 font-medium"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Carregando eletrônicos...
            </motion.span>
          </div>
        )}

        
  <div className="flex flex-col text-[#76AABF] font-sans">
          <div className="flex items-center justify-between px-4 md:px-10 py-6 mb-16 bg-[#678391] rounded-xl">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-[#034153]">
              <ShieldCheck size={35} weight="bold" /> Seguros
            </h1>
            <div className="flex flex-wrap items-center gap-4">
             
             <Link to='/cadastrarseguro'>
                <button className="px-5 py-2 rounded-lg bg-[#056174] text-white font-medium hover:bg-[#76AABF] transition flex items-center gap-2 active:bg-[#76AABF]/30">
                  <Plus size={20} weight="bold" /> Novo Seguro
                </button>
            </Link>

              <span className="px-5 py-2 rounded-lg bg-[#96A3AB] text-[#034153] font-medium flex items-center gap-2 whitespace-nowrap">
                {new Date().toLocaleString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
              <span className="px-5 py-2 rounded-lg bg-[#96A3AB] text-[#034153] font-medium flex items-center gap-2 whitespace-nowrap">
                {new Date().toLocaleString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>

              <span className="ml-4 px-4 py-2 rounded-full bg-[#76AABF]/50 text-[#034153] text-xs font-semibold gap-2 flex whitespace-nowrap">
                <span className="text-[#056174] font-bold">●</span> Sistema Online
              </span>
            </div>
          </div>

          <div className="bg-[#96A3AB]/10 rounded-2xl shadow-lg p-6 mx-4 md:mx-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold flex items-center gap-2 text-[#034153] justify-center mb-6">
                Seguros Disponiveis
              </h1>
              <div className="flex flex-wrap justify-center gap-15">
               {insurances.map((insurance) => (
                    <CardInsurence key={insurance.id} insurance={insurance} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
        
    
    )
}

export default ListaInsurance
