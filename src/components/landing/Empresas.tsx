import React, { useRef } from 'react';
import { Building2, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

const EMPRESAS = [
  { name: 'Astronet', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600' },
  { name: 'Audited', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600' },
  { name: 'Compufacil', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600' },
  { name: 'EMOV', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600' },
  { name: 'Cátedra UNESCO', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600' },
  { name: 'Kunansoft', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600' },
  { name: 'Nikolasoft', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600' },
  { name: 'Physeter', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600' },
  { name: 'Sistelcel', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600' },
  { name: 'Sonet', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
  { name: 'FINETIC', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600' },
  { name: 'Telecomaustro', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600' }
];

const Empresas: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
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
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-ups-yellow mb-4 uppercase tracking-wide">
              Empresas y vinculación
            </h2>
            <div className="w-24 h-1 bg-ups-yellow mb-6"></div>
            <p className="text-white/90 text-lg leading-relaxed">
              Conoce las organizaciones e instituciones con las que nuestros estudiantes han desarrollado prácticas profesionales, pasantías y proyectos conjuntos.
            </p>
          </div>
          <a 
            href="#vinculacion" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ups-blue font-bold rounded-none hover:bg-ups-yellow hover:text-ups-dark transition-colors shadow-lg shrink-0 uppercase text-sm"
          >
            <Briefcase size={18} />
            Trabaja con nosotros
          </a>
        </div>

        {/* Carrusel */}
        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full hidden md:flex border border-gray-200"
            title="Desplazar a la izquierda"
          >
            <ChevronLeft size={24} />
          </button>

          <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 px-4 -mx-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {EMPRESAS.map((empresa) => (
              <div key={empresa.name} className="relative snap-start shrink-0 w-[70vw] sm:w-[240px] lg:w-[260px] h-[240px] lg:h-[260px] rounded-none overflow-hidden group/card shadow-md">
                {/* Imagen de fondo */}
                <img src={empresa.image} alt={empresa.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                <div className="absolute inset-0 bg-ups-blue/80 group-hover/card:bg-ups-blue/60 transition-colors duration-300 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-ups-dark/90 via-transparent to-transparent opacity-80"></div>
                
                {/* Contenido */}
                <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
                  <Building2 size={40} className="text-ups-yellow mb-4 opacity-90 group-hover/card:-translate-y-2 transition-transform duration-300" />
                  <span className="font-bold text-lg tracking-wide text-white group-hover/card:-translate-y-1 transition-transform duration-300">{empresa.name}</span>
                </div>
              </div>
            ))}
            
            {/* Tarjeta de Call to Action */}
            <a href="#vinculacion" className="snap-start shrink-0 w-[70vw] sm:w-[240px] lg:w-[260px] bg-ups-yellow/10 backdrop-blur-md border-2 border-dashed border-ups-yellow/50 p-8 rounded-none flex flex-col items-center justify-center text-center hover:bg-ups-yellow/20 hover:-translate-y-2 transition-all duration-300 group/card aspect-square">
              <span className="font-bold text-xl tracking-wide text-ups-yellow mb-2">Únete</span>
              <span className="text-sm text-white/80">Sé parte de nuestros aliados</span>
            </a>
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white text-ups-blue hover:bg-ups-yellow hover:text-ups-dark transition-all shadow-xl rounded-full hidden md:flex border border-gray-200"
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
