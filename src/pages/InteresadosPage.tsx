/**
 * pages/InteresadosPage.tsx
 * ─────────────────────────────────────────────────────────────────────────
 * Página dedicada al registro de interesados (Admisiones).
 * Contiene el formulario completo y el contexto institucional.
 */

import { useEffect } from 'react';
import { Send } from 'lucide-react';
import { Navbar, Footer } from '../components/layout';
import { useAdmisiones } from '../hooks';
import type { InteresadoFormData } from '../types';

const InteresadosPage = () => {
  const { state, submitForm, reset } = useAdmisiones();

  const isSubmitting = state.status === 'loading';
  const submitted = state.status === 'success';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: InteresadoFormData = {
      nombre: formData.get('nombre') as string,
      telefono: formData.get('telefono') as string,
      correo: formData.get('correo') as string,
      institucion: formData.get('institucion') as string,
      evento: formData.get('evento') as InteresadoFormData['evento'],
      interes: (formData.get('interes') as InteresadoFormData['interes']) ?? 'Información general',
      observaciones: formData.get('observaciones') as string,
    };

    submitForm(data);
  };

  return (
    <div className="font-sans text-gray-800 flex flex-col min-h-screen overflow-x-hidden w-full relative bg-gray-50">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Contenido Informativo */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
              <h2 className="text-3xl md:text-4xl font-bold text-ups-blue mb-6 uppercase tracking-wide">
                Solicita Información
              </h2>
              <div className="w-20 h-1 bg-ups-yellow mb-8"></div>
              
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  Bienvenido al proceso de admisión de la <strong>Carrera de Computación</strong>. 
                  Estamos listos para guiarte en tu camino hacia convertirte en un profesional de la tecnología.
                </p>
                <p>
                  Al registrar tus datos, recibirás:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-base">
                  <li>Detalles de la malla curricular actualizada.</li>
                  <li>Información sobre convenios y becas disponibles.</li>
                  <li>Invitaciones a talleres y recorridos por laboratorios.</li>
                  <li>Guía paso a paso para el examen de ingreso.</li>
                </ul>
              </div>

              <div className="mt-10 bg-white p-6 border-l-2 border-ups-yellow shadow-md">
                <p className="text-sm text-gray-600 italic">
                  "Nuestra misión es formar profesionales con excelencia académica y humana, 
                  líderes en la creación de soluciones tecnológicas innovadoras."
                </p>
              </div>
            </div>

            {/* Formulario */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-none shadow-xl p-6 sm:p-10 relative overflow-hidden border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-2 bg-ups-yellow"></div>
                
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-ups-blue mb-3">¡Registro Exitoso!</h3>
                    <p className="text-gray-600 mb-8">
                      Gracias por tu interés. Un asesor académico se pondrá en contacto contigo 
                      a través de tu correo electrónico o teléfono muy pronto.
                    </p>
                    <button 
                      onClick={reset} 
                      className="px-8 py-3 bg-ups-blue text-white font-bold uppercase hover:bg-ups-blue-light transition-colors"
                    >
                      Realizar otro registro
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-ups-blue uppercase tracking-tight">Formulario de Admisión</h3>
                      <p className="text-sm text-gray-500">Por favor, completa todos los campos marcados con *</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-1.5 text-xs uppercase tracking-wider">Nombre completo *</label>
                        <input id="nombre" name="nombre" required type="text" placeholder="Ej. Juan Pérez" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all" />
                      </div>
                      <div>
                        <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-1.5 text-xs uppercase tracking-wider">Teléfono / WhatsApp *</label>
                        <input id="telefono" name="telefono" required type="tel" pattern="[0-9]{10}" maxLength={10} placeholder="Ej. 09XXXXXXXX" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="correo" className="block text-sm font-semibold text-gray-700 mb-1.5 text-xs uppercase tracking-wider">Correo electrónico *</label>
                        <input id="correo" name="correo" required type="email" placeholder="correo@ejemplo.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all" />
                      </div>
                      <div>
                        <label htmlFor="institucion" className="block text-sm font-semibold text-gray-700 mb-1.5 text-xs uppercase tracking-wider">Colegio / Institución</label>
                        <input id="institucion" name="institucion" type="text" placeholder="Nombre de tu colegio" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="evento" className="block text-sm font-semibold text-gray-700 mb-1.5 text-xs uppercase tracking-wider">¿Dónde nos conociste? *</label>
                        <select id="evento" name="evento" required defaultValue="" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                          <option value="" disabled>Seleccionar opción</option>
                          <option value="Feria">Feria Educativa</option>
                          <option value="Recorrido UPS">Recorrido por la Universidad</option>
                          <option value="Redes sociales">Redes Sociales (FB/IG/TikTok)</option>
                          <option value="Visita a colegio">Visita a mi Colegio</option>
                          <option value="Otro">Otro medio</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="interes" className="block text-sm font-semibold text-gray-700 mb-1.5 text-xs uppercase tracking-wider">Interés principal</label>
                        <select id="interes" name="interes" defaultValue="Información general" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                          <option value="Información general">Información General</option>
                          <option value="Malla curricular">Malla Curricular</option>
                          <option value="Campo laboral">Campo Laboral / Salida Profesional</option>
                          <option value="Laboratorios">Laboratorios y Tecnología</option>
                          <option value="Admisión">Proceso de Admisión</option>
                          <option value="Becas">Becas y Ayudas Económicas</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="observaciones" className="block text-sm font-semibold text-gray-700 mb-1.5 text-xs uppercase tracking-wider">¿Tienes alguna duda adicional?</label>
                      <textarea id="observaciones" name="observaciones" placeholder="Escribe aquí tu pregunta..." rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all resize-none"></textarea>
                    </div>

                    {state.status === 'error' && (
                      <div className="p-4 bg-red-50 border-l-2 border-red-500 text-red-700 text-sm">
                        {state.error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-ups-blue text-white font-bold uppercase tracking-widest hover:bg-ups-blue-light transition-all flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isSubmitting ? 'Enviando...' : (
                        <>
                          Enviar Solicitud
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
      </main>

      <Footer />
    </div>
  );
};

export default InteresadosPage;
