import { LinkedinLogo, InstagramLogo, FacebookLogo } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();

  // Lista de rotas onde o footer NÃO deve aparecer
  const hiddenFooterRoutes = [
    '/dashboard',
    '/dashboardadmin',
    '/dashboardcliente',
    '/cadastrarcarro',
    '/editarcarro',
    '/deletarcarro',
    '/cadastrarseguro',
    '/editarseguro',
    '/deletarseguro',
    '/suporte'
  ];

  // Verificar se a rota atual está na lista de rotas ocultas
  const shouldHideFooter = hiddenFooterRoutes.some(route =>
    location.pathname === route || location.pathname.startsWith(route + '/')
  );

  if (shouldHideFooter) {
    return null;
  }

  return (
    <footer className="bg-gray-200 text-[#678391]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Entre em contato</h3>
            <ul className="text-sm space-y-1">
              <li>
                <span className="font-medium">Telefone:</span>{" "}
                <a
                  href="tel:08007777777"
                  className="hover:underline"
                  aria-label="Ligar para 0800 777 7777"
                >
                  0800 777 7777
                </a>
              </li>
              <li>
                <span className="font-medium">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/5511977777777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  aria-label="Abrir WhatsApp"
                >
                  (11) 97777-7777
                </a>
              </li>
              <li>
                <span className="font-medium">E-mail:</span>{" "}
                <a
                  href="mailto:contato@carprotect.com.br"
                  className="hover:underline"
                  aria-label="Enviar email"
                >
                  contato@nexoseguros.com.br
                </a>
              </li>
            </ul>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="https://i.ibb.co/7dYs2wWs/output-onlinepngtools.png"
              alt="Nexo Seguros Logo"
              className="w-40 md:w-52 -my-10"
            />
          </div>
        </div>

        <div className="mt-8 border-t border-gray-300 pt-6 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="https://www.linkedin.com/in/seu_usuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              <LinkedinLogo size={28} weight="bold" />
            </a>
            <a
              href="https://www.instagram.com/seu_usuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              <InstagramLogo size={28} weight="bold" />
            </a>
            <a
              href="https://www.facebook.com/seu_usuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              <FacebookLogo size={28} weight="bold" />
            </a>
          </div>
          <p className="text-sm">Nexo | &copy; {year}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
