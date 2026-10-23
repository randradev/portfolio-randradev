import fluxCover from "~/assets/projects/flux-cover.webp";
import licitaiCover from "~/assets/projects/licitai-cover.webp";

import type { Project } from "./types";

/**
 * Proyectos destacados: docs/COPY-HOME-FINAL.md §4–§5.
 * Stacks verificados: LicitAI en `requirements.txt` y `core/database_mgr.py` del
 * repositorio; Flux en el CV y la estructura del repositorio.
 * Portadas: capturas reales de cada aplicación, recortadas a 16:9 sin la
 * interfaz del navegador.
 * Casos de estudio en /proyectos/flux y /proyectos/licitai (rol en
 * app/content/case-studies/).
 */
export const projects: Project[] = [
  {
    slug: "licitai",
    name: "LicitAI",
    category: "PYTHON · AUTOMATIZACIÓN · IA",
    summary:
      "Analiza licitaciones con IA para identificar riesgos y priorizar oportunidades según el perfil de la empresa.",
    stack: ["Python", "Selenium", "Gemini API", "SQLite", "Streamlit"],
    caseStudyTo: "/proyectos/licitai",
    cover: {
      src: licitaiCover,
      alt: "Página Oportunidades de LicitAI: indicadores de oportunidades activas, cierres de la semana, score promedio y licitaciones en proceso, filtros de búsqueda y tarjetas de licitaciones con su score, días al cierre, región y reclamos de pago.",
    },
  },
  {
    slug: "flux",
    name: "Flux",
    category: "FULL STACK · IA CONVERSACIONAL",
    summary:
      "Orquesta un flujo conversacional para simular la contratación de productos financieros, con validación OTP y generación de contratos PDF.",
    stack: ["React", "FastAPI", "LangGraph", "Supabase", "RAG"],
    caseStudyTo: "/proyectos/flux",
    cover: {
      src: fluxCover,
      alt: "Interfaz de Flux: etapas del proceso, conversación con el asistente y tarjeta con la oferta de crédito pre aprobada.",
    },
  },
];
