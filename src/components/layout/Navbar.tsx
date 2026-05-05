import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Admisiones', href: '#admisiones' },
  { label: 'Agrupaciones', href: '#grupos-estudiantiles' },
  { label: 'Alianzas', href: '#alianzas' },
  { label: 'Empresas', href: '#empresas' },
  { label: 'Vinculación', href: '#vinculacion' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b-4 border-ups-yellow">
      {/* Top small bar */}
      <div className="bg-ups-blue h-8 w-full flex items-center justify-end px-4 sm:px-6 lg:px-8 text-xs text-white">
        <div className="flex gap-4">
          <a href="https://www.ups.edu.ec/" target="_blank" rel="noopener noreferrer" className="hover:text-ups-yellow transition-colors">Portal UPS</a>
          <a href="https://avac.ups.edu.ec/" target="_blank" rel="noopener noreferrer" className="hover:text-ups-yellow transition-colors">AVAC</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 min-h-[5rem] md:min-h-[6rem] flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center z-10 shrink">
          <button 
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-shrink-0 cursor-pointer focus:outline-none"
          >
            <img
              src="/logoupscolor.svg"
              alt="Universidad Politécnica Salesiana"
              className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto max-w-[140px] sm:max-w-[200px] lg:max-w-[280px] object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://posgrados.ups.edu.ec/wp-content/uploads/2021/04/logo-ups.png";
              }}
            />
          </button>
          <div className="ml-2 sm:ml-4 pl-2 sm:pl-4 border-l-2 border-gray-200 flex flex-col justify-center shrink">
            <h1 className="text-ups-blue font-bold uppercase tracking-wide leading-tight text-[10px] sm:text-xs lg:text-sm whitespace-nowrap">
              Carrera de Computación
            </h1>
            <span className="text-gray-500 font-normal text-[9px] sm:text-xs mt-0.5 whitespace-nowrap">Sede Cuenca</span>
          </div>
        </div>

        {/* Menú de rutas */}
        <div className="flex items-center justify-end z-20 shrink-0 ml-2">
          {/* Desktop Menu */}
          <nav className="hidden xl:flex space-x-6 items-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-ups-blue uppercase hover:text-ups-yellow transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-ups-yellow transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ups-blue hover:text-ups-yellow focus:outline-none p-1 sm:p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 border-b border-gray-100 text-base font-semibold text-ups-blue uppercase hover:text-ups-yellow hover:bg-gray-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
