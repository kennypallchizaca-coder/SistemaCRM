/** Centraliza constantes institucionales y parámetros de UI. */

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
  X_URL: 'https://x.com/upsalesianaec',
} as const;

export const HERO_CONFIG = {
  SLIDE_DURATION_MS: 5000,
} as const;

export const CAROUSEL_CONFIG = {
  SCROLL_AMOUNT_PX: 380,
  EMPRESAS_SCROLL_AMOUNT_PX: 300,
  NOTICIAS_SCROLL_AMOUNT_PX: 350,
} as const;

export const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Admisiones', href: '/interesados' },
  { label: 'Investigación', href: '/#investigacion' },
  { label: 'Agrupaciones', href: '/#agrupaciones' },
  { label: 'Alianzas', href: '/#alianzas' },
  { label: 'Empresas', href: '/#empresas' },
] as const;


