/** Normaliza variables de entorno usadas por la aplicación. */

const LOCAL_API_BASE_URL = 'http://localhost:1337/api';

function requiredApiBaseUrl(value?: string): string {
  const rawValue = value?.trim();

  if (import.meta.env.PROD) {
    if (/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/|$)/i.test(rawValue ?? '')) {
      throw new Error('VITE_API_BASE_URL debe usar un dominio publico en producción.');
    }

    if (rawValue) return rawValue;
    throw new Error('VITE_API_BASE_URL es requerida para producción.');
  }

  if (rawValue) return rawValue;

  return LOCAL_API_BASE_URL;
}

function normalizeApiBaseUrl(value?: string): string {
  const rawValue = requiredApiBaseUrl(value);
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
