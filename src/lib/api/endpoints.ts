/** Centraliza las rutas de API usadas por el frontend. */

export const ENDPOINTS = {
  ADMISIONES: {
    CREATE: '/interested-leads',
    LIST: '/interested-leads',
    GET: (id: number) => `/interested-leads/${id}`,
    UPDATE: (id: number) => `/interested-leads/${id}`,
    DELETE: (id: number) => `/interested-leads/${id}`,
  },

  VINCULACION: {
    CREATE: '/company-requests',
    LIST: '/company-requests',
    GET: (id: number) => `/company-requests/${id}`,
    UPDATE: (id: number) => `/company-requests/${id}`,
    DELETE: (id: number) => `/company-requests/${id}`,
  },

  PUBLICACIONES: {
    LIST: '/publications',
    GET: (id: number) => `/publications/${id}`,
  },

  RESEARCH_GROUPS: {
    LIST: '/research-groups',
    GET: (id: number) => `/research-groups/${id}`,
  },

  AUTH: {
    LOGIN: '/auth/local',
    REGISTER: '/auth/local/register',
    ME: '/users/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  LANDING: {
    CONTENT: '/landing-contents?populate=deep',
    HERO_SLIDES: '/hero-slides?populate=*',
    ASU_GROUPS: '/asu-groups?populate=*',
    ALLIANCES: '/alliances?populate=*',
    COMPANIES: '/companies?populate=*',
  },
} as const;

