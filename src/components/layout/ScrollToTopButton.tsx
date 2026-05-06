import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar el botón cuando se hace scroll hacia abajo 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Función para ir arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-ups-yellow text-ups-blue shadow-lg hover:bg-ups-blue hover:text-white transition-all duration-300 transform hover:scale-110 focus:outline-none"
          aria-label="Ir al inicio"
        >
          <ChevronUp size={24} className="stroke-[3px]" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
