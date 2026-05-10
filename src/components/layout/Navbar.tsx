/** Renderiza la navegación principal y el menú móvil. */

import React, { useState } from 'react';
import { Menu, X, User, ArrowLeft, Globe, BookOpen, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { INSTITUTION, NAV_ITEMS } from '@/lib/config/constants';
import { useAuth } from '@/features/auth';
import { useLandingData } from '@/features/landing';

interface NavbarProps {
  simplified?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ simplified = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { data } = useLandingData();
  const content = data.content;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Los hashes dentro del home usan scroll suave; desde otras rutas navegan primero.
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      
      if (location.pathname === path || (location.pathname === '/' && path === '')) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        }
      } else {
        navigate(href);
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b-4 border-ups-yellow" style={{ WebkitTransform: 'translateZ(0)' }}>
      <div className="bg-ups-blue h-10 w-full flex items-center justify-start px-4 sm:px-6 lg:px-8 text-white">
        {!simplified && (
          <div className="flex items-center gap-8">
            <a
              href={content.links.portal}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-ups-yellow transition-colors text-[11px] font-semibold uppercase tracking-wider"
            >
              <Globe size={14} />
              <span>Portal UPS</span>
            </a>

            <a
              href={content.links.avac}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-ups-yellow transition-colors text-[11px] font-semibold uppercase tracking-wider"
            >
              <BookOpen size={14} />
              <span>AVAC</span>
            </a>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-md">
                  <User size={16} className="text-ups-yellow" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest max-w-[120px] truncate">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-red-500/80 px-3 py-1.5 rounded-md transition-all group"
                >
                  <LogOut size={15} className="group-hover:text-white transition-colors" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest">Salir</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-all group"
              >
                <User size={18} className="group-hover:text-ups-yellow transition-colors" />
                <span className="text-[11px] font-semibold uppercase tracking-widest">Login</span>
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10 min-h-[4.5rem] sm:min-h-[5rem] md:min-h-[6rem] flex items-center justify-between">
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
          <div className="ml-2 pl-2 sm:ml-3 sm:pl-3 border-l-2 border-zinc-200 flex flex-col justify-center">
            <h1 className="text-ups-blue font-semibold uppercase tracking-wide leading-tight text-[9px] sm:text-xs lg:text-sm whitespace-nowrap">
              {content.career}
            </h1>
            <span className="text-zinc-500 font-normal text-[8px] sm:text-[10px] lg:text-xs mt-0.5 whitespace-nowrap">{content.sede}</span>
          </div>
        </div>

        {!simplified && (
          <nav className="hidden xl:flex items-center gap-7 mr-100">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-semibold text-ups-blue uppercase hover:text-ups-yellow transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-ups-yellow transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        )}

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

        {simplified && (
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 text-ups-blue hover:text-ups-yellow transition-colors font-extrabold text-xs sm:text-sm uppercase tracking-tighter group"
            title="Volver al Inicio"
          >
            <div className="size-9 sm:size-10 bg-ups-blue text-white flex items-center justify-center rounded-full shadow-md group-hover:bg-ups-yellow group-hover:text-ups-blue group-hover:rotate-[-360deg] transition-all duration-500">
              <ArrowLeft size={18} />
            </div>
            <span className="hidden sm:inline">Volver al Inicio</span>
          </Link>
        )}
      </div>

      {isOpen && (
        <div className="xl:hidden bg-white border-t border-zinc-200 absolute w-full shadow-lg z-40">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-3 py-3.5 border-b border-zinc-100 text-base font-semibold text-ups-blue uppercase hover:text-ups-yellow hover:bg-zinc-50 transition-colors min-h-[44px] flex items-center"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated && user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-3.5 border-b border-zinc-100 text-base font-semibold text-red-600 uppercase hover:bg-red-50 transition-colors min-h-[44px]"
              >
                <LogOut size={18} />
                Cerrar sesión ({user.username})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-3.5 border-b border-zinc-100 text-base font-semibold text-ups-blue uppercase hover:text-ups-yellow hover:bg-zinc-50 transition-colors min-h-[44px]"
              >
                <User size={18} />
                Iniciar sesión
              </Link>
            )}

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
