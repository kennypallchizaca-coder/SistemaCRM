/** Renderiza el carrusel de publicaciones de la carrera. */

import React, { useRef } from 'react';
import {
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useLandingData } from '@/features/landing';
import type { Publication } from '@/features/landing/types/landing.types';
import { CAROUSEL_CONFIG } from '@/lib/config/constants';

const ViveLaCarrera: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data } = useLandingData();
  const publications = data.publications as Publication[];
  const sectionContent = data.content.viveCarrera;

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
    <section id="noticias" className="py-20 bg-zinc-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ups-blue uppercase tracking-wide text-center">
            {sectionContent.title}
          </h2>
          <div className="w-24 h-1 bg-ups-yellow mt-4"></div>
          {sectionContent.description && (
            <p className="mt-4 max-w-2xl text-center text-zinc-600 text-sm sm:text-base whitespace-pre-line">
              {sectionContent.description}
            </p>
          )}
        </div>

        <div className="relative px-2">
          <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {publications.map((pub: Publication) => (
              <div key={pub.id} className="snap-start shrink-0 w-[78vw] sm:w-[310px] lg:w-[350px] bg-white rounded-none border border-black shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="relative h-60 sm:h-72 overflow-hidden bg-zinc-100">
                  <img
                    src={pub.image}
                    alt={pub.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-0 left-0 bg-ups-yellow text-ups-blue text-[10px] font-bold px-4 py-2 uppercase shadow-sm">
                    {pub.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg sm:text-xl text-ups-blue mb-3 leading-tight group-hover:text-ups-yellow transition-colors line-clamp-2 min-h-[3.5rem]">
                    {pub.title}
                  </h3>
                  <p className="text-zinc-600 text-sm mb-6 line-clamp-3">
                    {pub.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-ups-blue/60 uppercase tracking-wider">{pub.date}</span>
                    {pub.url && pub.url !== '#' && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-ups-blue text-white font-bold text-[11px] uppercase hover:bg-ups-yellow hover:text-ups-blue transition-all shadow-sm"
                      >
                        Leer más <ChevronRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('left')}
            className="hidden xl:flex absolute -left-6 top-[40%] -translate-y-1/2 z-20 p-3 bg-white border border-zinc-200 text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full items-center justify-center"
            title="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden xl:flex absolute -right-6 top-[40%] -translate-y-1/2 z-20 p-3 bg-white border border-zinc-200 text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full items-center justify-center"
            title="Siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViveLaCarrera;
