/**
 * types/landing.types.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Tipos para los datos que se muestran en la landing page.
 * Cuando el backend esté listo, estos modelos se mapearán
 * desde las respuestas de la API.
 */

/** Slide del carrusel Hero */
export interface HeroSlide {
  src: string;
  alt: string;
}

/** Ítem de navegación */
export interface NavItem {
  label: string;
  href: string;
}

/** Publicación / Noticia */
export interface Publication {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  imageUrl: string;
}

/** Agrupación estudiantil */
export interface Agrupacion {
  id: number;
  title: string;
  description: string;
  image: string;
}

/** Grupo de investigación */
export interface GrupoInvestigacion {
  id: number;
  title: string;
  description: string;
  image: string;
}

/** Alianza académica */
export interface Alianza {
  id: number;
  name: string;
  logo: string;
}

/** Empresa vinculada */
export interface Empresa {
  name: string;
  image: string;
}
