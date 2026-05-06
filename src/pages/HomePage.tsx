import { useEffect } from 'react';
import { Navbar, Footer } from '../components/layout';
import { Hero, ViveLaCarrera, Agrupaciones, GruposInvestigacion, Alianzas, Empresas, TrabajaConNosotros } from '../components/landing';

const HomePage = () => {
  // Manejar scroll a secciones por hash
  useEffect(() => {
    const handleScrollToHash = () => {
      const { hash } = window.location;
      if (hash) {
        // Pequeño delay para asegurar que el DOM esté renderizado
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

    // Ejecutar al montar
    handleScrollToHash();

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleScrollToHash);
    return () => window.removeEventListener('hashchange', handleScrollToHash);
  }, []);

  return (
    <div className="font-sans text-gray-800 flex flex-col min-h-screen overflow-x-hidden w-full relative">
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
