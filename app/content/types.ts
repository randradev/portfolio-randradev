/**
 * Tipos del contenido del sitio. El contenido vive en `app/content/` y los
 * componentes solo lo consumen. Los tipos de proyectos, experiencia y
 * tecnologías se añadirán en las fases 3 y 4, con datos verificados.
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

/** Contenido del hero de la página principal. */
export interface HeroContent {
  /** El título se compone como `lead` + `emphasis`; `emphasis` se resalta. */
  title: { lead: string; emphasis: string };
  summary: string;
  primaryCta: CtaLink;
  /** CTA secundario cuando no hay CV disponible (`site.cvHref` es `null`). */
  contactCta: CtaLink;
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
  /**
   * Ruta pública del CV en PDF (servido desde `public/`).
   * `null` mientras el archivo no esté en el repositorio: el CTA no se muestra.
   */
  cvHref: string | null;
  /** Texto de los CTA que abren el CV. */
  cvLabel: string;
}
