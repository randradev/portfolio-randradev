import profilePhoto from "~/assets/ricardo-andrade.webp";

import type {
  AboutContent,
  ApproachContent,
  ContactContent,
  ExperienceContent,
  FooterContent,
  HeroContent,
  ProjectsContent,
  SectionIntro,
} from "./types";

/**
 * Textos de la página principal. Fuente canónica: docs/COPY-HOME-FINAL.md.
 * Se conservan literalmente; cambiarlos requiere autorización del usuario.
 */

export const hero: HeroContent = {
  eyebrow: "FULL STACK DEVELOPMENT · PYTHON · APPLIED AI",
  title: {
    lead: "Construyo software.",
    emphasis: "Integro inteligencia.",
  },
  summary:
    "Desarrollador Full Stack con foco en Python e inteligencia artificial aplicada.",
  primaryCta: { label: "Ver proyectos", to: "/#proyectos" },
  secondaryCta: { label: "Ver trayectoria", to: "/#trayectoria" },
  note: "Ricardo Andrade · Software Developer",
};

export const projectsIntro: ProjectsContent = {
  id: "proyectos",
  eyebrow: "PROYECTOS SELECCIONADOS",
  title: "Analizar. Diseñar. Construir.",
  description: ["Automatización, aplicaciones web e inteligencia artificial aplicada."],
  cardCtaLabel: "Ver proyecto",
  // Oculto hasta que exista una página o destino acordado ("Ver todos los proyectos").
  allProjectsLink: null,
};

/**
 * Las tecnologías de cada área salen del CV (Competencias técnicas, experiencia)
 * y de los repositorios de LicitAI y Flux.
 */
export const approach: ApproachContent = {
  id: "enfoque",
  eyebrow: "CAPACIDADES",
  title: "Pensar, diseñar y construir software.",
  areas: [
    {
      icon: "interfaces",
      title: "Interfaces",
      description: "Interfaces web claras, funcionales y adaptables.",
      technologies: ["JavaScript", "TypeScript", "React", "HTML5", "CSS3"],
    },
    {
      icon: "systems",
      title: "Sistemas",
      description: "APIs, lógica de negocio e integración de datos.",
      technologies: [
        "Python",
        "Node.js",
        "Express",
        "FastAPI",
        "Django",
        "PostgreSQL",
        "MongoDB",
        "SQLite",
      ],
    },
    {
      icon: "ai",
      title: "IA aplicada",
      description: "Modelos y flujos inteligentes integrados en aplicaciones.",
      technologies: ["Gemini API", "LangGraph", "RAG"],
    },
  ],
};

export const experienceIntro: ExperienceContent = {
  id: "trayectoria",
  eyebrow: "EXPERIENCIA",
  title: "Experiencia profesional más allá del código.",
  description: [
    "Experiencia en desarrollo de software, animación, producción y coordinación de proyectos.",
  ],
  cvCtaLabel: "Ver CV",
};

export const about: AboutContent = {
  id: "sobre-mi",
  eyebrow: "PERFIL",
  title: "Full Stack. Python. IA aplicada.",
  description: [
    "Desarrollo software de extremo a extremo, desde la interfaz hasta la lógica de negocio. Me interesa Python y la integración de inteligencia artificial en aplicaciones que resuelven problemas concretos.",
    "Mi experiencia en producción y coordinación también aporta a mi forma de trabajar: entender el objetivo, organizar el proceso y cuidar la ejecución.",
  ],
  cta: { label: "Ver trayectoria", to: "/#trayectoria" },
  // Texto alternativo: necesario para accesibilidad, no forma parte del copy.
  photo: { src: profilePhoto, alt: "Retrato de perfil de Ricardo Andrade" },
};

export const educationIntro: SectionIntro = {
  id: "formacion",
  eyebrow: "FORMACIÓN",
  title: "Formación técnica.",
};

export const contact: ContactContent = {
  id: "contacto",
  eyebrow: "CONTACTO",
  title: "Hablemos de software.",
  description: [
    "Aporto desarrollo Full Stack e integración de inteligencia artificial a equipos que construyen productos y procesos reales.",
  ],
  primaryCtaLabel: "Contactarme",
  cvCtaLabel: "Descargar CV",
};

export const footer: FooterContent = {
  credit: "Diseñado y desarrollado por Ricardo Andrade.",
  descriptor: "Full Stack Developer · Python · AI",
  cvLabel: "CV",
};
