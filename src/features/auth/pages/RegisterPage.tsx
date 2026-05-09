/** Renderiza el formulario de registro de usuarios. */

import React, { useState } from 'react';
import {
  UserPlus,
  AlertTriangle,
  UserCircle,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  Lock,
  UserCheck,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { apiClient, ENDPOINTS } from '@/lib/api';
import { SeoHead } from '@/components/common';
import { useFormState } from '@/lib/hooks';
import { registerSchema } from '@/lib/validation';
import { useNotify } from '@/lib/notifications';

function passwordStrength(pwd: string): { label: string; color: string; width: string } {
  if (pwd.length === 0) return { label: '', color: '', width: '0%' };
  if (pwd.length < 6)   return { label: 'Muy débil', color: 'bg-red-500',    width: '25%' };
  if (pwd.length < 8)   return { label: 'Débil',     color: 'bg-orange-400', width: '50%' };
  const hasUpper = /[A-Z]/.test(pwd);
  const hasNum   = /[0-9]/.test(pwd);
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
  const score = [hasUpper, hasNum, hasSpecial].filter(Boolean).length;
  if (score >= 2) return { label: 'Fuerte',   color: 'bg-green-500',  width: '100%' };
  return              { label: 'Moderada', color: 'bg-yellow-400', width: '75%' };
}

interface FieldFeedbackProps {
  touched: boolean;
  error: string | null;
}
const FieldFeedback: React.FC<FieldFeedbackProps> = ({ touched, error }) => {
  if (!touched) return null;
  if (error)
    return (
      <p className="flex items-center gap-1 text-red-600 text-xs mt-1">
        <XCircle size={12} /> {error}
      </p>
    );
  return (
    <p className="flex items-center gap-1 text-green-600 text-xs mt-1">
      <CheckCircle size={12} /> Correcto
    </p>
  );
};

interface RegisterFormData extends Record<string, string> {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const notify = useNotify();

  const [showPwd, setShowPwd] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (values: RegisterFormData) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      await apiClient.post(ENDPOINTS.AUTH.REGISTER, {
        username: values.name,
        email:    values.email,
        password: values.password,
      });
      setSuccess(true);
      notify.success('¡Cuenta creada exitosamente! Redirigiendo al inicio de sesión…');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error
        ? err.message
        : 'Error al registrar. Intenta con otro correo.';
      setApiError(msg);
      notify.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useFormState<RegisterFormData>(
    { name: '', email: '', phone: '', password: '' },
    registerSchema,
    { onSubmit }
  );

  const pwdStrength = passwordStrength(form.values.password);

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans overflow-x-hidden">
      <SeoHead title="Registro" description="Crea tu cuenta para acceder a los servicios de la Carrera de Computación UPS." />
      <Navbar simplified />

      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-[800px] bg-white shadow-md rounded-sm overflow-hidden flex flex-col items-center py-10 px-6 md:px-20 border-t-4 border-[#003B71]">

          <div className="mb-6">
            <div className="relative">
              <UserCircle size={90} className="text-[#003B71]" strokeWidth={1.5} />
              <div className="absolute bottom-1 right-1 bg-[#005BAA] rounded-full p-1 border-2 border-white">
                <UserPlus size={14} className="text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-[#003B71] text-xl font-semibold mb-2 uppercase tracking-tight">
            Registro de Cuenta Nueva
          </h1>
          <p className="text-zinc-500 text-sm mb-8">Complete todos los campos para crear su cuenta.</p>

          {success && (
            <div className="w-full max-w-[500px] flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-md text-sm border border-green-200 mb-4">
              <CheckCircle size={20} className="flex-shrink-0" />
              <span><strong>¡Cuenta creada exitosamente!</strong> Redirigiendo al inicio de sesión…</span>
            </div>
          )}

          {apiError && (
            <div className="w-full max-w-[500px] flex items-center gap-3 p-3 bg-red-50 text-red-700 rounded-md text-sm border border-red-200 mb-4">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={form.handleSubmit} className="w-full max-w-[500px] flex flex-col gap-y-4" noValidate>

            <div className="w-full">
              <label htmlFor="reg-name" className="flex items-center gap-1.5 text-[#555] text-xs font-semibold uppercase tracking-wider mb-1.5">
                <UserCheck size={13} /> Nombre completo
              </label>
              <input
                id="reg-name"
                type="text"
                name="name"
                required
                value={form.values.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                placeholder="Ej. Juan Pérez"
                aria-describedby="name-feedback"
                aria-invalid={!!form.fieldError('name')}
                className={`w-full py-2.5 px-3 bg-[#E8F0FE] border-b-2 focus:outline-none transition-colors text-zinc-800 text-sm
                  ${form.touched.name
                    ? form.errors.name
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-green-400 focus:border-green-500'
                    : 'border-zinc-300 focus:border-[#003B71]'}`}
              />
              <div id="name-feedback">
                <FieldFeedback touched={!!form.touched.name} error={form.fieldError('name')} />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="reg-email" className="flex items-center gap-1.5 text-[#555] text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Mail size={13} /> Correo electrónico
              </label>
              <input
                id="reg-email"
                type="email"
                name="email"
                required
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                placeholder="correo@ejemplo.com"
                aria-describedby="email-feedback"
                aria-invalid={!!form.fieldError('email')}
                className={`w-full py-2.5 px-3 bg-[#E8F0FE] border-b-2 focus:outline-none transition-colors text-zinc-800 text-sm
                  ${form.touched.email
                    ? form.errors.email
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-green-400 focus:border-green-500'
                    : 'border-zinc-300 focus:border-[#003B71]'}`}
              />
              <div id="email-feedback">
                <FieldFeedback touched={!!form.touched.email} error={form.fieldError('email')} />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="reg-phone" className="flex items-center gap-1.5 text-[#555] text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Phone size={13} /> Teléfono
              </label>
              <input
                id="reg-phone"
                type="tel"
                name="phone"
                required
                value={form.values.phone}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                placeholder="09XXXXXXXX"
                maxLength={10}
                aria-describedby="phone-feedback"
                aria-invalid={!!form.fieldError('phone')}
                className={`w-full py-2.5 px-3 bg-[#E8F0FE] border-b-2 focus:outline-none transition-colors text-zinc-800 text-sm
                  ${form.touched.phone
                    ? form.errors.phone
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-green-400 focus:border-green-500'
                    : 'border-zinc-300 focus:border-[#003B71]'}`}
              />
              <div id="phone-feedback">
                <FieldFeedback touched={!!form.touched.phone} error={form.fieldError('phone')} />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="reg-password" className="flex items-center gap-1.5 text-[#555] text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Lock size={13} /> Contraseña
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  required
                  value={form.values.password}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  placeholder="Mínimo 6 caracteres"
                  aria-describedby="pwd-feedback pwd-strength"
                  aria-invalid={!!form.fieldError('password')}
                  className={`w-full py-2.5 pl-3 pr-10 bg-[#E8F0FE] border-b-2 focus:outline-none transition-colors text-zinc-800 text-sm
                    ${form.touched.password
                      ? form.errors.password
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-green-400 focus:border-green-500'
                      : 'border-zinc-300 focus:border-[#003B71]'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((p) => !p)}
                  aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#003B71] transition-colors"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {form.values.password.length > 0 && (
                <div id="pwd-strength" className="mt-2">
                  <div className="h-1 bg-zinc-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${pwdStrength.color}`}
                      style={{ width: pwdStrength.width }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">Seguridad: <span className="font-semibold">{pwdStrength.label}</span></p>
                </div>
              )}
              <div id="pwd-feedback">
                <FieldFeedback touched={!!form.touched.password} error={form.fieldError('password')} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || success}
              className={`
                relative bg-[#005BAA] text-white font-semibold py-2.5 px-10 rounded-md text-sm mt-2 uppercase
                shadow-[0_4px_0_#003a75]
                transition-all duration-100 ease-in-out
                hover:bg-[#004a88] hover:shadow-[0_4px_0_#002d5c]
                active:scale-95 active:shadow-[0_1px_0_#003a75] active:translate-y-[3px]
                focus:outline-none focus:ring-2 focus:ring-[#003B71] focus:ring-offset-2
                ${(isSubmitting || success) ? 'opacity-70 cursor-not-allowed active:scale-100 active:translate-y-0 active:shadow-[0_4px_0_#003a75]' : ''}
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin size-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  REGISTRANDO…
                </span>
              ) : 'REGISTRARSE'}
            </button>

            <div className="pt-2 text-center">
              <Link to="/login" className="text-[#005BAA] text-xs font-semibold hover:underline">
                ¿Ya tienes cuenta? INICIA SESIÓN AQUÍ
              </Link>
            </div>
          </form>

          <div className="mt-10 max-w-[650px] flex gap-3 text-[#666666] text-xs md:text-sm leading-snug border-t border-zinc-100 pt-8">
            <AlertTriangle size={20} className="flex-shrink-0 text-zinc-600" />
            <p className="font-semibold">
              Proteja sus datos personales. Utilice contraseñas seguras y no las comparta con terceros.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
