/** Renderiza el carrusel de publicaciones de la carrera. */

import React, { useRef } from 'react';
import { ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { PUBLICATIONS } from '@/features/landing/data/landing.data';
import { CAROUSEL_CONFIG } from '@/lib/config/constants';

const ViveLaCarrera: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' 
        ? -CAROUSEL_CONFIG.NOTICIAS_SCROLL_AMOUNT_PX 
        : CAROUSEL_CONFIG.NOTICIAS_SCROLL_AMOUNT_PX;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="noticias" className="py-20 bg-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col items-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ups-blue uppercase tracking-wide text-center">
            Vive la carrera
          </h2>
          <div className="w-24 h-1 bg-ups-yellow mt-4"></div>
          <p className="mt-4 text-zinc-600 text-center max-w-2xl text-sm sm:text-base">
            Entérate de las últimas noticias, eventos, logros y proyectos de nuestros estudiantes y docentes.
          </p>
        </div>

        <div className="relative">
          <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-4 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {PUBLICATIONS.map((pub) => (
              <div key={pub.id} className="snap-start shrink-0 w-[88vw] sm:w-[300px] lg:w-[320px] bg-white rounded-none shadow-md hover:shadow-lg transition-all duration-300 group flex flex-col">
                <div className="relative h-44 sm:h-48 overflow-hidden bg-zinc-200">
                  <img
                    src={pub.imageUrl}
                    alt={pub.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-0 left-4 bg-ups-yellow text-ups-blue text-xs font-semibold px-3 py-1.5 uppercase shadow-md">
                    {pub.category}
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <p className="text-xs text-zinc-500 mb-2 font-semibold">{pub.date}</p>
                  <h3 className="font-semibold text-base sm:text-lg text-ups-blue mb-2 sm:mb-3 leading-tight group-hover:text-ups-yellow transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-zinc-600 text-sm flex-grow mb-4">
                    {pub.description}
                  </p>

                  <div className="mt-auto flex justify-end">
                    <button type="button" className="inline-flex items-center text-ups-blue font-semibold text-sm uppercase group-hover:text-ups-yellow transition-colors min-h-[44px]">
                      Leer más <ChevronRight size={16} className="ml-1" />
                    </button>
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
            title="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white border border-zinc-100 text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full items-center justify-center"
            title="Siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-ups-blue text-white font-semibold uppercase text-sm hover:bg-ups-blue-light transition-colors shadow-sm rounded-none w-full sm:w-auto justify-center min-h-[44px]"
          >
            Ver todas las publicaciones <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViveLaCarrera;
