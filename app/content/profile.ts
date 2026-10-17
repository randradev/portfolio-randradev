import type { EducationItem, ExperienceItem } from "./types";

/**
 * Trayectoria: textos de docs/COPY-HOME.md §7. Organización y cargo según el CV.
 * Periodo de Mauricio Minck confirmado por el usuario (el CV del repo está
 * desactualizado en ese punto). Planetario: periodo vigente del CV.
 */
export const experience: ExperienceItem[] = [
  {
    organization: "Empresa Constructora Mauricio Minck y Cía. Ltda.",
    role: "Desarrollador de Software Junior / Practicante",
    period: "Marzo – mayo de 2026",
    description:
      "Participé en trabajo relacionado con un ERP y en un prototipo conversacional con React e integración de Gemini, además de tareas de persistencia local y colaboración mediante Git.",
  },
  {
    organization: "Planetario Chile",
    role: "Animador Digital / Optimización de Flujos de Producción",
    period: "Mayo de 2024 – actualidad",
    description:
      "Experiencia en animación y producción, aportando una perspectiva práctica sobre la comunicación de ideas y la ejecución de experiencias para audiencias.",
  },
  {
    organization: "Púrpura Digital",
    role: "Productor Digital / Coordinación de Proyectos",
    period: "Agosto de 2018 – mayo de 2023",
    description:
      "Experiencia en producción y coordinación de proyectos, con foco en organizar tareas, articular necesidades y acompañar la ejecución.",
  },
];

/** Formación: docs/COPY-HOME.md §9, confirmada por el usuario. Sin promedio. */
export const education: EducationItem[] = [
  {
    title: "Técnico Universitario en Programación Computacional",
    institution: "Universidad Mayor",
    period: "2024–2026",
  },
  {
    title: "AI Fundamentals for Industry",
    institution: "Universidad de Santiago de Chile",
    period: "2026",
  },
  {
    title: "Bootcamp Full Stack JavaScript",
    institution: "Generation Chile",
    period: "2023",
  },
];
