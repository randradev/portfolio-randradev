import type { Project } from "./types";

/**
 * Proyectos destacados: docs/COPY-HOME-FINAL.md §4–§5.
 * Stacks verificados: LicitAI en `requirements.txt` y `core/database_mgr.py` del
 * repositorio; Flux en el CV y la estructura del repositorio.
 * PENDIENTE (Fase 4): rol real en cada proyecto, capturas y casos de estudio.
 */
export const projects: Project[] = [
  {
    slug: "licitai",
    name: "LicitAI",
    category: "PYTHON · AUTOMATIZACIÓN · IA",
    summary:
      "Analiza licitaciones con IA para identificar riesgos y priorizar oportunidades según el perfil de la empresa.",
    stack: ["Python", "Selenium", "Gemini API", "SQLite", "Streamlit"],
    caseStudyTo: null,
  },
  {
    slug: "flux",
    name: "Flux",
    category: "FULL STACK · IA CONVERSACIONAL",
    summary:
      "Orquesta un flujo conversacional para simular la contratación de productos financieros, con validación OTP y generación de contratos PDF.",
    stack: ["React", "FastAPI", "LangGraph", "Supabase", "RAG"],
    caseStudyTo: null,
  },
];
