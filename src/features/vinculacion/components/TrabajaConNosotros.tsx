/** Renderiza el formulario de vinculación para empresas. */

import React, { useEffect } from 'react';
import { Send, Building, Lock } from 'lucide-react';
import { useVinculacion } from '@/features/vinculacion';
import type { EmpresaFormData } from '@/features/vinculacion';
import { useAuth } from '@/features/auth';
import { Link } from 'react-router-dom';
import { useFormState } from '@/lib/hooks';
import { vinculacionSchema } from '@/lib/validation';
import { useNotify } from '@/lib/notifications';

const TrabajaConNosotros: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { state, submitForm, reset } = useVinculacion();
  const notify = useNotify();

    const form = useFormState(
    { empresa: '', contacto: '', correo: '', telefono: '', mensaje: '' },
    vinculacionSchema
  );

  const isSubmitting = state.status === 'loading';
  const submitted = state.status === 'success';

    useEffect(() => {
    if (state.status === 'success') {
      notify.success('¡Solicitud de vinculación enviada exitosamente!');
    } else if (state.status === 'error' && state.error) {
      notify.error(state.error);
    }
  }, [notify, state.status, state.error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.hasErrors) return;

    const data: EmpresaFormData = {
      empresa: form.values.empresa,
      contacto: form.values.contacto,
      correo: form.values.correo,
      telefono: form.values.telefono,
      mensaje: form.values.mensaje,
    };

    submitForm(data);
  };

  return (
    <section id="vinculacion" className="py-20 bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="size-16 bg-ups-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Building size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-ups-blue mb-4">Trabaja con nosotros</h2>
          <p className="text-lg text-zinc-600">
            Formulario dirigido a empresas o instituciones interesadas en pasantías, prácticas, charlas técnicas, vinculación o proyectos conjuntos con la carrera.
          </p>
        </div>

        <div className="bg-white rounded-none shadow-md p-5 sm:p-8 md:p-10">
          {submitted ? (
             <div className="text-center py-10">
               <h3 className="text-2xl font-semibold text-ups-blue mb-2">¡Solicitud enviada exitosamente!</h3>
               <p className="text-zinc-600">Nuestro equipo de vinculación revisará su propuesta y se pondrá en contacto a la brevedad.</p>
               <button onClick={reset} className="mt-6 text-ups-blue font-semibold hover:underline">
                 Enviar nueva solicitud
               </button>
             </div>
          ) : (
            <div className="relative">
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
                <fieldset disabled={!isAuthenticated} className={`flex flex-col gap-y-6 transition-all duration-300 ${!isAuthenticated ? 'opacity-30 blur-[2px] pointer-events-none select-none' : ''}`}>
                  <p className="text-xs text-zinc-500 text-right mb-2">* Campos obligatorios</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-zinc-700 mb-1">Empresa *</label>
                      <input id="empresa" name="empresa" required type="text" autoComplete="organization" placeholder="Nombre de la empresa" aria-required="true" value={form.values.empresa} onChange={form.handleChange} onBlur={form.handleBlur} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-none focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all disabled:bg-zinc-100" />
                    </div>
                    <div>
                      <label htmlFor="contacto" className="block text-sm font-medium text-zinc-700 mb-1">Contacto *</label>
                      <input id="contacto" name="contacto" required type="text" autoComplete="name" placeholder="Nombre del contacto" aria-required="true" value={form.values.contacto} onChange={form.handleChange} onBlur={form.handleBlur} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-none focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all disabled:bg-zinc-100" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="correo-empresa" className="block text-sm font-medium text-zinc-700 mb-1">Correo electrónico *</label>
                      <input id="correo-empresa" name="correo" required type="email" autoComplete="email" placeholder="empresa@dominio.com" aria-required="true" value={form.values.correo} onChange={form.handleChange} onBlur={form.handleBlur} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-none focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all disabled:bg-zinc-100" />
                    </div>
                    <div>
                      <label htmlFor="telefono-empresa" className="block text-sm font-medium text-zinc-700 mb-1">Teléfono *</label>
                      <input id="telefono-empresa" name="telefono" required type="tel" pattern="[0-9]{10}" maxLength={10} title="Ingrese 10 dígitos numéricos (Ej. 0912345678)" autoComplete="tel" placeholder="Teléfono" aria-required="true" value={form.values.telefono} onChange={form.handleChange} onBlur={form.handleBlur} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-none focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all disabled:bg-zinc-100" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-zinc-700 mb-1">Mensaje *</label>
                    <textarea id="mensaje" name="mensaje" required placeholder="Describa el tipo de colaboración (pasantías, proyectos, charlas...)" rows={4} aria-required="true" value={form.values.mensaje} onChange={form.handleChange} onBlur={form.handleBlur} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-none focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all resize-none disabled:bg-zinc-100"></textarea>
                  </div>

                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !isAuthenticated}
                      className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-ups-yellow text-ups-dark font-semibold rounded-none hover:bg-yellow-400 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] w-full sm:w-auto"
                    >
                      {isSubmitting ? 'Enviando…' : (
                        <>
                          Enviar solicitud
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </fieldset>
              </form>

              {!isAuthenticated && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
                  <div className="relative bg-white p-8 md:p-10 shadow-2xl border border-zinc-100 flex flex-col items-center text-center max-w-md w-full animate-fade-up">
                    <div className="size-16 bg-ups-blue/5 text-ups-blue rounded-full flex items-center justify-center mb-5">
                      <Lock size={32} />
                    </div>
                    <h3 className="text-2xl font-semibold text-ups-blue mb-3">Inicio de sesión requerido</h3>
                    <p className="text-zinc-600 mb-8 text-sm leading-relaxed">
                      Para brindarte una mejor atención y seguridad, te pedimos que ingreses con tu cuenta institucional para habilitar este formulario.
                    </p>
                    <div className="w-full flex flex-col gap-3">
                      <Link to="/login" className="w-full py-3.5 bg-ups-blue text-white font-semibold uppercase tracking-widest text-sm hover:bg-[#004a88] transition-colors rounded-none shadow-md">
                        Iniciar Sesión
                      </Link>
                      <Link to="/register" className="w-full py-3.5 bg-white text-ups-blue border border-zinc-200 font-semibold uppercase tracking-widest text-sm hover:bg-zinc-50 transition-colors rounded-none shadow-sm">
                        Crear una cuenta
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default TrabajaConNosotros;
