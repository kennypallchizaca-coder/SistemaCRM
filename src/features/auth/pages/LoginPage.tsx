/** Renderiza el formulario de inicio de sesión. */

import React, { useState } from 'react';
import {
  User,
  AlertTriangle,
  UserCircle,
  Eye,
  EyeOff,
  AlertCircle,
  Lock,
  Mail,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { useAuth } from '@/features/auth';
import { SeoHead } from '@/components/common';
import { useNotify } from '@/lib/notifications';

const LoginPage: React.FC = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);


  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const notify = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login(email, password);
      notify.success('¡Sesión iniciada correctamente!');
      navigate('/');
    } catch (err) {
      void err;
    }
  };

  const hasError = !!error;

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans overflow-x-hidden">
      <SeoHead title="Iniciar Sesión" description="Accede al sistema de la Carrera de Computación UPS." />
      <Navbar simplified />

      <main className="flex-grow flex flex-col items-center justify-center p-4 py-12">
        <div className="w-full max-w-[800px] bg-white shadow-md rounded-sm overflow-hidden flex flex-col items-center py-12 px-6 md:px-20 border-t-4 border-[#003B71]">

          <div className="mb-8">
            <div className="relative">
              <UserCircle size={100} className="text-[#003B71]" strokeWidth={1.5} />
              <div className="absolute bottom-1 right-1 bg-[#003B71] rounded-full p-1 border-2 border-white">
                <User size={16} className="text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-[#003B71] text-xl font-semibold mb-1 uppercase tracking-tight">
            Iniciar Sesión
          </h1>
          <p className="text-zinc-500 text-sm mb-8">Ingrese sus credenciales para acceder al sistema.</p>

          <form onSubmit={handleSubmit} className="w-full max-w-[400px] flex flex-col gap-y-5" noValidate>

            {hasError && (
              <div
                role="alert"
                aria-live="assertive"
                className="flex items-start gap-3 p-3 bg-red-50 text-red-700 rounded-md text-sm border border-red-200"
              >
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="w-full">
              <label
                htmlFor="login-email"
                className="flex items-center gap-1.5 text-[#555] text-xs font-semibold uppercase tracking-wider mb-1.5"
              >
                <Mail size={13} />
                Usuario (Dirección de correo)
              </label>
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                aria-invalid={hasError}
                className={`w-full py-2.5 px-3 bg-[#E8F0FE] border-b-2 focus:outline-none transition-colors text-zinc-800 text-sm
                  ${hasError
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-zinc-300 focus:border-[#003B71]'}`}
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="login-password"
                className="flex items-center gap-1.5 text-[#555] text-xs font-semibold uppercase tracking-wider mb-1.5"
              >
                <Lock size={13} />
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPwd ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError(); }}
                  aria-invalid={hasError}
                  className={`w-full py-2.5 pl-3 pr-10 bg-[#E8F0FE] border-b-2 focus:outline-none transition-colors text-zinc-800 text-sm
                    ${hasError
                      ? 'border-red-400 focus:border-red-500'
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
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notify"
                className="size-4 text-[#003B71] border-zinc-300 rounded focus:ring-0 accent-[#003B71]"
              />
              <label htmlFor="notify" className="text-[#666666] text-sm">
                Avisarme antes de abrir sesión en otros sitios.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className={`
                bg-[#005BAA] text-white font-semibold py-2.5 px-8 rounded-md text-sm uppercase
                shadow-[0_4px_0_#003a75]
                transition-all duration-100 ease-in-out
                hover:bg-[#004a88] hover:shadow-[0_4px_0_#002d5c]
                active:scale-95 active:shadow-[0_1px_0_#003a75] active:translate-y-[3px]
                focus:outline-none focus:ring-2 focus:ring-[#003B71] focus:ring-offset-2
                ${isLoading ? 'opacity-70 cursor-not-allowed active:scale-100 active:translate-y-0 active:shadow-[0_4px_0_#003a75]' : ''}
              `}
            >
              {isLoading ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin size-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  VERIFICANDO…
                </span>
              ) : 'INICIAR SESIÓN'}
            </button>

            <div className="flex justify-center gap-4 text-xs text-[#666666]">
              <button type="button" className="hover:text-[#003B71] hover:underline transition-colors">Olvidé mi contraseña</button>
              <span>·</span>
              <button type="button" className="hover:text-[#003B71] hover:underline transition-colors">Olvidé mi usuario</button>
            </div>

            <div className="pt-3 border-t border-zinc-100 text-center">
              <Link to="/register" className="text-[#005BAA] text-xs font-semibold hover:underline">
                ¿No tienes cuenta? REGÍSTRATE AQUÍ
              </Link>
            </div>
          </form>

          <div className="mt-12 max-w-[650px] flex gap-3 text-[#666666] text-sm leading-snug border-t border-zinc-100 pt-8">
            <AlertTriangle size={24} className="flex-shrink-0 text-zinc-600" />
            <p className="font-semibold">
              Por razones de seguridad, cierre la sesión y el navegador al terminar de usar servicios que requieren autenticación.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
