import { LinkedinLogoIcon, InstagramLogoIcon, FacebookLogoIcon } from "@phosphor-icons/react";
import type { JSX } from "react";

function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          <div className="text-left">
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
                  contato@carprotect.com.br
                </a>
              </li>
            </ul>
          </div>

          <div className="flex justify-end md:justify-end">
            <img
              src="/logo.png"
              alt="Logo CarProtect"
              className="w-32 sm:w-40 object-contain"
            />
          </div>
        </div>

        <div className="mt-6 border-t border-gray-400 pt-6 text-center">
          <div className="flex justify-center gap-4 mb-3">
            <a
              href="https://www.linkedin.com/in/seu_usuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              <LinkedinLogoIcon size={28} weight="bold" />
            </a>

            <a
              href="https://www.instagram.com/seu_usuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              <InstagramLogoIcon size={28} weight="bold" />
            </a>

            <a
              href="https://www.facebook.com/seu_usuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              <FacebookLogoIcon size={28} weight="bold" />
            </a>
          </div>

          <p className="text-sm">CarProtect | &copy; {year}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
