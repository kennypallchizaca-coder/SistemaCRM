/** Define los tipos de contenido usados por la landing. */

export interface HeroSlide {
  src: string;
  alt: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Publication {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  imageUrl: string;
}

export interface Agrupacion {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface GrupoInvestigacion {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Alianza {
  id: number;
  name: string;
  logo: string;
}

export interface Empresa {
  name: string;
  image: string;
}
