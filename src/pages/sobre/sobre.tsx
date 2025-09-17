import { Target, Binoculars, ShieldCheck, PlayCircle } from "@phosphor-icons/react";
import { useState } from "react";

function Sobre() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 font-sans bg-gradient-to-br from-[#f7f9fb] to-[#e8eef3]">
      {/* Sobre Nós + Imagem lado a lado */}
      <div className="w-full max-w-6xl mb-12 flex flex-col md:flex-row items-center justify-center py-8 md:py-12 mt-8">
        <div className="flex-1 flex flex-col justify-center text-center md:text-left px-4 sm:px-8 md:px-12 lg:px-16 py-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#034153]">Sobre Nós</h1>
          <p className="text-lg leading-relaxed mb-4 text-[#056174]">
            Somos uma seguradora especializada em oferecer soluções completas de proteção veicular. Nosso objetivo é garantir que você dirija com tranquilidade, sabendo que seu bem está protegido por quem entende do assunto. Mais do que seguros, entregamos confiança, cuidado e inovação em cada serviço prestado.
          </p>
          <div className="flex items-center justify-center md:justify-start mt-6">
            <div className="w-12 h-12 rounded-full bg-[#76AABF] flex items-center justify-center mr-4">
              <ShieldCheck size={24} color="#034153" weight="fill" />
            </div>
            <span className="text-[#678391] font-medium">Proteção veicular especializada</span>
          </div>
          <div className="flex items-center justify-center md:justify-start mt-4">
            <div className="w-12 h-12 rounded-full bg-[#76AABF] flex items-center justify-center mr-4">
              <Target size={24} color="#034153" weight="fill" />
            </div>
            <span className="text-[#678391] font-medium">Atendimento humanizado</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center py-8 px-4 relative mt-8 md:mt-0">
          <div className="absolute inset-0 flex justify-center items-center z-0">
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#96A3AB] to-[#76AABF] opacity-30"></div>
          </div>
          <img 
            src="https://i.ibb.co/wFFnj4mW/equipe.jpg" 
            alt="Equipe de Atendimento" 
            className="w-full max-w-sm md:max-w-md h-auto lg:max-w-lg object-cover rounded-2xl relative z-10 transform transition-transform duration-500 hover:scale-105 shadow-lg" 
          />
        </div>
      </div>
      
      {/* Vídeo */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-[#034153] to-[#056174] p-1 rounded-2xl shadow-xl mb-12">
        <div className="relative rounded-xl overflow-hidden">
          {!isVideoPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
              <button 
                onClick={handleVideoPlay}
                className="flex flex-col items-center text-white transition-transform hover:scale-110"
              >
                <PlayCircle size={64} weight="fill" className="text-[#76AABF]" />
                <span className="mt-2 font-medium">Assista ao nosso vídeo</span>
              </button>
            </div>
          )}
          <iframe src="https://drive.google.com/file/d/1OmOpok44JSFJh8vApwyMmMnF62d_9Mo0/preview" width="890" height="490" allow="autoplay"></iframe>
        </div>
      </div>

      {/* Missão, Visão, Valores */}
      <div className="w-full max-w-5xl mb-12">
        <h2 className="font-bold text-3xl md:text-4xl mb-10 text-center text-[#034153]">NOSSA MISSÃO, VISÃO E VALORES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl border-t-4 border-[#034153]">
            <div className="w-16 h-16 rounded-full bg-[#e8f4f8] flex items-center justify-center mb-4">
              <Target size={32} color="#034153" weight="fill" />
            </div>
            <div className="mb-4 font-bold text-xl text-[#034153]">Missão</div>
            <div className="text-[#678391] text-center">
              Proporcionar segurança e tranquilidade aos nossos clientes, oferecendo soluções acessíveis, ágeis e confiáveis em proteção veicular, sempre com foco no atendimento humano e na experiência do segurado.
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl border-t-4 border-[#056174]">
            <div className="w-16 h-16 rounded-full bg-[#e8f4f8] flex items-center justify-center mb-4">
              <Binoculars size={32} color="#056174" weight="fill" />
            </div>
            <div className="mb-4 font-bold text-xl text-[#056174]">Visão</div>
            <div className="text-[#678391] text-center">
              Ser reconhecida como a seguradora que mais conecta proteção e confiança, sendo referência em inovação, atendimento próximo e qualidade no mercado de seguros veiculares.
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl border-t-4 border-[#034153]">
            <div className="w-16 h-16 rounded-full bg-[#e8f4f8] flex items-center justify-center mb-4">
              <ShieldCheck size={32} color="#034153" weight="fill" />
            </div>
            <div className="mb-4 font-bold text-xl text-[#034153]">Valores</div>
            <div className="text-[#678391] text-left">
              <div className="mb-3 flex items-start">
                <div className="w-2 h-2 rounded-full bg-[#76AABF] mt-2 mr-3 flex-shrink-0"></div>
                <span><strong className="text-[#034153]">Confiança:</strong> relações transparentes e duradouras.</span>
              </div>
              <div className="mb-3 flex items-start">
                <div className="w-2 h-2 rounded-full bg-[#76AABF] mt-2 mr-3 flex-shrink-0"></div>
                <span><strong className="text-[#034153]">Segurança:</strong> proteção em todos os momentos.</span>
              </div>
              <div className="mb-3 flex items-start">
                <div className="w-2 h-2 rounded-full bg-[#76AABF] mt-2 mr-3 flex-shrink-0"></div>
                <span><strong className="text-[#034153]">Inovação:</strong> soluções modernas e ágeis.</span>
              </div>
              <div className="mb-3 flex items-start">
                <div className="w-2 h-2 rounded-full bg-[#76AABF] mt-2 mr-3 flex-shrink-0"></div>
                <span><strong className="text-[#034153]">Respeito:</strong> valorizamos clientes, parceiros e colaboradores.</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-[#76AABF] mt-2 mr-3 flex-shrink-0"></div>
                <span><strong className="text-[#034153]">Compromisso:</strong> cuidamos do que é importante para você.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Destaques */}
      <div className="w-full max-w-5xl mb-16 bg-gradient-to-r from-[#034153] to-[#056174] rounded-2xl p-8 text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Por que escolher a NEXO?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <div className="bg-[#76AABF] rounded-lg p-3 mr-4 flex-shrink-0">
              <ShieldCheck size={24} color="white" weight="fill" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Cobertura Completa</h3>
              <p className="text-[#e8f4f8]">Proteção para todos os tipos de veículos, com ampla cobertura e assistência 24h.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-[#76AABF] rounded-lg p-3 mr-4 flex-shrink-0">
              <Target size={24} color="white" weight="fill" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Atendimento Personalizado</h3>
              <p className="text-[#e8f4f8]">Nossa equipe especializada está pronta para oferecer a melhor solução para suas necessidades.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-[#76AABF] rounded-lg p-3 mr-4 flex-shrink-0">
              <Binoculars size={24} color="white" weight="fill" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Inovação Constante</h3>
              <p className="text-[#e8f4f8]">Utilizamos tecnologia de ponta para simplificar processos e melhorar sua experiência.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-[#76AABF] rounded-lg p-3 mr-4 flex-shrink-0">
              <ShieldCheck size={24} color="white" weight="fill" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Transparência</h3>
              <p className="text-[#e8f4f8]">Clareza em todas as etapas, desde a contratação até a assistência em sinistros.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;