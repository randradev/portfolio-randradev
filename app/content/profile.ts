import type { EducationItem, ExperienceItem } from "./types";

/**
 * Trayectoria: textos, organización y cargos de docs/COPY-HOME-FINAL.md §7.
 * Periodo de Mauricio Minck confirmado por el usuario (el CV del repo está
 * desactualizado en ese punto). Planetario: periodo vigente del CV.
 */
export const experience: ExperienceItem[] = [
  {
    organization: "Constructora Mauricio Minck & Cía. Ltda.",
    role: "Desarrollador de Software Junior / Practicante",
    period: "Marzo – mayo de 2026",
    description:
      "Diseño y desarrollo de módulos de ERP. Prototipado de asistente conversacional integrado en la plataforma.",
  },
  {
    organization: "Planetario Chile",
    role: "Animador Digital / Optimización de Flujos de Producción",
    period: "Mayo de 2024 – actualidad",
    current: true,
    description:
      "Gestión de flujos complejos. Optimización de procesos. Decisiones basadas en datos.",
  },
  {
    organization: "Púrpura Digital",
    role: "Productor Digital / Coordinación de Proyectos",
    period: "Agosto de 2018 – mayo de 2023",
    description:
      "Gestión de proyectos digitales. Coordinación con clientes. Optimización de flujos de trabajo.",
  },
];

/** Formación: docs/COPY-HOME-FINAL.md §9, confirmada por el usuario. Sin promedio. */
export const education: EducationItem[] = [
  {
    kind: "degree",
    title: "Técnico Universitario en Programación Computacional",
    institution: "Universidad Mayor",
    period: "2024–2026",
  },
  {
    kind: "course",
    title: "Fundamentos de Inteligencia Artificial para la Industria",
    institution: "Universidad de Santiago de Chile",
    period: "2026",
  },
  {
    kind: "course",
    title: "Bootcamp Full Stack JavaScript",
    institution: "Generation Chile",
    period: "2023",
  },
];
