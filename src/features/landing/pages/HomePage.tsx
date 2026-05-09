/** Compone la página principal de la carrera. */

import { useEffect } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { Hero, ViveLaCarrera, Agrupaciones, GruposInvestigacion, Alianzas, Empresas } from '@/features/landing';
import { TrabajaConNosotros } from '@/features/vinculacion';
import { SeoHead } from '@/components/common';

const HomePage = () => {
  useEffect(() => {
    const handleScrollToHash = () => {
      const { hash } = window.location;
      if (hash) {
        // Da tiempo a que las secciones lazy estén montadas antes de buscar el hash.
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleScrollToHash();

    window.addEventListener('hashchange', handleScrollToHash);
    return () => window.removeEventListener('hashchange', handleScrollToHash);
  }, []);

  return (
    <div className="font-sans text-zinc-800 flex flex-col min-h-screen overflow-x-hidden w-full relative">
      <SeoHead />
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <ViveLaCarrera />
        <GruposInvestigacion />
        <Agrupaciones />
        <Alianzas />
        <Empresas />
        <TrabajaConNosotros />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
