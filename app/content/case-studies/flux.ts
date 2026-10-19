import creditCaeUi from "~/assets/projects/flux/credit-cae-ui.webp";
import creditFlowPoster from "~/assets/projects/flux/credit-flow-poster.webp";
import dapFlowPoster from "~/assets/projects/flux/dap-flow-poster.webp";
import ragAccountConsole from "~/assets/projects/flux/rag-account-console.webp";
import ragAccountPoster from "~/assets/projects/flux/rag-account-poster.webp";
import ragCaeConsole from "~/assets/projects/flux/rag-cae-console.webp";

import type { CaseStudyContent } from "../types";

/** Videos optimizados, servidos desde `public/` (docs/flux/ASSETS.md). */
const VIDEOS = "/media/projects/flux/videos";

/**
 * Caso de estudio de Flux. Fuente editorial: FLUX-CASE-STUDY.md.
 * Evidencias y procedencia de los recursos: docs/flux/ASSETS.md.
 *
 * Los datos técnicos se verificaron contra `main` de randradev/flux-project
 * (d9fffab, 2026-10-19), que incluye el commit documentado f04004c.
 * Rol: redacción confirmada por el autor (2026-10-19).
 *
 * Los nombres técnicos con guion («SHA‑256») usan el guion no separable
 * U+2011 para no partirse en dos líneas.
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
    demoCta: { label: "Ver demostración", to: "#credito-demo" },
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

  // Evidencia CAE: grabación del 2026-05-04 (script de simulación del backend) y
  // captura de la interfaz del 2026-10-17. En ambas, la pregunta se hizo con la
  // oferta en pantalla (nodo LOAN_PRE_APPROVED), no durante la recolección.
  rag: {
    id: "rag",
    eyebrow: "RAG EN ACCIÓN",
    title: "Una pregunta no debía romper el flujo",
    description: [
      "Con la oferta de crédito en pantalla, el usuario preguntó: «¿Qué es el CAE?». En la ejecución registrada, el backend clasificó el mensaje como pregunta, recuperó cinco fragmentos del producto LOAN y respondió con el valor calculado por el motor. La oferta siguió vigente y el usuario la aceptó en el turno siguiente.",
    ],
    steps: [
      {
        title: "Una duda dentro del trámite",
        description: "El usuario pregunta mientras revisa la oferta pre-aprobada.",
      },
      {
        title: "Clasificación",
        description:
          "La extracción estructurada del nodo marca el mensaje como PREGUNTA, no como una decisión sobre la oferta.",
      },
      {
        title: "Recuperación",
        description:
          "La pregunta se convierte en embedding y una función de pgvector devuelve hasta cinco fragmentos, filtrados por el producto activo.",
      },
      {
        title: "Respuesta con contexto",
        description:
          "Gemini responde con esos fragmentos y un resumen de la sesión que incluye los resultados del motor; por eso cita el CAE de la oferta.",
      },
      {
        title: "Vuelta al flujo",
        description:
          "El nodo no avanza: la oferta se mantiene y el siguiente mensaje vuelve a interpretarse como decisión.",
      },
    ],
    evidence: [
      {
        type: "image",
        kind: "log",
        date: "4 may 2026",
        src: ragCaeConsole,
        width: 1084,
        height: 280,
        alt: "Consola del backend en el turno 4: el usuario pregunta «¿Qué es el CAE?», se detecta la decisión PREGUNTA, se encuentran 5 fragmentos para el producto LOAN con una similitud máxima de 0,48 y Flux responde explicando que el CAE de su crédito es 26,82 %.",
        caption:
          "Consola del script de simulación del backend. Registra la clasificación, la recuperación y la respuesta del turno.",
      },
      {
        type: "image",
        kind: "capture",
        date: "17 oct 2026",
        src: creditCaeUi,
        width: 1440,
        height: 688,
        alt: "Interfaz de Flux: tras recibir la oferta de 2.000.000 CLP a 12 cuotas, el usuario pregunta «¿Qué es el CAE?» y el asistente explica que el motor calculó un CAE de 26,82 %.",
        caption: "La misma pregunta en la interfaz, en otra ejecución. Datos de prueba.",
      },
    ],
    notes: {
      title: "Cómo leer esta evidencia",
      items: [
        "Cinco fragmentos es el máximo configurado (top_k = 5), no una medida de calidad.",
        "La similitud (0,48) es una similitud coseno entre embeddings, no un porcentaje de acierto.",
        "Si no hay fragmentos, si la generación falla o si el modelo indica que no tiene la información, el consultor devuelve una respuesta de respaldo.",
      ],
    },
    secondary: {
      title: "El mismo mecanismo en Cuenta Corriente",
      description:
        "Durante la recolección de datos de una cuenta corriente, dos preguntas se responden sin abandonar el paso. La consola registra cinco fragmentos del producto ACCOUNT en cada una.",
      evidence: [
        {
          type: "video",
          kind: "recording",
          date: "17 oct 2026",
          src: `${VIDEOS}/rag-account.mp4`,
          poster: ragAccountPoster,
          width: 1440,
          height: 688,
          duration: "1:01",
          title: "Preguntas durante la apertura de una cuenta corriente",
          caption:
            "El usuario pregunta qué tipos de cuenta existen y si influye tener título universitario; el asistente responde y vuelve a pedir la renta. Sin audio. Datos de prueba.",
        },
        {
          type: "image",
          kind: "log",
          date: "17 oct 2026",
          src: ragAccountConsole,
          width: 570,
          height: 386,
          alt: "Consola del backend: dos preguntas sobre cuentas corrientes; en ambas se encuentran 5 fragmentos para el producto ACCOUNT, con similitudes máximas de 0,66 y 0,53.",
          caption: "Registro del backend para las dos preguntas.",
        },
      ],
    },
  },

  credit: {
    id: "credito",
    eyebrow: "CRÉDITO DE CONSUMO",
    title: "Un flujo financiero con rutas explícitas",
    description: [
      "Once nodos conducen la solicitud desde el perfil hasta el contrato. Cada salida alternativa termina en un nodo propio, de modo que un rechazo, un cierre voluntario o un bloqueo quedan registrados como resultados distintos.",
    ],
    stages: [
      {
        name: "Perfil",
        node: "loan_collecting_profile",
        description: "Renta líquida, antigüedad laboral y nivel de estudios.",
      },
      {
        name: "Simulación",
        node: "loan_collecting_simulation",
        description: "Monto solicitado y número de cuotas.",
      },
      {
        name: "Motor de riesgo",
        node: "loan_risk_engine",
        description: "Elegibilidad, scoring, tasa, cuota y CAE.",
        automatic: true,
      },
      {
        name: "Oferta",
        node: "loan_pre_approved",
        description: "Tarjeta de transparencia: aceptar, rechazar o preguntar.",
      },
      {
        name: "OTP",
        node: "loan_otp_validation",
        description: "Código de 6 dígitos por correo; hasta 3 intentos.",
      },
      {
        name: "Formalización",
        node: "loan_formalization",
        description: "Contrato PDF con hash SHA‑256, guardado en Storage.",
        automatic: true,
      },
      {
        name: "Completado",
        node: "loan_completed",
        description: "Enlace de descarga y hash del contrato.",
        automatic: true,
      },
    ],
    legend: {
      conversational: "Espera la respuesta del usuario",
      automatic: "Se ejecuta en el mismo turno",
    },
    exits: {
      title: "Salidas alternativas",
      items: [
        {
          name: "Rechazo de política",
          trigger:
            "Falla una regla de elegibilidad o la cuota supera el 30 % de la renta.",
          node: "loan_rejected_policy",
        },
        {
          name: "Cierre por el usuario",
          trigger: "El usuario rechaza la oferta.",
          node: "loan_closed_by_user",
        },
        {
          name: "Bloqueo de seguridad",
          trigger: "Tres códigos OTP incorrectos; el usuario queda bloqueado.",
          node: "loan_security_block",
        },
        {
          name: "Fallo de formalización",
          trigger:
            "Si el contrato no se genera o no se sube, el flujo se detiene con el estado GENERATION_FAILED.",
        },
      ],
    },
    engine: {
      title: "Reglas del motor",
      module: "modules/credit_eng.py",
      rules: [
        {
          label: "Elegibilidad",
          value:
            "18 años o más · renta desde $500.000 · 6 meses de antigüedad · 6 a 48 cuotas · $100.000 a $30.000.000",
        },
        {
          label: "Scoring",
          value: "0 a 100 puntos por estudios, antigüedad, edad y tramo de renta",
        },
        {
          label: "Riesgo y tasa",
          value:
            "Más de 80: bajo, 1,2 % · 50 a 80: medio, 2,0 % · menos de 50: alto, 3,5 % mensual",
        },
        { label: "Cuota", value: "Amortización francesa" },
        {
          label: "Capacidad de pago",
          value: "Cuota de hasta el 30 % de la renta líquida",
        },
        { label: "Costo", value: "Costo total, intereses y CAE = (1 + i)¹² − 1" },
      ],
      note: "Reglas de un prototipo académico, no un modelo de riesgo bancario validado.",
    },
    demo: {
      id: "credito-demo",
      type: "video",
      kind: "recording",
      date: "17 oct 2026",
      src: `${VIDEOS}/credit-flow.mp4`,
      poster: creditFlowPoster,
      width: 1440,
      height: 688,
      duration: "1:14",
      title: "Flujo completo de crédito de consumo",
      caption:
        "Perfil, simulación, oferta de 2.000.000 CLP a 12 cuotas (2,00 % mensual, CAE 26,82 %), aceptación, OTP y contrato PDF. Cuando el asistente dice «aprobado», se refiere a la pre-aprobación simulada por el motor. Sin audio. Datos de prueba.",
    },
  },

  deposit: {
    id: "deposito",
    eyebrow: "DEPÓSITO A PLAZO",
    title: "Reglas específicas para un segundo producto financiero",
    description: [
      "El depósito a plazo reutiliza el patrón del grafo —recolección, motor, oferta, OTP y formalización— con diez nodos propios y un motor de inversión independiente.",
    ],
    stages: [
      {
        name: "Datos",
        node: "dap_collect_data",
        description:
          "Monto, moneda (CLP, UF o USD) y plazo; «10 meses» se normaliza a 300 días.",
      },
      {
        name: "Motor de inversión",
        node: "dap_investment_engine",
        description: "Validaciones, tasa del período y retorno.",
        automatic: true,
      },
      {
        name: "Oferta",
        node: "dap_pre_approved",
        description: "Tarjeta de transparencia: aceptar, rechazar o preguntar.",
      },
      {
        name: "OTP",
        node: "dap_otp_validation",
        description: "Código de 6 dígitos por correo; hasta 3 intentos.",
      },
      {
        name: "Formalización",
        node: "dap_formalization",
        description: "Contrato PDF con hash SHA‑256, guardado en Storage.",
        automatic: true,
      },
      {
        name: "Completado",
        node: "dap_completed",
        description: "Enlace de descarga y hash del contrato.",
        automatic: true,
      },
    ],
    legend: {
      conversational: "Espera la respuesta del usuario",
      automatic: "Se ejecuta en el mismo turno",
    },
    exits: {
      title: "Salidas alternativas",
      items: [
        {
          name: "Rechazo de política",
          trigger:
            "Menor de edad, monto equivalente fuera de $50.000 a $50.000.000 o plazo fuera de 7 a 360 días.",
          node: "dap_rejected_policy",
        },
        {
          name: "Cierre por el usuario",
          trigger: "El usuario rechaza la oferta.",
          node: "dap_closed_by_user",
        },
        {
          name: "Bloqueo de seguridad",
          trigger: "Tres códigos OTP incorrectos; el usuario queda bloqueado.",
          node: "dap_security_block",
        },
      ],
    },
    engine: {
      title: "Reglas del motor",
      module: "modules/dap_eng.py",
      rules: [
        {
          label: "Conversión",
          value:
            "UF y USD se convierten a CLP solo para validar el rango, con valores referenciales fijos",
        },
        { label: "Tasa base", value: "0,2 % mensual" },
        { label: "Premio por plazo", value: "0,05 % por cada 30 días completos" },
        { label: "IPC", value: "0,3 % mensual adicional, solo en CLP" },
        { label: "Tasa del período", value: "Tasa mensual × días / 30" },
        { label: "Retorno", value: "Ganancia y total en la moneda original" },
      ],
      note: "En el video: 500 USD a 300 días → 0,2 % + 0,5 % = 0,7 % mensual, 7 % en el período y 35 USD de ganancia.",
    },
    demo: {
      id: "deposito-demo",
      type: "video",
      kind: "recording",
      date: "17 oct 2026",
      src: `${VIDEOS}/dap-flow.mp4`,
      poster: dapFlowPoster,
      width: 1440,
      height: 688,
      duration: "1:03",
      title: "Flujo completo de depósito a plazo",
      caption:
        "Datos, oferta de 500 USD a 300 días (tasa del período 7 %, ganancia estimada 35 USD), aceptación, OTP y contrato PDF. Un consejo de la interfaz habla de «encriptación SHA‑256»: es impreciso, porque SHA‑256 es una función hash, no un cifrado. Sin audio. Datos de prueba.",
    },
  },
};
