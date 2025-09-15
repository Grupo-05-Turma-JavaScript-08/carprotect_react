import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { X } from "@phosphor-icons/react";

const ModalRating: React.FC = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
      contentStyle={{
        borderRadius: "1rem",
        width: "90%",
        maxWidth: "24rem",
        padding: "0",
        animation: "fadeIn 0.5s",
        position: "relative",
      }}
      modal
    >
      <div className="rounded-2xl bg-white shadow-xl">
        <button
          className="absolute top-4 right-4 z-10 rounded-full p-1 text-white focus:outline-none"
          onClick={closeModal}
        >
          <X size={20} weight="bold" />
        </button>
        <div className="rounded-t-2xl bg-sky-900 p-4 text-center text-white">
          <p className="text-sm">Nos ajude a melhorar!</p>
          <h2 className="text-xl font-bold">Avalie sua experiência</h2>
        </div>
        <div className="flex flex-col items-center p-6">
          <div className="flex space-x-2">
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
                  className={`h-10 w-10 cursor-pointer transition-colors duration-200 ${
                    starValue <= (hoverRating || rating)
                      ? "text-yellow-500"
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
          <h3 className="mt-4 text-lg font-semibold">Envie seu feedback</h3>
          <textarea
            className="my-4 h-24 w-full rounded-lg border border-gray-300 bg-gray-100 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Digite seu feedback aqui..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button
            className="cursor-pointer rounded-lg bg-sky-900 px-6 py-2 font-bold text-white transition hover:bg-sky-800"
            onClick={closeModal}
          >
            Enviar
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default ModalRating;
