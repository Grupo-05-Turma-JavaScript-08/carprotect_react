import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-gray-500 text-white">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold">
            CarProtect
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
