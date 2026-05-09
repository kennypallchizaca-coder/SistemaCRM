/** Configura providers globales, rutas y carga diferida de páginas. */

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTopButton, ScrollToTop } from '@/components/layout';
import { GuestRoute } from '@/app/routes/guards';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { NotificationProvider } from '@/lib/notifications/NotificationContext';
import { ToastContainer } from '@/components/common';

const HomePage = lazy(() => import('@/features/landing/pages/HomePage'));
const InteresadosPage = lazy(() => import('@/features/admisiones/pages/InteresadosPage'));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const NotFoundPage = lazy(() => import('@/app/pages/NotFoundPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5]">
    <div className="flex flex-col items-center gap-4">
      <svg className="animate-spin size-8 text-[#005BAA]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      <p className="text-[#005BAA] font-semibold tracking-widest text-sm uppercase">Cargando…</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <ScrollToTop />
          <ScrollToTopButton />
          <ToastContainer />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/interesados" element={<InteresadosPage />} />

              <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
              <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />


              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
