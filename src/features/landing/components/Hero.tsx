/** Renderiza el hero principal con carrusel de imágenes y animaciones premium. */

import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronRight,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useLandingData } from '@/features/landing';
import { HERO_CONFIG } from '@/lib/config/constants';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data } = useLandingData();
  const { heroSlides } = data;
  const activeSlide = heroSlides.length > 0
    ? Math.min(currentSlide, heroSlides.length - 1)
    : 0;

  const nextSlide = useCallback(() => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(nextSlide, HERO_CONFIG.SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [heroSlides.length, nextSlide]);

  return (
    <section id="inicio" className="relative w-full min-h-[560px] sm:min-h-[640px] h-[78vh] sm:h-[82vh] flex items-center overflow-hidden bg-ups-blue">
      {/* Carrusel de Imágenes con Efecto Zoom */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.src + index}
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out overflow-hidden"
          style={{ opacity: index === activeSlide ? 1 : 0 }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${index === activeSlide ? 'scale-110' : 'scale-100'
              }`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Overlay con Gradiente */}
      <div className="absolute inset-0 z-[1] bg-black/55" />
      <div className="absolute inset-x-0 bottom-0 z-[2] h-[30%] bg-gradient-to-t from-ups-blue/95 via-ups-blue/70 to-transparent" />

      {/* Indicadores de Slide */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src + index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir a slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${index === activeSlide ? 'bg-ups-yellow w-8' : 'bg-white/40 w-2 hover:bg-white/60'
              }`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge Sede */}
          <div className="inline-flex items-center gap-2 bg-ups-yellow text-ups-blue font-bold px-3 py-1 mb-3 uppercase text-[10px] tracking-wider shadow-sm animate-fade-in-right">
            <MapPin size={12} />
            Sede Cuenca
          </div>

          {/* Título con Efecto de Escritura (Typing) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-5 leading-[1.05] uppercase drop-shadow-lg select-none">
            <span className="typing-caret block mb-1 overflow-hidden whitespace-nowrap animate-typing-1 mx-auto w-fit">
              Carrera de
            </span>
            <span className="typing-caret text-ups-yellow block overflow-hidden whitespace-nowrap animate-typing-2 mx-auto w-fit">
              Computación
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-7 animate-fade-up">
            Formamos líderes tecnológicos capaces de <span className="text-ups-yellow font-semibold">innovar</span> y gestionar soluciones digitales para los retos del futuro.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up">
            <a
              href="/interesados"
              className="group w-[210px] min-h-[50px] px-6 py-3.5 bg-ups-yellow text-ups-blue font-bold uppercase hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base relative overflow-hidden"
            >
              ¡Inicia hoy! <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#noticias"
              className="w-[210px] min-h-[50px] px-6 py-3.5 bg-white/10 text-white font-bold uppercase border border-white/30 hover:border-ups-yellow hover:text-ups-yellow hover:bg-white/15 transition-all flex items-center justify-center gap-2 text-sm sm:text-base backdrop-blur-sm"
            >
              Experiencias <ExternalLink size={16} />
            </a>
          </div>

        </div>
      </div>



      <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes caret {
          from, to { opacity: 0; }
          50% { opacity: 1; }
        }
        .typing-caret::after {
          content: '';
          display: inline-block;
          width: 2px;
          height: 0.85em;
          margin-left: 0.25rem;
          vertical-align: -0.08em;
          background: currentColor;
          animation: caret .75s step-end infinite;
        }
        .animate-typing-1 {
          width: 0;
          animation: typing 1s steps(20, end) forwards;
        }
        .animate-typing-2 {
          width: 0;
          animation: typing 1s steps(20, end) 1.2s forwards;
        }
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(-15px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-right { animation: fadeInRight 0.8s ease-out; }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.8s ease-out 2.2s forwards; opacity: 0; }
      `}</style>
    </section>
  );
};

export default Hero;
