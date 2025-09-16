import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type Car from "../../../models/Car";
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { Link, useNavigate } from "react-router-dom";
import { PencilSimple, Trash } from "phosphor-react";

function ListaCar() {
   const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [car, setCar] = useState<Car[]>([]);
  const { user, handleLogout } = useContext(AuthContext);
    const token = user.token;


    //  useEffect(() => {
    //     if (token === '') {
    //         ToastAlerta('O Usuário precisa estar logado!', 'warning');
    //         navigate('/');
    //     }
    // }, [token]);
    
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
        <div className="flex flex-col bg-black">
           <h1 className="text-white">Teste</h1>
        

        </div>
      </div>
    </>
  );
}

export default ListaCar;

  