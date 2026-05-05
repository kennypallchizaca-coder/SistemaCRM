import React, { useState } from 'react';
import { Send, Building } from 'lucide-react';

const TrabajaConNosotros: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Connect to Strapi API later
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="vinculacion" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-ups-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Building size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-ups-blue mb-4">Trabaja con nosotros</h2>
          <p className="text-lg text-gray-600">
            Formulario dirigido a empresas o instituciones interesadas en pasantías, prácticas, charlas técnicas, vinculación o proyectos conjuntos con la carrera.
          </p>
        </div>

        <div className="bg-white rounded-none shadow-md p-8 md:p-10">
          {submitted ? (
             <div className="text-center py-10">
               <h3 className="text-2xl font-bold text-ups-blue mb-2">¡Solicitud enviada exitosamente!</h3>
               <p className="text-gray-600">Nuestro equipo de vinculación revisará su propuesta y se pondrá en contacto a la brevedad.</p>
               <button onClick={() => setSubmitted(false)} className="mt-6 text-ups-blue font-semibold hover:underline">
                 Enviar nueva solicitud
               </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-xs text-gray-500 text-right mb-2">* Campos obligatorios</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">Empresa *</label>
                  <input id="empresa" name="empresa" required type="text" autoComplete="organization" placeholder="Nombre de la empresa" aria-required="true" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label htmlFor="contacto" className="block text-sm font-medium text-gray-700 mb-1">Contacto *</label>
                  <input id="contacto" name="contacto" required type="text" autoComplete="name" placeholder="Nombre del contacto" aria-required="true" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="correo-empresa" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
                  <input id="correo-empresa" name="correo" required type="email" autoComplete="email" placeholder="empresa@dominio.com" aria-required="true" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label htmlFor="telefono-empresa" className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                  <input id="telefono-empresa" name="telefono" required type="tel" pattern="[0-9]{10}" maxLength={10} title="Ingrese 10 dígitos numéricos (Ej. 0912345678)" autoComplete="tel" placeholder="Teléfono" aria-required="true" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all" />
                </div>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                <textarea id="mensaje" name="mensaje" required placeholder="Describa el tipo de colaboración (pasantías, proyectos, charlas...)" rows={4} aria-required="true" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all resize-none"></textarea>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-ups-yellow text-ups-dark font-bold rounded-none hover:bg-yellow-400 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : (
                    <>
                      Enviar solicitud
                      <Send size={20} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default TrabajaConNosotros;
