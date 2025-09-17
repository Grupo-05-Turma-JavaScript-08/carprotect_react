import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  
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
    '/deletarseguro'
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
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold">
            <img 
              src="https://i.ibb.co/7dYs2wWs/output-onlinepngtools.png" 
              alt="output-onlinepngtools" 
              className="w-50 -m-10"
            />
          </Link>

          <div className="flex gap-4 text-lg">
            <Link to="/quem-somos" className="hover:underline">
              Quem Somos
            </Link>
            <Link to="/contato" className="hover:underline">
              Contato
            </Link>
          </div>
        </div>

        <div className="flex gap-4">
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
      </nav>
    </header>
  );
}

export default Navbar;