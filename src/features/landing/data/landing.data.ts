/** Centraliza los datos estáticos usados por la landing. */

import type {
  HeroSlide,
  NavItem,
  Publication,
  Agrupacion,
  GrupoInvestigacion,
  Alianza,
  Empresa,
} from '@/features/landing/types/landing.types';


export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Admisiones', href: '/interesados' },
  { label: 'Investigación', href: '/#investigacion' },
  { label: 'Agrupaciones', href: '/#agrupaciones' },
  { label: 'Alianzas', href: '/#alianzas' },
  { label: 'Empresas', href: '/#empresas' },
];


export const HERO_SLIDES: HeroSlide[] = [
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000',
    alt: 'Estudiantes colaborando en laboratorio de computación',
  },
  {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2000',
    alt: 'Trabajo en equipo con tecnología',
  },
  {
    src: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=2000',
    alt: 'Desarrollo de software y programación',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000',
    alt: 'Equipo de innovación tecnológica',
  },
];


export const PUBLICATIONS: Publication[] = [
  {
    id: 1,
    title: 'Nuevos laboratorios de Inteligencia Artificial',
    category: 'NOTICIAS',
    date: '2026-05-01',
    description: 'La carrera de Computación inauguró nuevos espacios para el desarrollo de proyectos con IA.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    title: 'Acreditación internacional ABET',
    category: 'ACADÉMICO',
    date: '2026-04-15',
    description: 'Nuestra carrera mantiene los más altos estándares de calidad educativa reconocidos mundialmente.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    title: 'Feria de proyectos "Del Cole a la U"',
    category: 'VINCULACIÓN',
    date: '2026-04-02',
    description: 'Más de 500 estudiantes de bachillerato visitaron nuestros laboratorios y conocieron nuestros proyectos.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 4,
    title: 'Estudiantes ganan hackathon nacional',
    category: 'LOGROS',
    date: '2026-03-20',
    description: 'El grupo de robótica e IA de la UPS sede Cuenca obtuvo el primer lugar en la competencia nacional.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
  },
];


export const AGRUPACIONES: Agrupacion[] = [
  {
    id: 1,
    title: 'ASU Software Libre',
    description: 'Comunidad estudiantil orientada a aprendizaje, proyectos y difusión de software libre.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    title: 'Grupos de investigación',
    description: 'Participación en proyectos académicos, investigación aplicada y desarrollo tecnológico.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    title: 'Comunidades tecnológicas',
    description: 'Eventos, talleres, charlas y espacios de vinculación con el ecosistema tecnológico.',
    image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=600',
  },
];


export const GRUPOS_INVESTIGACION: GrupoInvestigacion[] = [
  {
    id: 1,
    title: 'Inteligencia Artificial',
    description: 'Investigación en algoritmos de aprendizaje automático, redes neuronales y visión por computadora aplicada.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    title: 'Sistemas Distribuidos',
    description: 'Desarrollo de arquitecturas escalables, computación en la nube y optimización de redes de datos.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    title: 'Ciencia de Datos',
    description: 'Análisis de grandes volúmenes de datos, minería de datos y modelos predictivos para la toma de decisiones.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 4,
    title: 'Innovación Tecnológica',
    description: 'Proyectos de investigación interdisciplinarios enfocados en la innovación y resolución de problemas sociales.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600',
  },
];


export const ALIANZAS: Alianza[] = [
  { id: 1, name: 'Cisco Academy', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' },
  { id: 2, name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { id: 3, name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
  { id: 4, name: 'ABET', logo: '/ABET_logo.svg' },
];


export const EMPRESAS: Empresa[] = [
  { name: 'Astronet', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600' },
  { name: 'Audited', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600' },
  { name: 'Compufacil', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600' },
  { name: 'EMOV', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600' },
  { name: 'Cátedra UNESCO', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600' },
  { name: 'Kunansoft', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600' },
  { name: 'Nikolasoft', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600' },
  { name: 'Physeter', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600' },
  { name: 'Sistelcel', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600' },
  { name: 'Sonet', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
  { name: 'FINETIC', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600' },
  { name: 'Telecomaustro', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600' },
];
