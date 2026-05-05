import React, { useState } from 'react';
import { Send } from 'lucide-react';

const InteresadosForm: React.FC = () => {
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
    <section id="admisiones" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-ups-blue mb-6">
              ¿Quieres conocer más sobre la carrera?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Registra tus datos y recibe información sobre la carrera, campo laboral, malla curricular, laboratorios, acreditación y proceso de admisión.
            </p>
            <div className="bg-ups-yellow/10 rounded-lg p-4 border border-ups-yellow/20">
              <p className="text-sm text-gray-600 italic">
                Este formulario permite identificar interesados provenientes de ferias, visitas a colegios, recorridos en la universidad o difusión digital.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-none shadow-md p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-ups-yellow"></div>
              
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Información enviada!</h3>
                  <p className="text-gray-600">Pronto nos pondremos en contacto contigo.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-ups-blue font-semibold hover:underline">
                    Enviar otro registro
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-xs text-gray-500 text-right mb-2">* Campos obligatorios</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                      <input id="nombre" name="nombre" required type="text" autoComplete="name" placeholder="Ej. Juan Pérez" aria-required="true" className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-ups-blue focus:border-ups-blue outline-none transition-all" />
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                      <input id="telefono" name="telefono" required type="tel" pattern="[0-9]{10}" maxLength={10} title="Ingrese 10 dígitos numéricos (Ej. 0912345678)" autoComplete="tel" placeholder="Ej. 09XXXXXXXX" aria-required="true" className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-ups-blue focus:border-ups-blue outline-none transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
                      <input id="correo" name="correo" required type="email" autoComplete="email" placeholder="correo@ejemplo.com" aria-required="true" className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-ups-blue focus:border-ups-blue outline-none transition-all" />
                    </div>
                    <div>
                      <label htmlFor="institucion" className="block text-sm font-medium text-gray-700 mb-1">Institución educativa</label>
                      <input id="institucion" name="institucion" type="text" autoComplete="organization" placeholder="Nombre del colegio" className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-ups-blue focus:border-ups-blue outline-none transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="evento" className="block text-sm font-medium text-gray-700 mb-1">Evento *</label>
                      <select id="evento" name="evento" required defaultValue="" aria-required="true" className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-ups-blue focus:border-ups-blue outline-none transition-all bg-white">
                        <option value="" disabled>Seleccionar evento</option>
                        <option value="Feria">Feria</option>
                        <option value="Recorrido UPS">Recorrido UPS</option>
                        <option value="Redes sociales">Redes sociales</option>
                        <option value="Visita a colegio">Visita a colegio</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="interes" className="block text-sm font-medium text-gray-700 mb-1">Interés principal</label>
                      <select id="interes" name="interes" defaultValue="Información general" className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-ups-blue focus:border-ups-blue outline-none transition-all bg-white">
                        <option value="Información general">Información general</option>
                        <option value="Malla curricular">Malla curricular</option>
                        <option value="Campo laboral">Campo laboral</option>
                        <option value="Laboratorios">Laboratorios</option>
                        <option value="Admisión">Admisión</option>
                        <option value="Becas">Becas</option>
                        <option value="Acreditación">Acreditación</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
                    <textarea id="observaciones" name="observaciones" placeholder="Mensaje opcional..." rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-ups-blue focus:border-ups-blue outline-none transition-all resize-none"></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-ups-blue text-white font-bold rounded-none hover:bg-ups-blue-light transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : (
                      <>
                        Enviar información
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InteresadosForm;
