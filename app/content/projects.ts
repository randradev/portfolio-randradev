import type { Project } from "./types";

/**
 * Proyectos destacados: docs/COPY-HOME.md §4–§5.
 * Stacks verificados: LicitAI en `requirements.txt` y `core/database_mgr.py` del
 * repositorio; Flux en el CV y la estructura del repositorio.
 * PENDIENTE (Fase 4): rol real en cada proyecto, capturas y casos de estudio.
 */
export const projects: Project[] = [
  {
    slug: "licitai",
    name: "LicitAI",
    category: "AUTOMATIZACIÓN · ANÁLISIS DE INFORMACIÓN",
    summary:
      "Una herramienta orientada a simplificar la exploración de licitaciones: recopila información, ayuda a estructurarla y utiliza inteligencia artificial para apoyar su análisis y clasificación.",
    tagline: "De la búsqueda de información a una lectura más estructurada.",
    stack: ["Python", "Selenium", "Gemini API", "SQLite", "Streamlit"],
    caseStudyTo: null,
  },
  {
    slug: "flux",
    name: "Flux",
    category: "FULL STACK · IA CONVERSACIONAL",
    summary:
      "Una exploración de producto que combina una interfaz web con servicios backend y flujos conversacionales para organizar interacciones relacionadas con información financiera.",
    tagline: "Una experiencia conversacional respaldada por una arquitectura modular.",
    stack: ["React", "FastAPI", "LangGraph", "Supabase", "RAG"],
    caseStudyTo: null,
  },
];
