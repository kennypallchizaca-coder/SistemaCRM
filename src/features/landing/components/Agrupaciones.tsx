/** Renderiza la sección de Agrupaciones ASU sincronizada 100% con el Backend. */

import React, { useRef } from 'react';
import {
  Users,
  ChevronRight,
  ChevronLeft,
  Music,
  Heart,
  Palette,
  Trophy,
  Coffee,
  Mic,
  Star,
  Terminal,
  Code,
  Book,
  Cpu,
  Briefcase
} from 'lucide-react';
import { useLandingData } from '@/features/landing';
import { CAROUSEL_CONFIG } from '@/lib/config/constants';
import { SocialLinks } from './SocialLinks';

// Mapeo exacto basado en el Enum del Backend (asu-group schema)
const IconMap: Record<string, React.ElementType<{ size?: number }>> = {
  users: Users,
  music: Music,
  heart: Heart,
  palette: Palette,
  trophy: Trophy,
  coffee: Coffee,
  mic: Mic,
  star: Star,
  terminal: Terminal,
  code: Code,
  book: Book,
  cpu: Cpu,
  briefcase: Briefcase,
};

const getIcon = (iconName?: string, size = 48) => {
  const Icon = iconName ? IconMap[iconName.toLowerCase()] : undefined;
  return Icon ? <Icon size={size} /> : <Users size={size} />;
};

const Agrupaciones: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data } = useLandingData();
  const asuGroups = data.asuGroups;
  const sectionContent = data.content.gruposAsu;

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
    <section id="grupos-asu" className="py-20 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ups-blue uppercase tracking-wide text-center">
            {sectionContent.title.split(' ').map((word: string, i: number, arr: string[]) => (
              <React.Fragment key={i}>
                {i === arr.length - 1 ? <span className="text-ups-yellow">{word}</span> : word}
                {i < arr.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </h2>
          <div className="w-24 h-1 bg-ups-yellow mt-4"></div>
          {sectionContent.description && (
            <div
              className="mt-4 max-w-2xl text-center text-zinc-600 text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: sectionContent.description }}
            />
          )}
        </div>

        <div className="relative px-2">
          <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {asuGroups.map((grupo) => (
              <div key={grupo.title} className="snap-start shrink-0 w-[78vw] sm:w-[310px] lg:w-[350px] bg-white rounded-none border border-black shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="relative h-60 sm:h-72 overflow-hidden bg-ups-blue/5 flex items-center justify-center">
                  {/* Imagen real de Strapi o Icono si no hay imagen */}
                  {grupo.image && !grupo.image.includes('undefined') ? (
                    <img
                      src={grupo.image}
                      alt={grupo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="text-ups-yellow group-hover:scale-110 transition-transform duration-500">
                      {getIcon(grupo.icon)}
                    </div>
                  )}

                  <div className="absolute top-3 left-3 bg-ups-yellow text-ups-blue size-11 flex items-center justify-center shadow-sm" title={grupo.icon || 'ASU'}>
                    {getIcon(grupo.icon, 22)}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="font-bold text-lg sm:text-xl text-ups-blue mb-3 leading-tight group-hover:text-ups-yellow transition-colors line-clamp-2 min-h-[3.5rem]">
                    {grupo.title}
                  </h3>
                  {grupo.description && (
                    <p className="text-left text-zinc-600 text-sm mb-6 line-clamp-3 whitespace-pre-line">
                      {grupo.description}
                    </p>
                  )}

                  <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between gap-4">
                    <SocialLinks links={grupo.socialLinks} />
                    {grupo.buttonLink && (
                      <a
                        href={grupo.buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex w-fit items-center justify-center gap-2 px-4 py-2 bg-ups-blue text-white font-bold text-[11px] uppercase hover:bg-ups-yellow hover:text-ups-blue transition-all shadow-sm"
                      >
                        {grupo.buttonText || 'Más info'} <ChevronRight size={14} />
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

export default Agrupaciones;
