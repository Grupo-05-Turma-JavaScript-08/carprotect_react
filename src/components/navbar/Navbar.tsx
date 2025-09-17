import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lista de rotas onde a navbar NÃO deve aparecer
  const hiddenNavbarRoutes = [
    '/dashboard',
    '/dashboardadmin',
    '/dashboardcliente',
    '/cadastrarcarro',
    '/editarcarro',
    '/deletarcarro',
    '/cadastrarseguro',
    '/editarseguro',
    '/deletarseguro',
    
    
  ];

  // Verificar se a rota atual está na lista de rotas ocultas
  // Também verifica rotas dinâmicas como /editarcarro/123
  const shouldHideNavbar = hiddenNavbarRoutes.some(route =>
    location.pathname === route || location.pathname.startsWith(route + '/')
  );

  // Se deve esconder, retorna null (componente não renderiza)
  if (shouldHideNavbar) {
    return null;
  }

  return (
    <header className="bg-gray-200 text-[#678391]">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 relative">

        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold">
            <img
              src="https://i.ibb.co/7dYs2wWs/output-onlinepngtools.png"
              alt="output-onlinepngtools"
              className="w-40 md:w-50 -m-10"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 text-lg">
          <Link to="/quem-somos" className="hover:underline">
            Quem Somos
          </Link>
          <Link to="/contato" className="hover:underline">
            Contato
          </Link>
        </div>
        <div className="hidden md:flex gap-4">
          <Link
            to="/logar"
            className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Área do Cliente
          </Link>

          <Link
            to="/logar"
            className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-500 transition"
          >
            Área do Corretor
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <List size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-200 md:hidden z-20">
            <div className="flex flex-col items-center gap-4 text-lg p-4">
              <Link to="/quem-somos" className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                Quem Somos
              </Link>
              <Link to="/contato" className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                Contato
              </Link>
              <Link
                to="/logar"
                className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Área do Cliente
              </Link>
              <Link
                to="/logar"
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-500 transition w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Área do Corretor
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;