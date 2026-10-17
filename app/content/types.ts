/**
 * Tipos del contenido del sitio. El contenido vive en `app/content/` y los
 * componentes solo lo consumen.
 */

/** Enlace de navegación. `to` es una ruta interna (admite `#ancla`). */
export interface NavItem {
  label: string;
  to: string;
}

/** Metadatos SEO de una ruta. */
export interface RouteMeta {
  title: string;
  description: string;
}

/** Llamada a la acción que navega a una ruta interna. */
export interface CtaLink {
  label: string;
  to: string;
}

/** Enlace a una URL externa o a un archivo (`mailto:`, PDF, perfil…). */
export interface ExternalLink {
  label: string;
  href: string;
}

/** Contenido del hero de la página principal. */
export interface HeroContent {
  eyebrow: string;
  /** El título se compone como `lead` + `emphasis`; `emphasis` se resalta. */
  title: { lead: string; emphasis: string };
  summary: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  /** Microcopy bajo los CTA. */
  note: string;
}

/** Encabezado común de las secciones de la página principal. */
export interface SectionIntro {
  /** `id` del `<section>`: destino de los anclas de la navegación. */
  id: string;
  eyebrow: string;
  title: string;
  /** Párrafos de introducción. */
  description?: string[];
}

/** Proyecto destacado. Los casos de estudio completos llegan en la Fase 4. */
export interface Project {
  slug: string;
  name: string;
  category: string;
  summary: string;
  tagline?: string;
  /** Solo tecnologías verificadas en el CV o el repositorio. */
  stack: string[];
  /**
   * Ruta del caso de estudio. `null` mientras la ruta no exista: la tarjeta
   * no muestra el CTA para no enlazar a un 404.
   */
  caseStudyTo: string | null;
}

export interface ProjectsContent extends SectionIntro {
  cardCtaLabel: string;
  /** Enlace "Ver todos los proyectos". `null`: no se muestra. */
  allProjectsLink: ExternalLink | null;
}

/** Área del bloque "Cómo trabajo", con las tecnologías que la respaldan. */
export interface ApproachArea {
  area: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface ApproachContent extends SectionIntro {
  areas: ApproachArea[];
}

export interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  description: string;
}

export interface EducationItem {
  title: string;
  institution: string;
  period: string;
}

/** Sección con un CTA hacia el CV, visible solo si `site.cvHref` existe. */
export interface ExperienceContent extends SectionIntro {
  cvCtaLabel: string;
}

export interface AboutContent extends SectionIntro {
  cta: CtaLink;
}

export interface ContactContent extends SectionIntro {
  primaryCtaLabel: string;
  cvCtaLabel: string;
  note: string;
}

export interface FooterContent {
  credit: string;
  descriptor: string;
  cvLabel: string;
}

/** Canales de contacto públicos, verificados contra el CV. */
export interface ContactChannels {
  email: string;
  profiles: ExternalLink[];
}

export interface SiteConfig {
  /** Nombre/wordmark visible en la navegación. */
  name: string;
  /** Idioma del documento (atributo `lang`). */
  lang: string;
  /** Metadatos por defecto, usados cuando una ruta no define los suyos. */
  meta: RouteMeta;
  /** Enlaces principales de la navegación. */
  nav: NavItem[];
  /** CTA destacado de la navegación. */
  navCta: CtaLink;
  /**
   * Ruta pública del CV en PDF (servido desde `public/`).
   * `null` mientras no esté confirmado: los CTA del CV no se muestran.
   */
  cvHref: string | null;
  contact: ContactChannels;
}
