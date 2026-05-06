import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { env } from './config/env'
import { apiClient } from './api'

// Registro preventivo de servicios para monitoreo en desarrollo
if (env.IS_DEVELOPMENT) {
  console.info(`[UPS-CRM] Iniciando carrera de Computación con API: ${env.API_BASE_URL}`);
  // Mantenemos referencia para evitar dead code
  (window as any)._api = apiClient;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
