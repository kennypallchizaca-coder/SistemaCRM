import React, { useState } from 'react';
import { Menu, X, User, ArrowLeft, Globe, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/landing.data';
import { INSTITUTION } from '../../config/constants';

interface NavbarProps {
  simplified?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ simplified = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b-4 border-ups-yellow" style={{ WebkitTransform: 'translateZ(0)' }}>
      {/* Top small bar */}
      <div className="bg-ups-blue h-10 w-full flex items-center justify-end px-4 sm:px-6 lg:px-8 text-white">
        {!simplified && (
          <div className="flex items-center gap-8">
            <a
              href={INSTITUTION.PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-ups-yellow transition-colors text-[11px] font-bold uppercase tracking-wider"
            >
              <Globe size={14} />
              <span>Portal UPS</span>
            </a>

            <a
              href={INSTITUTION.AVAC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-ups-yellow transition-colors text-[11px] font-bold uppercase tracking-wider"
            >
              <BookOpen size={14} />
              <span>AVAC</span>
            </a>

            <Link
              to="/login"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-all group"
            >
              <User size={18} className="group-hover:text-ups-yellow transition-colors" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Login</span>
            </Link>
          </div>
        )}
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10 min-h-[4.5rem] sm:min-h-[5rem] md:min-h-[6rem] flex items-center justify-between">
        {/* Logo / Brand — fijo a la izquierda */}
        <div className="flex items-center flex-shrink-0">
          <Link
            to="/"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex-shrink-0 cursor-pointer focus:outline-none"
          >
            <img
              src="/logoupscolor.svg"
              alt={INSTITUTION.NAME}
              className="h-9 sm:h-12 md:h-16 lg:h-20 w-auto max-w-[90px] sm:max-w-[180px] lg:max-w-[260px] object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://posgrados.ups.edu.ec/wp-content/uploads/2021/04/logo-ups.png";
              }}
            />
          </Link>
          <div className="ml-2 pl-2 sm:ml-3 sm:pl-3 border-l-2 border-gray-200 flex flex-col justify-center">
            <h1 className="text-ups-blue font-bold uppercase tracking-wide leading-tight text-[9px] sm:text-xs lg:text-sm whitespace-nowrap">
              {INSTITUTION.CAREER}
            </h1>
            <span className="text-gray-500 font-normal text-[8px] sm:text-[10px] lg:text-xs mt-0.5 whitespace-nowrap">{INSTITUTION.SEDE}</span>
          </div>
        </div>

        {/* Desktop Nav — alineado a la derecha */}
        {!simplified && (
          <nav className="hidden xl:flex items-center gap-7 mr-100">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-semibold text-ups-blue uppercase hover:text-ups-yellow transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-ups-yellow transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        )}

        {/* Mobile Menu Button — extremo derecho en móvil */}
        {!simplified && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            className="xl:hidden text-ups-blue hover:text-ups-yellow focus:outline-none p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Botón Volver al Inicio en modo simplificado */}
        {simplified && (
          <Link
            to="/"
            className="flex items-center gap-3 text-ups-blue hover:text-ups-yellow transition-colors font-extrabold text-xs sm:text-sm uppercase tracking-tighter group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-ups-blue text-white flex items-center justify-center rounded-full shadow-md group-hover:bg-ups-yellow group-hover:text-ups-blue group-hover:rotate-[-360deg] transition-all duration-500">
              <ArrowLeft size={20} />
            </div>
            <span>Volver al Inicio</span>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200 absolute w-full shadow-lg z-40">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3.5 border-b border-gray-100 text-base font-semibold text-ups-blue uppercase hover:text-ups-yellow hover:bg-gray-50 transition-colors min-h-[44px] flex items-center"
              >
                {item.label}
              </Link>
            ))}

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
