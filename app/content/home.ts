import type { HeroContent } from "./types";

/**
 * PROVISIONAL: textos derivados del posicionamiento de SPEC.md (Full Stack como
 * base, IA aplicada como diferenciador). PENDIENTE: confirmar los textos
 * definitivos de presentación (SPEC §13) antes de publicar.
 */
export const hero: HeroContent = {
  title: { lead: "Construyo software.", emphasis: "Integro inteligencia." },
  summary:
    "Desarrollador Full Stack con foco en Python e inteligencia artificial aplicada.",
  // Las secciones de destino se construyen en la Fase 3.
  primaryCta: { label: "Explorar proyectos", to: "/#proyectos" },
  contactCta: { label: "Contacto", to: "/#contacto" },
};
