import { useEffect } from 'react';
import { Navbar, Footer } from '../components/layout';
import { Hero, ViveLaCarrera, InteresadosForm, Agrupaciones, Alianzas, Empresas, TrabajaConNosotros } from '../components/landing';

const HomePage = () => {
  // Scroll al inicio al cargar y limpia hash para evitar scroll automático a secciones
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);

    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="font-sans text-gray-800 flex flex-col min-h-screen overflow-x-hidden w-full relative">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <ViveLaCarrera />
        <InteresadosForm />
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
