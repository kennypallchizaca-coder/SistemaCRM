/**
 * api/endpoints.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Centraliza todas las rutas de la API en un solo lugar.
 * Cuando el backend esté listo, solo hay que actualizar estas constantes.
 *
 * Estructura basada en Strapi v4 (ajustar si se usa otro backend).
 */

export const ENDPOINTS = {
  /** Dominio: Interesados / Admisiones */
  ADMISIONES: {
    /** POST — Registrar un nuevo interesado */
    CREATE: '/interesados',
    /** GET  — Listar todos los interesados (requiere auth de admin) */
    LIST: '/interesados',
    /** GET  — Obtener un interesado por ID */
    GET: (id: number) => `/interesados/${id}`,
    /** PUT  — Actualizar un interesado */
    UPDATE: (id: number) => `/interesados/${id}`,
    /** DELETE — Eliminar un interesado */
    DELETE: (id: number) => `/interesados/${id}`,
  },

  /** Dominio: Noticias / Publicaciones */
  NOTICIAS: {
    LIST: '/noticias',
    GET: (id: number) => `/noticias/${id}`,
  },

  /** Dominio: Autenticación (Strapi auth o JWT propio) */
  AUTH: {
    LOGIN: '/auth/local',
    REGISTER: '/auth/local/register',
    ME: '/users/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
} as const;
