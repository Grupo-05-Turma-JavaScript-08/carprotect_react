import { Link } from "react-router-dom";
import type Insurance from "../../../models/Insurence";
import { PencilSimple, Trash } from "@phosphor-icons/react";

interface CardInsuranceProps {
  insurance: Insurance;
}

function CardInsurance({ insurance }: CardInsuranceProps) {
  // Formatar datas para pt-BR
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("pt-BR");
    } catch {
      return dateStr;
    }
  };

  return (
  <div className="bg-[#034153] rounded-lg shadow-lg p-6 mb-4 text-[#76AABF] w-72 flex flex-col justify-between h-full hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-[#678391]">
      <div className="border-b border-[#678391] pb-4">
        <h2 className="text-xl font-bold truncate text-[#056174]" title={insurance.title}>
          {insurance.title}
        </h2>
        <p className="text-sm text-[#96A3AB] truncate" title={insurance.description}>
          {insurance.description}
        </p>
      </div>

      <div className="py-4 flex flex-col gap-5 flex-grow ">
        <div className="flex justify-center gap-5">
          <div className="flex flex-col ">
            <div className="text-sm text-[#96A3AB]">Prêmio</div>
            <div className="font-semibold text-[#76AABF]">{insurance.premiumPorcent}%</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm text-[#96A3AB]">Início</div>
            <div className="font-semibold text-[#76AABF]">{formatDate(String(insurance.effectiveDate))}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm text-[#96A3AB]">Fim</div>
            <div className="font-semibold text-[#76AABF]">{formatDate(String(insurance.expirationDate))}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2 border-t border-[#678391] pt-4 mt-auto">
        <Link to={`/editarseguro/${insurance.id}`}>
          <button
            className="p-2 text-[#034153] transition hover:text-[#76AABF] rounded bg-[#76AABF] hover:bg-[#056174] active:bg-[#678391]/20"
            title="Editar"
          >
            <PencilSimple size={25} />
          </button>
        </Link>
        <Link to={`/deletarseguro/${insurance.id}`}>
          <button
            className="p-2 text-[#034153] transition hover:text-[#76AABF] rounded bg-[#76AABF] hover:bg-[#056174] active:bg-[#678391]/20"
            title="Excluir"
          >
            <Trash size={25} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CardInsurance;