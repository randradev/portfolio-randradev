import type { SiteConfig } from "./types";

export const site: SiteConfig = {
  name: "Ricardo Andrade",
  lang: "es",
  meta: {
    title: "Ricardo Andrade",
    // PENDIENTE: descripción definitiva (textos de presentación sin confirmar).
    description: "Portafolio de Ricardo Andrade.",
  },
  // Las secciones de destino se construyen en la Fase 3.
  nav: [
    { label: "Proyectos", to: "/#proyectos" },
    { label: "Sobre mí", to: "/#sobre-mi" },
    { label: "Experiencia", to: "/#experiencia" },
    { label: "Contacto", to: "/#contacto" },
  ],
  // PENDIENTE: activar cuando el PDF esté en public/cv/ (p. ej. "/cv/ricardo-andrade-cv.pdf").
  cvHref: null,
  cvLabel: "Ver CV",
};
