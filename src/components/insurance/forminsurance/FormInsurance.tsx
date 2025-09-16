import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type Insurance from "../../../models/Insurance";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlert";
import { motion } from "framer-motion";

function ListaInsurance() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [insurances, setInsurances] = useState<Insurance[]>([]);

    const { user, handleLogout } = useContext(AuthContext);
    const token = user.token;

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Sua sessão expirou, por favor, logue novamente!', 'info');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarInsurances();
    }, [insurances.length]);

    async function buscarInsurances() {
        try {

            setIsLoading(true);

            await buscar('/plano', setInsurances, {
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


    return (
        <>
        <div className="p-4 ml-80  mr-20 mx-auto">
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
                  src=" " //Colocar logo da empresa pra transição
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
              Carregando carros...
            </motion.span>
          </div>
        )}

        {/* Conteúdo principal */}
        <div className="flex flex-col">
          
        </div>
      </div>
        </>
    )
}

export default ListaInsurance