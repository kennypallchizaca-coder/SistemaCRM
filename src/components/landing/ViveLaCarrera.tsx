import React, { useRef } from 'react';
import { ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';

const PUBLICATIONS = [
  {
    id: 1,
    title: 'Nuevos laboratorios de Inteligencia Artificial',
    category: 'NOTICIAS',
    date: '2026-05-01',
    description: 'La carrera de Computación inauguró nuevos espacios para el desarrollo de proyectos con IA.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    title: 'Acreditación internacional ABET',
    category: 'ACADÉMICO',
    date: '2026-04-15',
    description: 'Nuestra carrera mantiene los más altos estándares de calidad educativa reconocidos mundialmente.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    title: 'Feria de proyectos "Del Cole a la U"',
    category: 'VINCULACIÓN',
    date: '2026-04-02',
    description: 'Más de 500 estudiantes de bachillerato visitaron nuestros laboratorios y conocieron nuestros proyectos.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 4,
    title: 'Estudiantes ganan hackathon nacional',
    category: 'LOGROS',
    date: '2026-03-20',
    description: 'El grupo de robótica e IA de la UPS sede Cuenca obtuvo el primer lugar en la competencia nacional.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
  },
];

const ViveLaCarrera: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="noticias" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Título Estilo UPS */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ups-blue uppercase tracking-wide text-center">
            Vive la carrera
          </h2>
          <div className="w-24 h-1 bg-ups-yellow mt-4"></div>
          <p className="mt-4 text-gray-600 text-center max-w-2xl">
            Entérate de las últimas noticias, eventos, logros y proyectos de nuestros estudiantes y docentes.
          </p>
        </div>

        {/* Carrusel de Noticias Estilo UPS */}
        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white border border-gray-200 text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full flex"
            title="Anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 px-4 -mx-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {PUBLICATIONS.map((pub) => (
              <div key={pub.id} className="snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[320px] bg-white rounded-none shadow-md hover:shadow-lg transition-all duration-300 group flex flex-col">
                {/* Imagen con categoría sobrepuesta */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={pub.imageUrl}
                    alt={pub.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-0 left-4 bg-ups-yellow text-ups-blue text-xs font-bold px-3 py-1.5 uppercase shadow-md">
                    {pub.category}
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-xs text-gray-500 mb-2 font-semibold">{pub.date}</p>
                  <h3 className="font-bold text-lg text-ups-blue mb-3 leading-tight group-hover:text-ups-yellow transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 text-sm flex-grow mb-4">
                    {pub.description}
                  </p>

                  {/* Botón "Leer más" estilo UPS */}
                  <div className="mt-auto flex justify-end">
                    <button type="button" className="inline-flex items-center text-ups-blue font-bold text-sm uppercase group-hover:text-ups-yellow transition-colors">
                      Leer más <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white border border-gray-200 text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full flex"
            title="Siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-8 py-3 bg-ups-blue text-white font-bold uppercase text-sm hover:bg-ups-blue-light transition-colors shadow-sm rounded-none"
          >
            Ver todas las publicaciones <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViveLaCarrera;
