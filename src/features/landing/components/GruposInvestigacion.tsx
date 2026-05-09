/** Renderiza el carrusel de grupos de investigación. */

import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, Microscope, Network, Cpu, Database } from 'lucide-react';
import { useLandingData } from '@/features/landing';
import { CAROUSEL_CONFIG, INSTITUTION } from '@/lib/config/constants';

const getIconForGrupo = (id: number) => {
  switch (id) {
    case 1: return <Cpu size={24} className="text-ups-blue" />;
    case 2: return <Network size={24} className="text-ups-blue" />;
    case 3: return <Database size={24} className="text-ups-blue" />;
    case 4: return <Microscope size={24} className="text-ups-blue" />;
    default: return <Microscope size={24} className="text-ups-blue" />;
  }
};

const GruposInvestigacion: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data } = useLandingData();
  const researchGroups = data.researchGroups;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' 
        ? -CAROUSEL_CONFIG.SCROLL_AMOUNT_PX 
        : CAROUSEL_CONFIG.SCROLL_AMOUNT_PX;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="investigacion" className="py-20 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ups-blue uppercase tracking-wide text-center">
            GRUPOS DE INVESTIGACIÓN
          </h2>
          <p className="mt-4 text-zinc-600 text-center max-w-2xl text-sm sm:text-base">
            Descubre los espacios donde nuestros docentes y estudiantes generan conocimiento científico y tecnológico.
          </p>
        </div>

        <div className="relative">
          <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:gap-8 pb-4 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {researchGroups.map((item) => (
              <div key={item.id} className="snap-start shrink-0 w-[88vw] sm:w-[320px] lg:w-[380px] bg-white rounded-none shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col group">
                <div className="h-48 sm:h-56 overflow-hidden relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-ups-blue/10 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute top-4 right-4 bg-ups-yellow size-10 sm:size-12 flex items-center justify-center shadow-md">
                    {getIconForGrupo(item.id)}
                  </div>
                </div>
                <div className="p-5 sm:p-8 flex flex-col flex-grow bg-white border-t-4 border-ups-yellow">
                  <h3 className="text-lg sm:text-xl font-semibold text-ups-blue mb-2 sm:mb-3 uppercase">{item.title}</h3>
                  <p className="text-zinc-600 text-sm sm:text-base mb-6 sm:mb-8 flex-grow">{item.description}</p>
                  <div className="mt-auto pt-4 sm:pt-6 border-t border-zinc-100 flex items-center justify-between">
                    <button type="button" className="inline-flex items-center text-ups-blue font-semibold text-sm uppercase group-hover:text-ups-yellow transition-colors min-h-[44px]">
                      Conocer más
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <a href={INSTITUTION.FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors p-1" title="Facebook">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07c0-6.63-5.37-12-12-12s-12 5.37-12 12c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95H15.83c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.39C19.61 23.03 24 18.06 24 12.07z" /></svg>
                      </a>
                      <a href={INSTITUTION.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors p-1" title="Instagram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.21-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4 sm:hidden">
            <button
              onClick={() => scroll('left')}
              className="p-3 bg-white border border-zinc-200 text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-md rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 bg-white border border-zinc-200 text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-md rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white border border-zinc-200 text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full items-center justify-center"
            title="Desplazar a la izquierda"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white border border-zinc-200 text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full items-center justify-center"
            title="Desplazar a la derecha"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GruposInvestigacion;
