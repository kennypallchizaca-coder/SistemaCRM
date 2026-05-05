import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ups-blue text-white/90 py-16 border-t-4 border-ups-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Col 1 */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Universidad Politécnica Salesiana</h3>
            <p className="text-sm mb-2">Sede Cuenca</p>
            <p className="text-sm font-semibold text-white">Carrera de Computación</p>
          </div>

          {/* Col 2 */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#inicio" className="hover:text-ups-yellow transition-colors">Inicio</a></li>
              <li><a href="#noticias" className="hover:text-ups-yellow transition-colors">Publicaciones</a></li>
              <li><a href="#grupos-estudiantiles" className="hover:text-ups-yellow transition-colors">Agrupaciones</a></li>
              <li><a href="#vinculacion" className="hover:text-ups-yellow transition-colors">Trabaja con nosotros</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-ups-yellow shrink-0 mt-0.5" />
                <span>Calle Vieja 12-30 y Elia Liut.<br />Cuenca - Ecuador</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-ups-yellow shrink-0" />
                <span>(+593) 7 413 5250</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-ups-yellow shrink-0" />
                <a href="mailto:computacion@ups.edu.ec" className="hover:text-ups-yellow transition-colors">computacion@ups.edu.ec</a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/UPSalesianaEc/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-ups-yellow hover:text-ups-dark transition-all flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07c0-6.63-5.37-12-12-12s-12 5.37-12 12c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95H15.83c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.39C19.61 23.03 24 18.06 24 12.07z" /></svg>
              </a>
              <a href="https://twitter.com/UPSalesianaEc" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-ups-yellow hover:text-ups-dark transition-all flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93ZM17.61 20.64h2.04L6.49 3.24H4.3Z" /></svg>
              </a>
              <a href="https://www.instagram.com/upsalesianaec/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-ups-yellow hover:text-ups-dark transition-all flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.21-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg>
              </a>
              <a href="https://www.tiktok.com/@upsalesianaec" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-ups-yellow hover:text-ups-dark transition-all flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.93 2.06 2.06 0 1.14-.93 2.07-2.06 2.07zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0h.01z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-sm text-center">
          <p>&copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Universidad Politécnica Salesiana. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
