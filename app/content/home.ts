import type { HeroContent } from "./types";

/**
 * PROVISIONAL: textos derivados del posicionamiento de SPEC.md (Full Stack como
 * base, IA aplicada como diferenciador). PENDIENTE: confirmar los textos
 * definitivos de presentación (SPEC §13) antes de publicar.
 */
export const hero: HeroContent = {
  title: { lead: "Desarrollador Full Stack", emphasis: "con IA aplicada" },
  summary:
    "Construyo aplicaciones web completas, del frontend a la integración de sistemas, y uso IA cuando resuelve un problema concreto.",
  // Las secciones de destino se construyen en la Fase 3.
  primaryCta: { label: "Ver proyectos", to: "/#proyectos" },
  contactCta: { label: "Contacto", to: "/#contacto" },
};
