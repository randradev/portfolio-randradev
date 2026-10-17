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
 * Textos de la página principal. Fuente canónica: docs/COPY-HOME.md.
 * Se conservan literalmente; cambiarlos requiere autorización del usuario.
 */

export const hero: HeroContent = {
  eyebrow: "DESARROLLO FULL STACK · INTELIGENCIA ARTIFICIAL",
  title: {
    lead: "Construyo productos digitales donde la ingeniería se encuentra con",
    emphasis: "la inteligencia artificial.",
  },
  summary:
    "Soy Ricardo Andrade, desarrollador Full Stack. Diseño e implemento experiencias web y sistemas que conectan interfaces, lógica de negocio y servicios inteligentes, con foco en resolver problemas reales y construir soluciones mantenibles.",
  primaryCta: { label: "Explorar proyectos", to: "/#proyectos" },
  secondaryCta: { label: "Conocer mi trayectoria", to: "/#trayectoria" },
  note: "Abierto a oportunidades laborales en desarrollo de software y soluciones con IA.",
};

export const projectsIntro: ProjectsContent = {
  id: "proyectos",
  eyebrow: "TRABAJO SELECCIONADO",
  title: "Ideas que toman forma en sistemas reales.",
  description: [
    "Una selección de proyectos en los que exploro cómo convertir necesidades concretas en productos funcionales: desde la automatización y el análisis de información hasta las experiencias web potenciadas por inteligencia artificial.",
  ],
  cardCtaLabel: "Explorar caso de estudio",
  // Oculto hasta que exista una página o destino acordado ("Ver todos los proyectos").
  allProjectsLink: null,
};

/**
 * Las tecnologías de cada área salen del CV (Competencias técnicas, experiencia)
 * y de los repositorios de LicitAI y Flux.
 */
export const approach: ApproachContent = {
  id: "enfoque",
  eyebrow: "CÓMO TRABAJO",
  title: "De la interfaz a la lógica que la hace funcionar.",
  description: [
    "Me interesa comprender el sistema completo: cómo una persona interactúa con un producto, cómo se procesa la información detrás de esa experiencia y cómo integrar herramientas de IA cuando aportan valor real.",
  ],
  areas: [
    {
      area: "Frontend",
      title: "Interfaces con intención",
      description:
        "Construyo interfaces web cuidando la estructura, la claridad de uso, la consistencia visual y la adaptación a distintos dispositivos.",
      technologies: ["JavaScript", "TypeScript", "React", "HTML5", "CSS3"],
    },
    {
      area: "Backend e integración",
      title: "Sistemas conectados",
      description:
        "Trabajo con lógica de aplicación, APIs y persistencia de datos para conectar la experiencia de usuario con servicios y procesos de negocio.",
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
      area: "Inteligencia artificial",
      title: "IA aplicada a problemas concretos",
      description:
        "Exploro cómo integrar modelos y flujos de IA en aplicaciones, con atención al contexto, la utilidad de las respuestas y los límites de cada solución.",
      technologies: ["Gemini API", "LangGraph", "RAG"],
    },
  ],
};

export const experienceIntro: ExperienceContent = {
  id: "trayectoria",
  eyebrow: "TRAYECTORIA",
  title: "Una perspectiva que combina tecnología, producción y coordinación.",
  description: [
    "Mi recorrido combina formación en programación con experiencia en entornos de producción y coordinación. Esa perspectiva influye en cómo abordo el desarrollo: entender el objetivo, organizar el trabajo y cuidar tanto la ejecución como el resultado.",
  ],
  cvCtaLabel: "Ver CV completo",
};

export const about: AboutContent = {
  id: "sobre-mi",
  eyebrow: "SOBRE MÍ",
  title: "Me interesa entender el problema, no solo escribir el código.",
  description: [
    "Soy desarrollador Full Stack con interés en construir productos digitales útiles, bien estructurados y cuidados en su experiencia de uso. Me gusta conectar las distintas capas de una aplicación y explorar dónde la inteligencia artificial puede mejorar un flujo de trabajo o hacer más accesible la información.",
    "Mi experiencia previa en producción y coordinación también forma parte de mi manera de trabajar: tener presente el objetivo, comunicar con claridad y avanzar de forma organizada.",
    "Busco incorporarme a un equipo donde pueda aportar, seguir desarrollándome como ingeniero de software y participar en la construcción de soluciones con impacto tangible.",
  ],
  cta: { label: "Hablemos de una oportunidad", to: "/#contacto" },
};

export const educationIntro: SectionIntro = {
  id: "formacion",
  eyebrow: "FORMACIÓN",
  title: "Una base técnica en evolución constante.",
};

export const contact: ContactContent = {
  id: "contacto",
  eyebrow: "SIGUIENTE PASO",
  title: "¿Construimos algo que valga la pena?",
  description: [
    "Estoy buscando una oportunidad laboral en la que pueda aportar desde el desarrollo Full Stack y seguir explorando aplicaciones prácticas de la inteligencia artificial. Si mi perfil encaja con lo que tu equipo necesita, me gustaría conversar.",
  ],
  primaryCtaLabel: "Contactarme",
  cvCtaLabel: "Ver CV",
  note: "Disponible para conversar sobre oportunidades profesionales, proyectos de software e IA aplicada.",
};

export const footer: FooterContent = {
  credit: "Diseñado y desarrollado por Ricardo Andrade.",
  descriptor: "Full Stack Developer · AI",
  cvLabel: "CV",
};
