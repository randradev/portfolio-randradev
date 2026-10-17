import type { SiteConfig } from "./types";

/** Textos de navegación y metadatos: docs/COPY-HOME-FINAL.md §1 y §12. */
export const site: SiteConfig = {
  name: "Ricardo Andrade",
  lang: "es",
  meta: {
    title: "Ricardo Andrade — Desarrollador Full Stack | Python e IA",
    description:
      "Portafolio de Ricardo Andrade, desarrollador Full Stack con foco en Python e inteligencia artificial aplicada.",
  },
  nav: [
    { label: "Inicio", to: "/#inicio" },
    { label: "Proyectos", to: "/#proyectos" },
    { label: "Trayectoria", to: "/#trayectoria" },
    { label: "Sobre mí", to: "/#sobre-mi" },
    { label: "Contacto", to: "/#contacto" },
  ],
  navCta: { label: "Ver proyectos", to: "/#proyectos" },
  // Activado por decisión del usuario con el PDF actual (incluye el teléfono).
  cvHref: "/cv/ricardo-andrade-cv.pdf",
  // Datos del CV. GitHub verificado (HTTP 200). PENDIENTE: confirmar la URL de
  // LinkedIn a mano; LinkedIn bloquea las comprobaciones automáticas.
  contact: {
    email: "randradev.dev@gmail.com",
    profiles: [
      { label: "GitHub", href: "https://github.com/randradev" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ricardo-andrade-valderrama/",
      },
    ],
  },
};
