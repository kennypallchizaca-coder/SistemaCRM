/** Normaliza variables de entorno usadas por la aplicación. */

export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:1337/api',

  APP_ENV: import.meta.env.VITE_APP_ENV ?? 'development',

  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'Carrera de Computación UPS',

  IS_PRODUCTION: import.meta.env.PROD,

  IS_DEVELOPMENT: import.meta.env.DEV,
} as const;
