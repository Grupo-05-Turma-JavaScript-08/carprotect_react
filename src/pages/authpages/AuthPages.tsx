import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
    
    <div className="grid grid-cols-2 h-screen bg-[#056174]">
      
      {/* Card centralizado na primeira coluna */}
      <div className="flex items-center justify-center">
        <div className="w-[400px] bg-gray-300 shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-10">
            {isLogin ? "Login" : "Cadastro"}
          </h2>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col space-y-4"
              >
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#056174] text-white py-2 rounded-lg hover:bg-[#028998] cursor-pointer"
                >
                  Entrar
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="cadastro"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col space-y-4"
              >
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Digite seu melhor email"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-2 border rounded-lg"
                />

                <input
                  type="password"
                  placeholder="Confirme sua Senha"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="w-full bg-[#056174] text-white py-2 rounded-lg hover:bg-[#028998] transition cursor-pointer"
                >
                  Cadastrar
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Alternar login/cadastro */}
          <p className="text-center mt-6 text-sm font-bold">
            {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#056174] font-bold hover:underline"
            >
              {isLogin ? "Cadastre-se" : "Entrar"}
            </button>
          </p>
        </div>
      </div>

      {/* Imagem na segunda coluna */}
      <div className="flex items-center justify-center">
        <img
          src="https://i.ibb.co/xqZxzmH1/output-onlinepngtools-1.png"
          alt="Imagem Logo"
          className="max-h-[500px] object-contain"
        />
      </div>
    </div>
    </>
  );
}
