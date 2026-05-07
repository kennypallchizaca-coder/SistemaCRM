import React, { useRef } from 'react';
import { Building2, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { EMPRESAS } from '../../data/landing.data';
import { CAROUSEL_CONFIG } from '../../config/constants';

const Empresas: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' 
        ? -CAROUSEL_CONFIG.EMPRESAS_SCROLL_AMOUNT_PX 
        : CAROUSEL_CONFIG.EMPRESAS_SCROLL_AMOUNT_PX;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="empresas" className="relative py-24 bg-ups-blue text-white overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
          alt="Oficina corporativa" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ups-blue/95 to-ups-blue/80 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="flex flex-col items-start gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ups-yellow mb-4 uppercase tracking-wide">
              Empresas y vinculación
            </h2>
            <div className="w-24 h-1 bg-ups-yellow mb-4 sm:mb-6"></div>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed">
              Conoce las organizaciones e instituciones con las que nuestros estudiantes han desarrollado prácticas profesionales, pasantías y proyectos conjuntos.
            </p>
          </div>
          <a 
            href="#vinculacion" 
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-ups-blue font-bold rounded-none hover:bg-ups-yellow hover:text-ups-dark transition-colors shadow-lg uppercase text-sm w-full sm:w-auto justify-center min-h-[44px]"
          >
            <Briefcase size={18} />
            Trabaja con nosotros
          </a>
        </div>

        {/* Carrusel */}
        <div className="relative">
          <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-4 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {EMPRESAS.map((empresa) => (
              <div key={empresa.name} className="relative snap-start shrink-0 w-[72vw] sm:w-[240px] lg:w-[260px] h-[220px] sm:h-[240px] lg:h-[260px] rounded-none overflow-hidden group/card shadow-md">
                {/* Imagen de fondo */}
                <img src={empresa.image} alt={empresa.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                <div className="absolute inset-0 bg-ups-blue/80 group-hover/card:bg-ups-blue/60 transition-colors duration-300 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-ups-dark/90 via-transparent to-transparent opacity-80"></div>
                
                {/* Contenido */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                  <Building2 size={36} className="text-ups-yellow mb-3 sm:mb-4 opacity-90 group-hover/card:-translate-y-2 transition-transform duration-300" />
                  <span className="font-bold text-base sm:text-lg tracking-wide text-white group-hover/card:-translate-y-1 transition-transform duration-300">{empresa.name}</span>
                </div>
              </div>
            ))}
            
            {/* Tarjeta de Call to Action */}
            <a href="#vinculacion" className="snap-start shrink-0 w-[72vw] sm:w-[240px] lg:w-[260px] bg-ups-yellow/10 backdrop-blur-md border-2 border-dashed border-ups-yellow/50 p-6 sm:p-8 rounded-none flex flex-col items-center justify-center text-center hover:bg-ups-yellow/20 hover:-translate-y-2 transition-all duration-300 group/card aspect-square min-h-[220px] sm:min-h-0">
              <span className="font-bold text-xl tracking-wide text-ups-yellow mb-2">Únete</span>
              <span className="text-sm text-white/80">Sé parte de nuestros aliados</span>
            </a>
          </div>

          {/* Botones de navegación: abajo en mobile, superpuestos en desktop */}
          <div className="flex justify-center gap-4 mt-4 sm:hidden">
            <button
              onClick={() => scroll('left')}
              className="p-3 bg-white text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-md rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 bg-white text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-md rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full border border-gray-200 items-center justify-center"
            title="Desplazar a la izquierda"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full border border-gray-200 items-center justify-center"
            title="Desplazar a la derecha"
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Empresas;
