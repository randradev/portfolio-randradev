import type { CaseStudyContent } from "../types";

/**
 * Caso de estudio de Flux. Fuente editorial: FLUX-CASE-STUDY.md.
 * Evidencias y procedencia de los recursos: docs/flux/ASSETS.md.
 *
 * Los datos técnicos se verificaron contra `main` de randradev/flux-project
 * (d9fffab, 2026-10-19), que incluye el commit documentado f04004c.
 * Rol: redacción confirmada por el autor (2026-10-19).
 *
 * `‑` es un guion no separable: evita que nombres técnicos como
 * «SHA-256» se partan en dos líneas.
 */
export const flux: CaseStudyContent = {
  meta: {
    title: "Flux — Orquestación financiera conversacional",
    description:
      "Caso de estudio de Flux: un backend en FastAPI y LangGraph que coordina conversación, recuperación de conocimiento, estado y reglas financieras.",
  },

  hero: {
    backLink: { label: "Proyectos", to: "/#proyectos" },
    eyebrow: "BACKEND ENGINEERING · CONVERSATIONAL AI",
    title: { lead: "Flux", emphasis: "Orquestación financiera conversacional" },
    summary:
      "Una experiencia conversacional que coordina modelos de IA, recuperación de conocimiento y lógica financiera para guiar flujos de productos bancarios.",
    highlights: ["FastAPI", "LangGraph", "Python", "RAG"],
    primaryCta: { label: "Explorar la arquitectura", to: "#arquitectura" },
    // PENDIENTE (incremento c): enlazar el video de crédito cuando esté en la página.
    demoCta: null,
    facts: [
      {
        label: "Rol",
        value:
          "Proyecto de título desarrollado en dupla. Lideré el desarrollo del backend y la integración de IA, y contribuí también de forma importante al desarrollo frontend.",
      },
      { label: "Tipo", value: "Prototipo académico con productos financieros simulados" },
      { label: "Entorno", value: "Demostrado en ejecución local" },
      {
        label: "Repositorio",
        value: "randradev/flux-project",
        href: "https://github.com/randradev/flux-project",
      },
    ],
  },

  context: {
    id: "contexto",
    eyebrow: "CONTEXTO",
    title: "La conversación debía seguir reglas de negocio reales",
    description: [
      "El desafío consistía en coordinar una interacción conversacional con procesos financieros que requieren recopilar información, resolver dudas, validar condiciones y conducir al usuario por distintas etapas. La IA debía convivir con lógica determinista y controles explícitos, en lugar de sustituirlos.",
      "Flux simula tres productos: crédito de consumo, cuenta corriente y depósito a plazo. Este caso se centra en el crédito y el depósito a plazo.",
    ],
    points: [
      {
        title: "Interpretar",
        description:
          "El modelo interpreta cada mensaje y extrae datos estructurados con esquemas Pydantic.",
      },
      {
        title: "Decidir",
        description:
          "Las validaciones, los cálculos y las reglas de negocio viven en motores de Python deterministas.",
      },
      {
        title: "Conducir",
        description:
          "El grafo gobierna las transiciones entre etapas, los puntos de espera y las salidas alternativas.",
      },
    ],
  },

  architecture: {
    id: "arquitectura",
    eyebrow: "ARQUITECTURA",
    title: "Una conversación, múltiples responsabilidades",
    description: [
      "Cada capa tiene una responsabilidad acotada. El modelo de lenguaje interpreta y redacta; el grafo decide el siguiente paso y los motores calculan.",
    ],
    caption:
      "Arquitectura del proyecto, derivada del código de la rama main de flux-project (octubre de 2026).",
    layers: [
      {
        name: "Interfaz y API",
        description:
          "La interfaz en React envía cada mensaje a FastAPI, que valida la sesión con el JWT de Supabase y responde por streaming (Server-Sent Events).",
        modules: ["api/v1/chat.py", "api/deps.py", "FluxContext"],
      },
      {
        name: "Orquestación",
        description:
          "Un StateGraph de LangGraph con 34 nodos en tres flujos de producto. Un nodo de entrada decide por prioridades si reanudar, avanzar tras un paso completado o clasificar la intención.",
        modules: ["graph/workflow.py", "graph/edges.py"],
      },
      {
        name: "Estado",
        description:
          "FluxState organiza el estado por namespaces: sesión, datos recopilados, resultados de evaluación, ofertas, autenticación y resultado del flujo. Se guarda en cada turno junto con el nodo actual.",
        modules: ["graph/state.py", "conversations.state_snapshot"],
      },
      {
        name: "IA y conocimiento",
        description:
          "Gemini, en Vertex AI, extrae datos con salida estructurada y redacta las respuestas. Las dudas se responden con RAG sobre una base de conocimiento en pgvector.",
        modules: ["infra/gemini_client.py", "modules/consultant.py", "nodes/schemas/"],
        kind: "ai",
      },
      {
        name: "Motores financieros",
        description:
          "Elegibilidad, scoring, tasas, cuotas y rentabilidad se calculan en Python, sin delegarlos al modelo. Hay un motor por producto.",
        modules: ["credit_eng.py", "account_eng.py", "dap_eng.py"],
      },
      {
        name: "Formalización y servicios",
        description:
          "Validación OTP por correo, generación del contrato PDF con un hash SHA‑256 de sus datos y almacenamiento del documento.",
        modules: ["modules/security.py", "modules/pdf_factory.py", "infra/supabase.py"],
      },
    ],
    services: {
      title: "Servicios externos",
      items: [
        {
          title: "Supabase",
          description:
            "Autenticación, PostgreSQL, pgvector y Storage para los contratos.",
        },
        {
          title: "Vertex AI",
          description:
            "Gemini para extracción y generación; text‑embedding‑004 para el RAG.",
        },
        { title: "Resend", description: "Envío del código OTP por correo electrónico." },
      ],
    },
    turn: {
      title: "Un turno, de extremo a extremo",
      steps: [
        "El usuario envía un mensaje o elige un producto.",
        "La API valida el token y rehidrata el estado de la conversación.",
        "El grafo ejecuta uno o más nodos; un paso completado puede saltar al siguiente en el mismo turno.",
        "Cada nodo emite su mensaje y su transición de etapa por SSE.",
        "Se guardan el estado, el nodo actual y los mensajes para el turno siguiente.",
      ],
    },
  },
};
