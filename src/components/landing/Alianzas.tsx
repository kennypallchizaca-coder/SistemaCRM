import React from 'react';

const ALIANZAS = [
  {
    id: 1,
    name: 'Cisco Academy',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg'
  },
  {
    id: 2,
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
  },
  {
    id: 3,
    name: 'IBM',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg'
  },
  {
    id: 4,
    name: 'ABET',
    logo: '/ABET_logo.svg'
  },
];

const Alianzas: React.FC = () => {
  return (
    <section id="alianzas" className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-ups-blue uppercase tracking-wide text-center">
            Alianzas académicas
          </h2>
          <div className="w-24 h-1 bg-ups-yellow mt-4"></div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {ALIANZAS.map((alianza) => (
            <div
              key={alianza.id}
              className="group p-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              title={alianza.name}
            >
              <img
                src={alianza.logo}
                alt={`Logo de ${alianza.name}`}
                className="h-10 md:h-14 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Alianzas;
