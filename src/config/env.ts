/**
 * config/env.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Centraliza el acceso a variables de entorno.
 * Define aquí todas las vars que usará el backend cuando se conecte.
 *
 * En Vite las variables de entorno públicas usan el prefijo VITE_.
 * Crea un archivo `.env.local` en la raíz del proyecto para sobreescribirlas.
 *
 * Ejemplo .env.local:
 *   VITE_API_BASE_URL=http://localhost:1337/api
 *   VITE_APP_ENV=development
 */

export const env = {
  /** URL base de la API (Strapi, Express, etc.) */
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:1337/api',

  /** Entorno de ejecución */
  APP_ENV: import.meta.env.VITE_APP_ENV ?? 'development',

  /** Nombre de la aplicación */
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'Carrera de Computación UPS',

  /** ¿Estamos en producción? */
  IS_PRODUCTION: import.meta.env.PROD,

  /** ¿Estamos en desarrollo? */
  IS_DEVELOPMENT: import.meta.env.DEV,
} as const;
