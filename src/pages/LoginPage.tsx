import React, { useState } from 'react';
import { User, AlertTriangle, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/layout';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans overflow-x-hidden">
      <Navbar simplified />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 py-12">
        <div className="w-full max-w-[800px] bg-white shadow-md rounded-sm overflow-hidden flex flex-col items-center py-12 px-6 md:px-20 border-t-4 border-[#003B71]">
          
          {/* User Icon - Grande y azul */}
          <div className="mb-8">
            <div className="relative">
              <UserCircle size={100} className="text-[#003B71]" strokeWidth={1.5} />
              <div className="absolute bottom-1 right-1 bg-[#003B71] rounded-full p-1 border-2 border-white">
                <User size={16} className="text-white" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-[400px] flex flex-col items-center space-y-6">
            {/* Email Field */}
            <div className="w-full">
              <label className="block text-center text-[#666666] text-sm mb-2">
                Usuario (Dirección de correo):
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-3 bg-[#E8F0FE] border-b border-gray-300 focus:outline-none focus:border-[#003B71] text-center text-gray-800"
              />
            </div>

            {/* Password Field */}
            <div className="w-full">
              <label className="block text-center text-[#666666] text-sm mb-2 underline decoration-gray-300 underline-offset-4">
                Contraseña:
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-3 bg-[#E8F0FE] border-b border-gray-300 focus:outline-none focus:border-[#003B71] text-center text-gray-800"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="notify" className="w-4 h-4 text-[#003B71] border-gray-300 rounded focus:ring-0" />
              <label htmlFor="notify" className="text-[#666666] text-sm underline decoration-gray-300 underline-offset-2">
                Avisarme antes de abrir sesión en otros sitios.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#005BAA] hover:bg-[#004a88] text-white font-bold py-2 px-8 rounded-md transition-colors text-sm shadow-sm active:shadow-inner"
            >
              INICIAR SESIÓN
            </button>

            {/* Links */}
            <div className="flex gap-4 text-xs text-[#666666] pt-2">
              <a href="#" className="hover:underline">Recordar Contraseña</a>
              <span>-</span>
              <a href="#" className="hover:underline">Olvidó su usuario?</a>
            </div>

            {/* Register Link */}
            <div className="pt-4 border-t border-gray-100 w-full text-center">
              <Link to="/register" className="text-[#005BAA] text-xs font-bold hover:underline">
                ¿No tienes cuenta? REGÍSTRATE AQUÍ
              </Link>
            </div>
          </form>

          {/* Security Message */}
          <div className="mt-12 max-w-[650px] flex gap-3 text-[#666666] text-sm leading-snug border-t border-gray-100 pt-8">
            <AlertTriangle size={24} className="flex-shrink-0 text-black" />
            <p className="font-bold">
              Por razones de seguridad, por favor cierre la sesión y cierre su navegador web cuando haya terminado de acceder a los servicios que requieren autenticación.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
