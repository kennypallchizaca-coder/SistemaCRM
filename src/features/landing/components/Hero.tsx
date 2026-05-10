/** Renderiza el hero principal con carrusel de imágenes y animaciones premium. */

import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldCheck,
  Microscope,
  Cpu,
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
    <section id="inicio" className="relative w-full min-h-[500px] sm:min-h-[600px] h-[80vh] sm:h-[85vh] flex items-center overflow-hidden bg-ups-blue">
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
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ups-blue/90 via-ups-blue/50 to-transparent" />

      {/* Indicadores de Slide */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Badge Sede */}
          <div className="inline-flex items-center gap-2 bg-ups-yellow text-ups-blue font-bold px-3 py-1 mb-3 uppercase text-[10px] tracking-wider shadow-sm animate-fade-in-right">
            <MapPin size={12} />
            Sede Cuenca
          </div>

          {/* Título con Efecto de Escritura (Typing) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.1] uppercase drop-shadow-lg select-none">
            <span className="block mb-1 overflow-hidden whitespace-nowrap border-r-4 border-white animate-typing-1">
              Carrera de
            </span>
            <span className="text-ups-yellow block overflow-hidden whitespace-nowrap border-r-4 border-ups-yellow animate-typing-2">
              Computación
            </span>
          </h1>

          {/* Caja de Información Glassmorphism */}
          <div className="bg-ups-blue/70 backdrop-blur-sm border-l-4 border-ups-yellow p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-up">
            <p className="text-base sm:text-lg text-white/95 leading-relaxed">
              Formamos líderes tecnológicos capaces de <span className="text-ups-yellow font-semibold">innovar</span> y gestionar soluciones digitales para los retos del futuro.
            </p>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col xs:flex-row gap-3 mb-8 sm:mb-12 animate-fade-up">
            <a
              href="/interesados"
              className="group px-6 py-3 bg-ups-yellow text-ups-blue font-bold uppercase hover:bg-white transition-all shadow-md flex items-center justify-center gap-2 text-sm sm:text-base relative overflow-hidden min-h-[44px]"
            >
              ¡Inicia hoy! <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#noticias"
              className="px-6 py-3 bg-white/10 text-white font-bold uppercase border border-white/20 hover:border-ups-yellow hover:text-ups-yellow transition-all flex items-center justify-center gap-2 text-sm sm:text-base backdrop-blur-sm min-h-[44px]"
            >
              Experiencias <ExternalLink size={16} />
            </a>
          </div>

          {/* Grid de Beneficios Compacto */}
          <div className="grid grid-cols-3 gap-2 max-w-sm animate-fade-up">
            <div className="bg-white/10 backdrop-blur border border-white/5 p-2 flex flex-col items-center text-center hover:bg-white/20 transition-all shadow-sm group">
              <ShieldCheck size={20} className="text-ups-yellow mb-1 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white text-[9px] uppercase tracking-tighter">ABET</h3>
              <p className="text-[8px] text-zinc-300 font-semibold uppercase">Calidad</p>
            </div>

            <div className="bg-white/10 backdrop-blur border border-white/5 p-2 flex flex-col items-center text-center hover:bg-white/20 transition-all shadow-sm group">
              <Microscope size={20} className="text-ups-yellow mb-1 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white text-[9px] uppercase tracking-tighter">Labs</h3>
              <p className="text-[8px] text-zinc-300 font-semibold uppercase">Práctica</p>
            </div>

            <div className="bg-white/10 backdrop-blur border border-white/5 p-2 flex flex-col items-center text-center hover:bg-white/20 transition-all shadow-sm group">
              <Cpu size={20} className="text-ups-yellow mb-1 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white text-[9px] uppercase tracking-tighter">TIC</h3>
              <p className="text-[8px] text-zinc-300 font-semibold uppercase">Innovación</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: currentColor; }
        }
        .animate-typing-1 {
          width: 0;
          animation: 
            typing 1s steps(20, end) forwards,
            blink-caret .75s step-end 2;
        }
        .animate-typing-2 {
          width: 0;
          animation: 
            typing 1s steps(20, end) 1.2s forwards,
            blink-caret .75s step-end infinite;
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
