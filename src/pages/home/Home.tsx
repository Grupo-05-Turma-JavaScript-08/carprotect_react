import { useEffect, useRef, useState } from "react";
import ModalRating from "../../components/rating/modalrating/ModalRating";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasInputChanged, setHasInputChanged] = useState(false);
  const timerRef = useRef<number | null>(null);

  // em todos input onChange={handleInputChange}
  const handleInputChange = () => {
    if (!hasInputChanged) {
      setHasInputChanged(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        console.log("Input preenchido. O modal não irá aparecer.");
      }
    }
  };
  // onClick={handleQuoteClick}   no botão de cotação
  const handleQuoteClick = (e) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setHasInputChanged(true);
    e.preventDefault();
  };

  useEffect(() => {
    if (!hasInputChanged) {
      timerRef.current = setTimeout(() => {
        setIsModalOpen(true);
      }, 30000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [hasInputChanged]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalRating isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default Home;
