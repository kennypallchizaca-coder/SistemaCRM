/** Inicializa React y monta la aplicación principal. */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import App from '@/app/App'
import { env } from '@/lib/config/env'
import { apiClient } from '@/lib/api'

if (env.IS_DEVELOPMENT) {
  console.info(`[UPS-CRM] Iniciando carrera de Computación con API: ${env.API_BASE_URL}`);
  (window as Window & { _api?: typeof apiClient })._api = apiClient;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
