import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { X } from "@phosphor-icons/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalRating: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
    onClose(); // Notifica o componente pai que o modal foi fechado
  };

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 9000); // Abre após 30 segundos se a prop isOpen for verdadeira

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
      contentStyle={{
        borderRadius: "1rem",
        width: "90%",
        maxWidth: "28rem", // Aumentado para melhor espaçamento
        padding: "0",
        animation: "fadeIn 0.3s ease-out",
        position: "relative",
      }}
      modal
    >
      <div className="rounded-2xl bg-white shadow-xl font-sans">
        <button
          className="absolute top-3 right-3 z-10 rounded-full p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all focus:outline-none"
          onClick={closeModal}
        >
          <X size={20} weight="bold" />
        </button>
        <div className="rounded-t-2xl bg-gradient-to-r from-[#034153] to-[#056174] p-6 text-center text-white">
          <p className="text-sm opacity-80">Nos ajude a melhorar!</p>
          <h2 className="text-xl sm:text-2xl font-bold">Avalie sua experiência</h2>
        </div>
        <div className="flex flex-col items-center p-6 sm:p-8">
          <div className="flex space-x-2 sm:space-x-3">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={
                    starValue <= (hoverRating || rating)
                      ? "currentColor"
                      : "none"
                  }
                  stroke="currentColor"
                  className={`h-10 w-10 sm:h-12 sm:w-12 cursor-pointer transition-all duration-200 transform hover:scale-110 ${starValue <= (hoverRating || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                    }`}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.212a.75.75 0 011.424 0l2.094 4.24a.75.75 0 00.56.408l4.672.679a.75.75 0 01.417 1.28l-3.388 3.298a.75.75 0 00-.215.664l.802 4.654a.75.75 0 01-1.092.793L12 18.23l-4.184 2.196a.75.75 0 01-1.092-.793l.802-4.654a.75.75 0 00-.215-.664l-3.388-3.298a.75.75 0 01.417-1.28l4.672-.679a.75.75 0 00.56-.408l2.094-4.24z"
                    clipRule="evenodd"
                  />
                </svg>
              );
            })}
          </div>
          <h3 className="mt-6 text-lg font-semibold text-[#034153]">Envie seu feedback</h3>
          <textarea
            className="my-4 h-24 w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-3 focus:border-[#056174] focus:outline-none focus:ring-1 focus:ring-[#056174] transition-colors"
            placeholder="Digite seu feedback aqui..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button
            className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-[#034153] to-[#056174] px-6 py-3 font-bold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={closeModal}
          >
            Enviar Avaliação
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default ModalRating;
