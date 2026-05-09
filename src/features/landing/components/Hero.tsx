/** Renderiza el hero principal con carrusel de imágenes. */

import React, { useState, useEffect, useCallback } from 'react';
import { useLandingData } from '@/features/landing';
import { HERO_CONFIG } from '@/lib/config/constants';


const LabsIcon = ({ className = "w-[30px] h-[30px]" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-ups-blue ${className}`}>
    <rect x="2" y="3" width="20" height="14" rx="2" fill="currentColor" opacity="0.15" />
    <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 21H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CampoLaboralIcon = ({ className = "w-[30px] h-[30px]" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-ups-blue ${className}`}>
    <rect x="2" y="7" width="20" height="14" rx="2" fill="currentColor" opacity="0.15" />
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 7V5C16 3.90 15.10 3 14 3H10C8.90 3 8 3.90 8 5V7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 12V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 14H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data } = useLandingData();
  const { heroSlides } = data;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, HERO_CONFIG.SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="inicio" className="relative w-full min-h-[500px] sm:min-h-[600px] h-[80vh] sm:h-[85vh] flex items-center overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.src + index}
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === currentSlide ? 1 : 0 }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ups-blue/90 via-ups-blue/60 to-transparent" />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src + index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir a slide ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
              ? 'bg-ups-yellow w-8'
              : 'bg-white/50 hover:bg-white/80'
              }`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <div className="inline-block bg-ups-yellow text-ups-blue font-semibold px-4 py-1 mb-4 uppercase text-sm tracking-wider">
            Sede Cuenca
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 leading-tight uppercase animate-fade-up">
            Carrera de <br />
            <span className="text-ups-yellow inline-block hover:scale-105 transition-transform duration-300">Computación</span>
          </h1>

          <div className="bg-ups-blue/80 backdrop-blur-sm border-b-2 border-ups-yellow p-4 sm:p-6 mb-6 sm:mb-8">
            <p className="text-base sm:text-lg text-white/90">
              Formamos profesionales capaces de diseñar, construir y gestionar soluciones tecnológicas para la transformación digital, la innovación y el desarrollo de la sociedad.
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
            <a
              href="/interesados"
              className="px-6 py-3 bg-ups-yellow text-ups-blue font-semibold uppercase hover:bg-white transition-colors shadow-sm flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px]"
            >
              Conoce más <ChevronRightIcon />
            </a>
            <a
              href="#noticias"
              className="px-6 py-3 bg-ups-blue text-white font-semibold uppercase border border-ups-blue hover:border-ups-yellow hover:text-ups-yellow transition-colors shadow-sm flex items-center justify-center text-sm sm:text-base min-h-[44px]"
            >
              Ver experiencias
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2 max-w-xs sm:max-w-sm">
            <div className="bg-white/90 backdrop-blur border-b-4 border-ups-yellow p-2 sm:p-3 rounded-none flex flex-col items-center text-ups-blue text-center hover:-translate-y-1 transition-transform shadow-md">
              <div className="mb-1 h-[20px] sm:h-[28px] flex items-center justify-center">
                <img src="/ABET_logo.svg" alt="ABET Logo" className="h-full w-auto object-contain mix-blend-multiply" />
              </div>
              <h3 className="font-semibold text-[10px] sm:text-xs md:text-sm leading-none mb-0.5">ABET</h3>
              <p className="text-[9px] sm:text-[10px] text-zinc-600">Acreditación</p>
            </div>

            <div className="bg-white/90 backdrop-blur border-b-4 border-ups-yellow p-2 sm:p-3 rounded-none flex flex-col items-center text-ups-blue text-center hover:-translate-y-1 transition-transform shadow-md">
              <div className="mb-1 h-[20px] sm:h-[28px] flex items-center justify-center">
                <LabsIcon className="h-full w-auto" />
              </div>
              <h3 className="font-semibold text-[10px] sm:text-xs md:text-sm leading-none mb-0.5">Labs</h3>
              <p className="text-[9px] sm:text-[10px] text-zinc-600">Práctica</p>
            </div>

            <div className="bg-white/90 backdrop-blur border-b-4 border-ups-yellow p-2 sm:p-3 rounded-none flex flex-col items-center text-ups-blue text-center hover:-translate-y-1 transition-transform shadow-md">
              <div className="mb-1 h-[20px] sm:h-[28px] flex items-center justify-center">
                <CampoLaboralIcon className="h-full w-auto" />
              </div>
              <h3 className="font-semibold text-[10px] sm:text-xs md:text-sm leading-none mb-0.5">TI</h3>
              <p className="text-[9px] sm:text-[10px] text-zinc-600">Especialización</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
