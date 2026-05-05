import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, Users, FlaskConical, Terminal } from 'lucide-react';

const AGRUPACIONES = [
  {
    id: 1,
    title: 'ASU Software Libre',
    description: 'Comunidad estudiantil orientada a aprendizaje, proyectos y difusión de software libre.',
    icon: <Terminal size={24} className="text-ups-blue" />,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    title: 'Grupos de investigación',
    description: 'Participación en proyectos académicos, investigación aplicada y desarrollo tecnológico.',
    icon: <FlaskConical size={24} className="text-ups-blue" />,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    title: 'Comunidades tecnológicas',
    description: 'Eventos, talleres, charlas y espacios de vinculación con el ecosistema tecnológico.',
    icon: <Users size={24} className="text-ups-blue" />,
    image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=600',
  },
];

const Agrupaciones: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -380 : 380;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="agrupaciones" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título Estilo UPS */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ups-blue uppercase tracking-wide text-center">
            GRUPOS ASU
          </h2>
          <p className="mt-4 text-gray-600 text-center max-w-2xl">
            Conoce los espacios extracurriculares donde nuestros estudiantes desarrollan sus habilidades.
          </p>
        </div>

        {/* Carrusel de Agrupaciones */}
        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white border border-gray-200 text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full flex"
            title="Desplazar a la izquierda"
          >
            <ChevronLeft size={24} />
          </button>

          <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 pt-4 px-4 -mx-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {AGRUPACIONES.map((item) => (
              <div key={item.id} className="snap-start shrink-0 w-[85vw] sm:w-[320px] lg:w-[380px] bg-white rounded-none shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col group">
                <div className="h-56 overflow-hidden relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-ups-blue/10 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute top-4 right-4 bg-ups-yellow w-12 h-12 flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow bg-white border-t-4 border-ups-yellow">
                  <h3 className="text-xl font-bold text-ups-blue mb-3 uppercase">{item.title}</h3>
                  <p className="text-gray-600 mb-8 flex-grow">{item.description}</p>
                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                    <button type="button" className="inline-flex items-center text-ups-blue font-bold text-sm uppercase group-hover:text-ups-yellow transition-colors">
                      Conocer más
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                    <div className="flex items-center gap-3 text-gray-400">
                      <a href="https://www.facebook.com/UPSalesianaEc/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" title="Facebook">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07c0-6.63-5.37-12-12-12s-12 5.37-12 12c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95H15.83c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.39C19.61 23.03 24 18.06 24 12.07z" /></svg>
                      </a>
                      <a href="https://www.instagram.com/upsalesianaec/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors" title="Instagram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.21-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg>
                      </a>
                      <a href="https://www.tiktok.com/@upsalesianaec" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" title="TikTok">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.15 4.35-2.86 5.68-1.72 1.35-4.04 1.83-6.14 1.34-2.11-.49-3.95-1.93-4.88-3.86-.94-1.92-1.02-4.28-.19-6.25.82-1.96 2.5-3.5 4.47-4.14 1.98-.65 4.2-.5 6.06.39v4.11c-1.09-.59-2.42-.76-3.62-.43-1.2.33-2.18 1.25-2.6 2.4-.41 1.16-.27 2.49.38 3.53.64 1.05 1.86 1.72 3.08 1.82 1.23.09 2.49-.24 3.39-1.05.91-.82 1.4-2.04 1.42-3.29.02-4.85.01-9.7.02-14.55z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white border border-gray-200 text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full flex"
            title="Desplazar a la derecha"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Agrupaciones;
