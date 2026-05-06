import React, { useState } from 'react';
import { User, Phone, UserPlus, AlertTriangle, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/layout';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans overflow-x-hidden">
      <Navbar simplified />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-[800px] bg-white shadow-md rounded-sm overflow-hidden flex flex-col items-center py-10 px-6 md:px-20 border-t-4 border-[#003B71]">
          
          {/* User Icon - Registro */}
          <div className="mb-6">
            <div className="relative">
              <UserCircle size={90} className="text-[#003B71]" strokeWidth={1.5} />
              <div className="absolute bottom-1 right-1 bg-[#005BAA] rounded-full p-1 border-2 border-white">
                <UserPlus size={14} className="text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-[#003B71] text-xl font-bold mb-8 uppercase tracking-tight">Registro de Cuenta Nueva</h1>

          <form onSubmit={handleSubmit} className="w-full max-w-[500px] flex flex-col items-center space-y-5">
            {/* Name Field */}
            <div className="w-full">
              <label className="block text-center text-[#666666] text-sm mb-1">Nombre Completo:</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full py-2 px-3 bg-[#E8F0FE] border-b border-gray-100 focus:outline-none focus:border-[#003B71] text-center text-gray-800"
              />
            </div>

            {/* Email Field */}
            <div className="w-full">
              <label className="block text-center text-[#666666] text-sm mb-1">Correo Electrónico:</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 px-3 bg-[#E8F0FE] border-b border-gray-100 focus:outline-none focus:border-[#003B71] text-center text-gray-800"
              />
            </div>

            {/* Phone Field */}
            <div className="w-full">
              <label className="block text-center text-[#666666] text-sm mb-1">Teléfono:</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full py-2 px-3 bg-[#E8F0FE] border-b border-gray-100 focus:outline-none focus:border-[#003B71] text-center text-gray-800"
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="w-full">
                <label className="block text-center text-[#666666] text-sm mb-1 underline decoration-gray-300 underline-offset-4">Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full py-2 px-3 bg-[#E8F0FE] border-b border-gray-100 focus:outline-none focus:border-[#003B71] text-center text-gray-800"
                />
              </div>
              <div className="w-full">
                <label className="block text-center text-[#666666] text-sm mb-1 underline decoration-gray-300 underline-offset-4">Confirmar:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full py-2 px-3 bg-[#E8F0FE] border-b border-gray-100 focus:outline-none focus:border-[#003B71] text-center text-gray-800"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#005BAA] hover:bg-[#004a88] text-white font-bold py-2.5 px-10 rounded-md transition-colors text-sm shadow-sm mt-4 uppercase"
            >
              REGISTRARSE
            </button>

            {/* Back to Login */}
            <div className="pt-2 text-center">
              <Link to="/login" className="text-[#005BAA] text-xs font-bold hover:underline">
                ¿Ya tienes cuenta? INICIA SESIÓN AQUÍ
              </Link>
            </div>
          </form>

          {/* Security Message */}
          <div className="mt-10 max-w-[650px] flex gap-3 text-[#666666] text-xs md:text-sm leading-snug border-t border-gray-100 pt-8">
            <AlertTriangle size={20} className="flex-shrink-0 text-black" />
            <p className="font-bold">
              Proteja sus datos personales. Una vez finalizado el registro, asegúrese de utilizar contraseñas seguras y no compartirlas con terceros.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
