/**
 * config/constants.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Constantes globales de la aplicación.
 * Agrupa valores que se usan en múltiples partes del proyecto.
 */

/** Información institucional de la carrera */
export const INSTITUTION = {
  NAME: 'Universidad Politécnica Salesiana',
  CAREER: 'Carrera de Computación',
  SEDE: 'Sede Cuenca',
  FULL_NAME: 'Carrera de Computación · UPS Cuenca',
  PORTAL_URL: 'https://www.ups.edu.ec/',
  AVAC_URL: 'https://avac.ups.edu.ec/',
  FACEBOOK_URL: 'https://www.facebook.com/UPSalesianaEc/',
  INSTAGRAM_URL: 'https://www.instagram.com/upsalesianaec/',
  TIKTOK_URL: 'https://www.tiktok.com/@upsalesianaec',
} as const;

/** Parámetros del carrusel Hero */
export const HERO_CONFIG = {
  SLIDE_DURATION_MS: 5000,
} as const;

/** Parámetros de scroll de los carruseles de secciones */
export const CAROUSEL_CONFIG = {
  SCROLL_AMOUNT_PX: 380,
  EMPRESAS_SCROLL_AMOUNT_PX: 300,
  NOTICIAS_SCROLL_AMOUNT_PX: 350,
} as const;
