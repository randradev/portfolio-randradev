import creditCaeUi from "~/assets/projects/flux/credit-cae-ui.webp";
import creditFlowPoster from "~/assets/projects/flux/credit-flow-poster.webp";
import dapFlowPoster from "~/assets/projects/flux/dap-flow-poster.webp";
import ragAccountConsole from "~/assets/projects/flux/rag-account-console.webp";
import ragAccountPoster from "~/assets/projects/flux/rag-account-poster.webp";
import contractDap from "~/assets/projects/flux/contract-dap.webp";
import ragCaeConsole from "~/assets/projects/flux/rag-cae-console.webp";

import type { CaseStudyContent } from "../types";

/** Videos optimizados, servidos desde `public/` (docs/flux/ASSETS.md). */
const VIDEOS = "/media/projects/flux/videos";

/** Repositorio público, verificado (HTTP 200) el 2026-10-19. */
const REPOSITORY_URL = "https://github.com/randradev/flux-project";

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
        href: REPOSITORY_URL,
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

  security: {
    id: "seguridad",
    eyebrow: "SEGURIDAD Y DOCUMENTOS",
    title: "La conversación también debe cerrar correctamente",
    description: [
      "Aceptar una oferta no basta para formalizarla. El flujo exige un código de un solo uso y genera un contrato con un sello de integridad de sus datos.",
    ],
    blocks: [
      {
        title: "Validación OTP",
        items: [
          "Al aceptar la oferta se genera un código de 6 dígitos y se envía por correo con Resend. Sin una clave configurada, el código se muestra en la consola como modo de prueba.",
          "El nodo compara el código ingresado y cuenta los intentos fallidos. Una pregunta durante la espera se responde con el consultor RAG sin consumir un intento.",
          "Al tercer fallo, el flujo termina en el nodo de bloqueo y el usuario queda marcado como BLOCKED_SECURITY: la API rechaza sus siguientes solicitudes con un 403.",
        ],
      },
      {
        title: "Contrato PDF",
        items: [
          "ReportLab genera un contrato por producto con las condiciones aceptadas.",
          "Se calcula un hash SHA‑256 de los datos del contrato (un JSON con las claves ordenadas) y se imprime en el documento.",
          "El PDF se sube al bucket contracts de Supabase Storage y su enlace se entrega al cerrar el flujo.",
        ],
      },
    ],
    evidence: {
      type: "image",
      kind: "capture",
      date: "17 oct 2026",
      src: contractDap,
      width: 649,
      height: 843,
      alt: "Contrato de depósito a plazo de Flux: titular ficticio, resumen de condiciones (500 USD, 300 días, tasa mensual 0,700 %, ganancia estimada 35 USD, total 535 USD), consideraciones legales y el hash de integridad al pie.",
      caption:
        "Contrato generado en la ejecución del video de depósito a plazo. Datos del titular ficticios.",
    },
    note: {
      title: "Alcance del hash",
      items: [
        "El hash permite comprobar que los datos del contrato no cambiaron. No es una firma electrónica con validez legal.",
        "La leyenda «Documento firmado electrónicamente» es texto de la plantilla del prototipo.",
      ],
    },
  },

  // Motivos: confirmados por el autor (2026-10-19). Implementación y costos:
  // verificados en el código de `main`.
  decisions: {
    id: "decisiones",
    eyebrow: "DECISIONES DE INGENIERÍA",
    title: "Cuatro decisiones y sus trade‑offs",
    labels: { reason: "Por qué", implementation: "Cómo", tradeoff: "Trade‑off" },
    decisions: [
      {
        title: "Un grafo explícito gobierna el flujo",
        reason:
          "Los procesos financieros tienen etapas, validaciones y esperas que deben seguir un orden controlado. El modelo interpreta los mensajes; el grafo decide la transición.",
        implementation:
          "Un nodo de entrada enruta por prioridades: cambio de producto, salto tras un paso completado, reanudación del nodo guardado o clasificación de la intención. El estado y el nodo actual se guardan en cada turno para continuar más tarde.",
        tradeoff:
          "Cada producto añade entradas a los mapas de ruteo, que hay que mantener sincronizados. Además conviven dos mecanismos de persistencia: el snapshot que rehidrata cada turno y el checkpointer de LangGraph.",
      },
      {
        title: "Estado organizado en namespaces",
        reason:
          "Separar datos recopilados, evaluaciones, ofertas, autenticación y progreso por producto hace legible el estado global y evita mezclar información entre flujos.",
        implementation:
          "FluxState es un TypedDict con un namespace por responsabilidad; los datos recopilados se separan por producto. El repositorio incluye pruebas con pytest que comprueban que cada nodo de motor escribe solo en su namespace.",
        tradeoff:
          "Más estructura que mantener: un producto nuevo amplía varios namespaces a la vez.",
      },
      {
        title: "El modelo extrae; el código decide",
        reason:
          "Los cálculos financieros y las reglas de negocio no se delegan a una respuesta probabilística. Así los motores se pueden probar y depurar por separado.",
        implementation:
          "Cada nodo pide al modelo una salida estructurada, validada con Pydantic. Los motores son clases de Python que calculan o lanzan excepciones de política, y el nodo enruta según el resultado.",
        tradeoff:
          "La calidad de los datos depende de la extracción. Se mitiga ignorando valores centinela y volviendo a pedir los campos que faltan, pero no se elimina.",
      },
      {
        title: "El RAG como desvío dentro de cada nodo",
        reason:
          "El usuario debía poder resolver dudas durante un trámite sin perder el paso en el que estaba.",
        implementation:
          "Los nodos de recolección, oferta y OTP detectan la intención PREGUNTA, responden con el consultor RAG y se quedan en el mismo paso, en lugar de depender solo de un router global previo.",
        tradeoff:
          "La lógica de desvío se repite en los nodos de los tres productos: un equilibrio pragmático entre reutilización y una implementación funcional dentro del plazo.",
      },
    ],
  },

  outcomes: {
    id: "resultados",
    eyebrow: "RESULTADOS",
    title: "Resultados, límites y aprendizajes",
    description: [
      "Flux es un prototipo académico y no tiene métricas de uso ni de rendimiento. Los resultados son funcionales y están respaldados por el código y las grabaciones.",
    ],
    columns: [
      {
        title: "Resultados",
        items: [
          "Crédito y depósito a plazo funcionan de extremo a extremo, de la conversación al contrato, como muestran las grabaciones.",
          "La cuenta corriente sigue el mismo patrón de grafo, con su propio motor.",
          "Las preguntas informativas se responden con RAG sin perder el paso del flujo.",
          "Los motores financieros están separados de la orquestación conversacional.",
        ],
      },
      {
        title: "Límites",
        items: [
          "Demostrado solo en ejecución local; no hay una demo pública enlazada.",
          "El OTP se genera con random en lugar de un generador criptográfico, no expira y se guarda en el estado de la conversación.",
          "El umbral de respaldo del RAG (0,45) está definido, pero solo actúa cuando no se recupera ningún fragmento.",
          "El motor de depósito usa valores fijos para la UF, el dólar y el IPC, y acepta cualquier plazo entre 7 y 360 días aunque define una lista de plazos válidos.",
          "Si falla la generación del contrato, el flujo se detiene sin una ruta de recuperación.",
          "Los contratos se guardan en un bucket con URL pública.",
        ],
      },
      {
        title: "Aprendizajes",
        items: [
          "El modelo funciona mejor como intérprete que como decisor: lo que debe cumplirse siempre va en código.",
          "Una conversación no es lineal. Las preguntas, los cambios de producto y las reanudaciones tienen que ser rutas del grafo, no excepciones.",
          "El estado conversacional necesita una estructura explícita para crecer a varios productos.",
        ],
      },
    ],
  },

  closing: {
    id: "seguir",
    eyebrow: "PROYECTOS",
    title: "Seguir explorando",
    primaryCta: { label: "Volver a proyectos", to: "/#proyectos" },
    secondaryLink: { label: "Ver el repositorio", href: REPOSITORY_URL },
  },
};
