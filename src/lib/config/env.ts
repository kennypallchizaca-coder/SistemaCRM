/** Normaliza variables de entorno usadas por la aplicación. */

function normalizeApiBaseUrl(value?: string): string {
  const fallback = 'http://localhost:1337/api';
  const rawValue = value?.trim() || fallback;
  const withoutTrailingSlash = rawValue.replace(/\/+$/, '');

  if (/\/api$/i.test(withoutTrailingSlash)) {
    return withoutTrailingSlash;
  }

  return `${withoutTrailingSlash}/api`;
}

export const env = {
  API_BASE_URL: normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL),

  APP_ENV: import.meta.env.VITE_APP_ENV ?? 'development',

  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'Carrera de Computación UPS',

  IS_PRODUCTION: import.meta.env.PROD,

  IS_DEVELOPMENT: import.meta.env.DEV,
} as const;
