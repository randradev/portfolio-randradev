import analysisDetail from "~/assets/projects/licitai/analysis-detail.webp";
import analysisUncertainty from "~/assets/projects/licitai/analysis-uncertainty.webp";
import demoPoster from "~/assets/projects/licitai/demo-poster.webp";
import opportunities from "~/assets/projects/licitai/opportunities.webp";
import processingQueue from "~/assets/projects/licitai/processing-queue.webp";

import type { LicitaiCaseStudyContent } from "../types";

/** Video optimizado, servido desde `public/` (docs/licitai/ASSETS.md). */
const VIDEOS = "/media/projects/licitai/videos";

/** Repositorio público, verificado (HTTP 200) el 2026-10-22. */
const REPOSITORY_URL = "https://github.com/randradev/licitai-prototipo";

/**
 * Caso de estudio de LicitAI. Fuente editorial: LICITAI-CASE-STUDY.md.
 * Evidencias y procedencia de los recursos: docs/licitai/ASSETS.md.
 *
 * Los datos técnicos se verificaron contra `main` de randradev/licitai-prototipo
 * (ca854c1, 2026-10-22): pesos y estados en `core/rubrica.py`, esquema en
 * `core/database_mgr.py`, límites en `core/config.py`, bloqueo en `main.py`.
 * El perfil de empresa es ficticio; las licitaciones son públicas.
 */
export const licitai: LicitaiCaseStudyContent = {
  meta: {
    title: "LicitAI — Análisis y priorización de licitaciones",
    description:
      "Caso de estudio de LicitAI: un prototipo en Python que procesa licitaciones de Mercado Público, las evalúa con Gemini y calcula un score explicable en código.",
  },

  hero: {
    backLink: { label: "Proyectos", to: "/#proyectos" },
    eyebrow: "DATA PROCESSING · APPLIED AI",
    title: { lead: "LicitAI", emphasis: "Análisis y priorización de licitaciones" },
    summary:
      "Un prototipo que procesa oportunidades de Mercado Público y utiliza IA para evaluar su adecuación a un perfil de negocio, identificar riesgos y apoyar su priorización.",
    highlights: ["Python", "Streamlit", "Gemini API", "Selenium"],
    primaryCta: { label: "Explorar la arquitectura", to: "#arquitectura" },
    demoCta: { label: "Ver demostración", to: "#demo" },
    facts: [
      { label: "Rol", value: "Desarrollo individual, de extremo a extremo." },
      {
        label: "Tipo",
        value: "Prototipo monousuario, con un perfil de empresa ficticio",
      },
      { label: "Entorno", value: "Demostrado en ejecución local" },
      {
        label: "Repositorio",
        value: "randradev/licitai-prototipo",
        href: REPOSITORY_URL,
      },
    ],
  },

  context: {
    id: "contexto",
    eyebrow: "CONTEXTO",
    title: "Revisar licitaciones requiere algo más que encontrar coincidencias",
    description: [
      "Mercado Público publica oportunidades que una empresa proveedora debe revisar y contrastar con sus capacidades. LicitAI automatiza parte de esa revisión: filtra oportunidades según un perfil de negocio, extrae información de las fichas y genera un análisis estructurado para ayudar a decidir cuáles conviene estudiar.",
      "El problema no es solo encontrar palabras clave. También hay que distinguir requisitos, riesgos e información que todavía no está disponible. La decisión de postular sigue siendo de una persona.",
    ],
    points: [
      {
        title: "Reducir",
        description:
          "Las palabras clave del perfil filtran el listado diario antes de gastar una llamada al modelo.",
      },
      {
        title: "Evaluar",
        description:
          "Gemini lee la ficha y califica cinco criterios, cada uno con la evidencia que lo respalda.",
      },
      {
        title: "Calcular",
        description:
          "Python valida la respuesta, calcula el score y decide su estado. El modelo nunca entrega el total.",
      },
    ],
  },

  architecture: {
    id: "arquitectura",
    eyebrow: "ARQUITECTURA",
    title: "De una publicación a un análisis estructurado",
    description: [
      "Cada etapa tiene una responsabilidad acotada. La fuente y la ficha aportan los datos, el modelo los interpreta y el código decide qué se guarda y cómo se puntúa.",
    ],
    caption:
      "Arquitectura del prototipo, derivada del código de la rama main de licitai-prototipo (commit ca854c1, octubre de 2026). Todo corre en un proceso Python local; main.py orquesta las fases.",
    layers: [
      {
        name: "Fuente",
        description:
          "La API pública de Mercado Público entrega el listado de licitaciones del día. Si falla, el error se registra y la cola existente se procesa igual.",
        modules: ["core/scraper.py", "descubrir_licitaciones_del_dia"],
      },
      {
        name: "Filtrado",
        description:
          "Se conservan las publicadas, abiertas y nuevas cuyo título contiene una palabra clave del perfil y ninguna de exclusión.",
        modules: ["parsing.coincide_keywords", "filtrar_licitaciones_relevantes"],
      },
      {
        name: "Extracción",
        description:
          "Selenium, con Chrome headless, abre la ficha pública y lee el texto que el listado no trae. Los metadatos se extraen con expresiones regulares; un campo que no aparece queda vacío.",
        modules: ["extraer_detalle_licitacion", "parsing.extraer_metadatos_ficha"],
      },
      {
        name: "Análisis con IA",
        description:
          "Gemini recibe el perfil y el texto de la ficha delimitado como corpus, y responde con JSON estructurado y temperatura 0: una nota de 0 a 5 por criterio, con su evidencia.",
        modules: ["core/ai_analyst.py", "esquema_respuesta"],
        kind: "ai",
      },
      {
        name: "Validación y cálculo",
        description:
          "La respuesta se valida antes de usarse. Una función pura, sin red ni base de datos, calcula el score, la cobertura y el estado.",
        modules: ["parsing.validar_analisis", "core/rubrica.py"],
      },
      {
        name: "Persistencia",
        description:
          "SQLite mediante un DAO propio, sin ORM. Cada análisis guarda las versiones de la rúbrica, el prompt y el perfil; el anterior pasa al historial.",
        modules: ["core/database_mgr.py"],
      },
      {
        name: "Interfaz",
        description:
          "Streamlit, con seis páginas para revisar, organizar y volver a procesar las oportunidades.",
        modules: ["web/app.py", "web/vistas.py", "web/panorama.py"],
      },
    ],
    services: {
      title: "Servicios externos",
      items: [
        {
          title: "API de Mercado Público",
          description: "Listado diario de licitaciones, con un ticket de acceso.",
        },
        {
          title: "Portal de Mercado Público",
          description: "Ficha HTML de cada licitación, leída con Chrome headless.",
        },
        {
          title: "Google Gemini",
          description: "Análisis estructurado de la ficha frente al perfil.",
        },
      ],
    },
    turn: {
      title: "Una sincronización, de extremo a extremo",
      steps: [
        "«Sincronizar» o la CLI toma un bloqueo de archivo: si ya hay otra ejecución en curso, la nueva se rechaza.",
        "Se consulta el listado del día y se registran como pendientes todas las licitaciones nuevas que pasan el filtro.",
        "La cola sale de la base de datos: primero las que cierran antes, hasta cinco por ejecución.",
        "Cada una se extrae, se analiza y se guarda. Un fallo suma un intento y, al tercero, la licitación pasa a error.",
        "La ejecución queda registrada con su embudo: listado, relevantes, registradas, analizadas y fallidas.",
      ],
    },
  },

  // Esquema: CREATE TABLE y COLUMNAS_NUEVAS de core/database_mgr.py (ca854c1).
  // Selección de columnas; el detalle completo está en
  // docs/licitai/architecture/licitai-data-model.md.
  dataModel: {
    id: "modelo-de-datos",
    eyebrow: "MODELO DE DATOS",
    title: "Cómo se organiza la información",
    description: [
      "Cinco tablas en SQLite. Una tabla central guarda cada licitación con su análisis vigente; el historial y las respuestas rechazadas conservan lo que se reemplaza o falla, para que nada se pierda.",
    ],
    label:
      "Diagrama entidad-relación de cinco tablas. licitaciones, con clave primaria id_externo, se relaciona de uno a muchos con analisis_historial y con respuestas_fallidas mediante la columna id_externo, sin clave foránea declarada. perfil_usuario y ejecuciones no se relacionan con otras tablas.",
    entities: [
      {
        id: "perfil",
        name: "perfil_usuario",
        role: "Perfil único de la empresa",
        fields: [
          { text: "id · CHECK (id = 1)", kind: "pk" },
          { text: "keywords_pos · keywords_neg" },
          { text: "bio_estrategica" },
          { text: "regiones (reservada, sin uso)" },
        ],
      },
      {
        id: "licitaciones",
        name: "licitaciones",
        role: "Registro central · una fila por licitación",
        fields: [
          { text: "id_externo (código de licitación)", kind: "pk" },
          { text: "Fuente", kind: "group" },
          { text: "titulo · organismo · fecha_cierre" },
          { text: "region · reclamos_pago_n · link" },
          { text: "descripcion_pro · ficha_fecha" },
          { text: "Pipeline", kind: "group" },
          { text: "estado · intentos · ultimo_error" },
          { text: "Análisis vigente", kind: "group" },
          { text: "analisis_ia_json (JSON validado)" },
          { text: "score_idoneidad · score_estado" },
          { text: "score_cobertura · rubrica_version" },
          { text: "Trazabilidad", kind: "group" },
          { text: "analisis_modelo · analisis_fecha" },
          { text: "analisis_prompt_version" },
          { text: "analisis_perfil_version" },
          { text: "Gestión y evaluación", kind: "group" },
          { text: "notas · checklist_json · eval_*" },
        ],
      },
      {
        id: "historial",
        name: "analisis_historial",
        role: "Análisis reemplazados · solo inserción",
        fields: [
          { text: "id", kind: "pk" },
          { text: "id_externo → licitaciones", kind: "ref" },
          { text: "reemplazado" },
          { text: "score_* · analisis_* · eval_*" },
        ],
      },
      {
        id: "fallidas",
        name: "respuestas_fallidas",
        role: "Respuestas rechazadas · solo inserción",
        fields: [
          { text: "id", kind: "pk" },
          { text: "id_externo → licitaciones", kind: "ref" },
          { text: "fecha · modelo · prompt_version" },
          { text: "error · respuesta (texto crudo)" },
        ],
      },
      {
        id: "ejecuciones",
        name: "ejecuciones",
        role: "Una fila por sincronización",
        fields: [
          { text: "id", kind: "pk" },
          { text: "inicio · fin · fecha_consulta" },
          { text: "total_listado · relevantes" },
          { text: "registradas · analizadas" },
          { text: "fallidas · detenido_por" },
          { text: "error_descubrimiento" },
        ],
      },
    ],
    relations: [
      {
        from: "licitaciones",
        to: "historial",
        cardinality: "1:N",
        label:
          "licitaciones 1 : N analisis_historial, por id_externo. Relación lógica: no hay FOREIGN KEY declarada.",
        logical: true,
      },
      {
        from: "licitaciones",
        to: "fallidas",
        cardinality: "1:N",
        label:
          "licitaciones 1 : N respuestas_fallidas, por id_externo. Relación lógica: no hay FOREIGN KEY declarada.",
        logical: true,
      },
    ],
    legend: {
      pk: "Clave primaria",
      ref: "Columna que vincula con otra tabla",
      logical: "Relación mantenida por el código, sin FOREIGN KEY",
    },
    caption:
      "Esquema de core/database_mgr.py, commit ca854c1. Selección de columnas: se omiten las de poco valor para entender el modelo.",
    textToggle: "Leer el modelo como texto",
    notes: {
      title: "Decisiones del modelo",
      items: [
        "Una tabla central desnormalizada: datos de la fuente, estado del pipeline, análisis vigente y gestión del usuario en una fila. Es simple para un solo usuario, a cambio de una tabla ancha.",
        "Las relaciones se mantienen por id_externo en el código. SQLite no las exige: no hay claves foráneas ni borrados en cascada, y la aplicación no borra licitaciones.",
        "El historial y las respuestas rechazadas solo reciben inserciones: re-analizar o fallar no borra un análisis anterior.",
        "El análisis se guarda como JSON. Score, estado, cobertura y versión de la rúbrica se duplican en columnas para ordenar y filtrar con SQL.",
        "La versión del perfil no es una clave: es una huella de las palabras clave y la descripción, grabada en cada análisis.",
      ],
    },
  },

  // Evidencia: captura de la ficha 1057421-39-LE26 (analizada el 2026-10-21) y
  // fotograma de la grabación del 2026-10-22 sobre otra licitación (Angol).
  analysis: {
    id: "analisis",
    eyebrow: "ANÁLISIS EN DETALLE",
    title: "Un score debe explicar de dónde viene",
    description: [
      "Un convenio de insumos clínicos para curaciones del Hospital de Laja, publicado en Mercado Público el 21 de octubre de 2026 y evaluado contra el perfil de demostración. Recibió 93/100 con score definitivo, y cada nota se puede leer junto a la evidencia que la respalda.",
    ],
    steps: [
      {
        title: "Entra desde la fuente",
        description: "El listado del día trae el código, el nombre y la fecha de cierre.",
      },
      {
        title: "Pasa el filtro del perfil",
        description:
          "El título coincide con las palabras clave del perfil, así que se registra como pendiente.",
      },
      {
        title: "Se lee la ficha",
        description:
          "Selenium abre la ficha pública: organismo, región, reclamos de pago y el texto completo.",
      },
      {
        title: "Gemini evalúa",
        description:
          "Devuelve una nota y su evidencia por criterio, además de requisitos excluyentes, información faltante y riesgos.",
      },
      {
        title: "Python valida y calcula",
        description:
          "35 + 20 + 20 + 10 + 8 = 93. Los cinco criterios tienen nota, así que el score es definitivo.",
      },
      {
        title: "La interfaz lo presenta",
        description:
          "Score, etiqueta, desglose con evidencia, requisitos y riesgos en la misma ficha.",
      },
    ],
    evidence: [
      {
        type: "image",
        kind: "capture",
        date: "22 oct 2026",
        src: analysisDetail,
        width: 1045,
        height: 785,
        zoomable: true,
        alt: "Ficha de LicitAI del convenio de insumos clínicos para curaciones del Hospital de Laja: score 93/100, «Idoneidad excelente», veredicto de la IA y desglose del score. Compatibilidad comercial 5/5, requisitos obligatorios 4/5, capacidad de cumplimiento 5/5, viabilidad geográfica 5/5 y viabilidad económica 4/5, cada uno con su peso y la evidencia citada.",
        caption:
          "Desglose del score de la licitación 1057421-39-LE26: nota, peso y evidencia de cada criterio. Licitación pública; perfil de empresa ficticio.",
      },
      {
        type: "image",
        kind: "capture",
        date: "22 oct 2026",
        src: analysisUncertainty,
        width: 1000,
        height: 585,
        zoomable: true,
        alt: "Parte inferior de un análisis de LicitAI: dos requisitos excluyentes marcados como «No verificable», tres datos faltantes, puntos críticos, riesgos comerciales y 29 reclamos por pagos atrasados del organismo, con la fuente y la fecha de lectura de la ficha.",
        caption:
          "Fotograma de la grabación, sobre otra licitación (Angol). Lo que no se puede verificar en la ficha queda marcado como tal.",
      },
    ],
    notes: {
      title: "Cómo leer esta evidencia",
      items: [
        "El score mide la compatibilidad con el perfil según la rúbrica. No es la probabilidad de adjudicarse la licitación.",
        "El perfil es ficticio: una distribuidora de insumos de laboratorio y salud creada para la demostración. Las licitaciones y sus datos son públicos.",
        "Un requisito excluyente solo deja la licitación como no elegible si su incumplimiento está confirmado con evidencia; si falta información, queda como «No verificable».",
        "Los reclamos de pago salen de la ficha y se muestran aparte: no forman parte del score.",
      ],
    },
  },

  scoring: {
    id: "scoring",
    eyebrow: "MODELO DE SCORING",
    title: "La IA evalúa; el código calcula",
    description: [
      "Gemini entrega una evaluación por criterio junto con la evidencia disponible. Python calcula el resultado final y aplica las reglas de estado. Así, el score no depende de una cifra total generada libremente por el modelo.",
    ],
    split: [
      {
        title: "Lo que aporta Gemini",
        items: [
          "Una nota entera de 0 a 5 por criterio, o ninguna si no hay información.",
          "El estado de la evidencia (suficiente, parcial o ausente) y la cita que la respalda.",
          "Requisitos excluyentes, información faltante, puntos críticos y riesgos.",
        ],
      },
      {
        title: "Lo que decide Python",
        items: [
          "Rechaza la respuesta completa si una nota es decimal o está fuera de 0 a 5.",
          "Anula las notas sin evidencia y registra cada corrección como advertencia.",
          "Calcula el score, la cobertura y el estado con una función pura y determinista.",
        ],
      },
    ],
    criteria: {
      title: "Criterios y pesos",
      source: "core/rubrica.py · CRITERIOS · rúbrica v1.1",
      labels: { weight: "Peso", blocking: "Bloqueante", essential: "Esencial" },
      items: [
        {
          key: "comercial",
          name: "Compatibilidad comercial",
          weight: 35,
          description:
            "Correspondencia entre el objeto de la licitación y los productos o servicios de la empresa.",
          blocking: true,
          essential: true,
        },
        {
          key: "requisitos",
          name: "Requisitos obligatorios",
          weight: 25,
          description:
            "Requisitos técnicos y legales, certificaciones, experiencia y otras condiciones obligatorias.",
          essential: true,
        },
        {
          key: "capacidad",
          name: "Capacidad de cumplimiento",
          weight: 20,
          description:
            "Volumen, cantidades, especificaciones, plazos y condiciones operativas.",
        },
        {
          key: "geografia",
          name: "Viabilidad geográfica y logística",
          weight: 10,
          description:
            "Capacidad de entregar o prestar el servicio en la ubicación requerida, según el perfil.",
        },
        {
          key: "economica",
          name: "Viabilidad económica y contractual",
          weight: 10,
          description: "Presupuesto, costos y condiciones contractuales disponibles.",
        },
      ],
    },
    formula: {
      title: "Cálculo",
      rules: [
        { label: "Definitivo", value: "Σ peso × nota / 5, sobre 100" },
        {
          label: "Provisional",
          value: "Normalizado sobre el peso evaluado, con redondeo half-up exacto",
        },
        { label: "Cobertura", value: "Porcentaje del peso total que tuvo nota" },
        {
          label: "Interpretación",
          value:
            "90+ excelente · 75+ buena · 60+ potencial · 40+ limitado · menos de 40 baja",
        },
        {
          label: "Versionado",
          value:
            "Cada análisis guarda las versiones de la rúbrica, el prompt y el perfil",
        },
      ],
      note: "Los pesos y los rangos son una hipótesis inicial de negocio, sin calibrar.",
    },
    states: {
      title: "Estados del resultado, en orden de prevalencia",
      source: "rubrica.calcular",
      items: [
        {
          label: "No elegible",
          key: "no_elegible",
          condition:
            "Algún requisito excluyente tiene un incumplimiento confirmado con evidencia.",
          score: "Sin número, con el motivo y el requisito.",
        },
        {
          label: "Evaluación incompleta",
          key: "evaluacion_insuficiente",
          condition:
            "El perfil no describe la empresa, no se identifica el objeto de la licitación o falta la nota comercial.",
          score: "Sin número, con el motivo.",
        },
        {
          label: "Score provisional",
          key: "provisional",
          condition: "Hay nota comercial, pero falta algún otro criterio.",
          score: "0 a 100, no directamente comparable con un definitivo.",
        },
        {
          label: "Score definitivo",
          key: "definitivo",
          condition: "Los cinco criterios tienen nota.",
          score: "0 a 100.",
        },
      ],
    },
    notes: {
      title: "Lo que el score no es",
      items: [
        "No es una probabilidad de ganar la licitación: mide la adecuación al perfil según la rúbrica.",
        "No está validado con evaluaciones humanas representativas. La base de desarrollo tiene una sola evaluación del autor; el resto son simuladas y no cuentan como evidencia.",
        "La urgencia y el riesgo de pago se muestran como señales aparte; el prompt indica no considerarlos en las notas.",
        "Con temperatura 0 la variación entre ejecuciones sobre la misma ficha se reduce, pero no desaparece.",
      ],
    },
  },

  interface: {
    id: "interfaz",
    eyebrow: "INTERFAZ",
    title: "Una vista para revisar, priorizar y volver al análisis",
    description: [
      "La interfaz en Streamlit está pensada para el trabajo diario con las oportunidades: ordenarlas por cierre o score, abrir su análisis, marcarlas o archivarlas, y ver qué quedó pendiente.",
    ],
    demo: {
      id: "demo",
      type: "video",
      kind: "recording",
      date: "22 oct 2026",
      src: `${VIDEOS}/licitai-demo.mp4`,
      poster: demoPoster,
      width: 1440,
      height: 688,
      duration: "1:36",
      title: "Recorrido por la interfaz de LicitAI",
      caption:
        "Oportunidades, análisis y desglose del score, Favoritas, En proceso, Panorama y Perfil, sobre datos ya sincronizados. Panorama muestra un porcentaje de acierto calculado casi solo con evaluaciones simuladas: no es una medida de precisión. Sin audio.",
    },
    capture: {
      type: "image",
      kind: "capture",
      date: "22 oct 2026",
      src: opportunities,
      width: 1060,
      height: 860,
      zoomable: true,
      alt: "Página Oportunidades de LicitAI: indicadores de oportunidades activas, cierres de la semana, score promedio y licitaciones en proceso; buscador, filtros por score mínimo y región, orden por cierre, score o publicación, y tarjetas de licitaciones con su score, etiqueta, días al cierre, región y reclamos de pago.",
      caption:
        "Página Oportunidades, ordenada por cierre más próximo. Recortada a la zona de contenido.",
    },
    pages: {
      title: "Páginas",
      items: [
        {
          title: "Oportunidades",
          description:
            "Listado con score, cierre, región y reclamos de pago, con filtros y orden.",
        },
        {
          title: "Favoritas",
          description:
            "Las seleccionadas, con un checklist de preparación y notas internas.",
        },
        { title: "Archivo", description: "Las descartadas, que se pueden restaurar." },
        {
          title: "En proceso",
          description: "La cola y los errores, con «Analizar ahora» y «Reintentar».",
        },
        {
          title: "Panorama",
          description:
            "Embudo, cierres, distribución del score y exportación a CSV o JSON.",
        },
        {
          title: "Perfil",
          description: "Palabras clave y descripción de la empresa que usa el análisis.",
        },
      ],
    },
  },

  // Motivos: los documentados en el dossier y en los comentarios del código
  // (ca854c1). PENDIENTE: confirmación del autor, como en Flux (2026-10-19).
  decisions: {
    id: "decisiones",
    eyebrow: "DECISIONES DE INGENIERÍA",
    title: "Controlar lo que la IA puede afirmar",
    labels: { reason: "Por qué", implementation: "Cómo", tradeoff: "Trade‑off" },
    decisions: [
      {
        title: "Separar la evaluación del cálculo",
        reason:
          "Un total generado libremente por el modelo no se puede explicar ni reproducir. Las notas por criterio sí se pueden revisar una a una.",
        implementation:
          "Gemini entrega notas de 0 a 5 con su evidencia; rubrica.calcular, una función pura, obtiene el score, la cobertura y el estado. Las versiones anteriores del prototipo pedían un score de 1 a 10 al modelo; esos análisis se muestran como «rúbrica anterior» y nunca se convierten.",
        tradeoff:
          "La calidad sigue dependiendo de las notas del modelo, y los pesos son una hipótesis sin calibrar.",
      },
      {
        title: "Validar la respuesta antes de guardarla",
        reason:
          "Un JSON mal formado o una nota fuera de escala no debe llegar a la interfaz como si fuera un análisis.",
        implementation:
          "La llamada usa salida estructurada con un esquema fijo. Después, validar_analisis rechaza las respuestas inválidas y guarda su texto crudo en respuestas_fallidas, con el modelo y la versión del prompt.",
        tradeoff:
          "Una respuesta rechazada consume un intento y una solicitud de la cuota diaria.",
      },
      {
        title: "La falta de información no es una nota",
        reason:
          "Una nota sin respaldo infla el score. En dos respuestas reales, Gemini puntuó 5 la viabilidad geográfica aunque el perfil no decía dónde opera la empresa.",
        implementation:
          "Un criterio sin evidencia queda sin nota y el score pasa a provisional, con su cobertura. Un requisito excluyente sin información queda «No verificable» y no descarta la licitación.",
        tradeoff:
          "Los requisitos suelen estar en las bases PDF, que el prototipo no lee: muchos análisis quedan con avisos de «revisar bases».",
      },
      {
        title: "Los fallos externos no se ocultan",
        reason:
          "El portal, la API y el modelo fallan por motivos distintos y no todos son culpa de la licitación.",
        implementation:
          "Un fallo de extracción o de análisis suma un intento; al tercero, la licitación pasa a error con su motivo. Una cuota agotada o un Chrome que no arranca detienen la ejecución sin consumir intentos.",
        tradeoff:
          "La ejecución es secuencial y síncrona: una sincronización bloquea la sesión que la inició.",
      },
    ],
  },

  reliability: {
    id: "fiabilidad",
    eyebrow: "FIABILIDAD",
    title: "Los fallos externos forman parte del flujo",
    description: [
      "LicitAI depende de tres servicios que no controla. Cada fallo tiene un tratamiento explícito y queda visible en la interfaz.",
    ],
    blocks: [
      {
        title: "Ejecución y reintentos",
        items: [
          "Un archivo de bloqueo impide dos sincronizaciones simultáneas; uno con más de 120 minutos se considera huérfano.",
          "Cada ejecución procesa hasta cinco licitaciones, con una pausa entre ellas, y cada una tolera tres fallos antes de pasar a error.",
          "Desde En proceso, «Analizar ahora» procesa una licitación de inmediato con las mismas reglas, y «Reintentar» la devuelve a la cola.",
        ],
      },
      {
        title: "Datos de la fuente",
        items: [
          "Los datos de Mercado Público prevalecen: la IA solo rellena el título o el organismo si están vacíos, y nunca los sobrescribe.",
          "El texto de la ficha se envía al modelo delimitado como corpus, con la instrucción de ignorar órdenes dentro de él.",
          "Un re-análisis fallido conserva el análisis anterior.",
        ],
      },
    ],
    evidence: {
      type: "image",
      kind: "capture",
      date: "22 oct 2026",
      src: processingQueue,
      width: 1282,
      height: 515,
      zoomable: true,
      alt: "Página En proceso de LicitAI: dos licitaciones marcadas «No se pudo completar» con el motivo «La IA no entregó un análisis válido», los botones «Analizar ahora» y «Reintentar», y la ayuda que explica que analizar ahora usa un análisis de IA.",
      caption:
        "Dos licitaciones cuya respuesta de la IA no pasó la validación, esperando un nuevo intento.",
    },
    note: {
      title: "Alcance de las pruebas",
      items: [
        "El repositorio incluye pruebas con pytest que sustituyen Gemini, Selenium y la API por dobles.",
        "Por eso no verifican el comportamiento real del portal ni la calidad de las respuestas del modelo.",
      ],
    },
  },

  outcomes: {
    id: "resultados",
    eyebrow: "ESTADO",
    title: "Un prototipo funcional con límites identificados",
    description: [
      "LicitAI se ha ejecutado localmente contra los servicios reales y no tiene métricas de uso ni de precisión. Lo que sigue distingue lo implementado de lo pendiente.",
    ],
    columns: [
      {
        title: "Implementado",
        items: [
          "Consulta del listado de Mercado Público y filtrado por el perfil.",
          "Extracción de las fichas con Selenium.",
          "Análisis estructurado con Gemini y rúbrica de cinco criterios calculada en Python.",
          "Interfaz en Streamlit para consultar, organizar y re-procesar oportunidades.",
          "Historial de análisis, respuestas rechazadas y registro de ejecuciones.",
        ],
      },
      {
        title: "Límites",
        items: [
          "Demostrado solo en ejecución local, para un único perfil; no hay una demo pública.",
          "La calidad del score no se ha validado con una muestra representativa de evaluaciones humanas.",
          "Las bases de licitación en PDF no se analizan, y el filtro inicial solo lee el título.",
          "La extracción depende de la estructura HTML del portal: un cambio en él la rompería.",
          "El SDK de Gemini usado (google-generativeai) ya no tiene soporte de Google, y no hay integración continua configurada.",
        ],
      },
      {
        title: "Siguientes pasos (propuestas)",
        items: [
          "Publicar una demo de solo lectura en Streamlit, con datos ya analizados y sin sincronizar ni llamar al modelo.",
          "Analizar las bases en PDF, citando la fuente de cada requisito.",
          "Evaluar la rúbrica contra criterios humanos en un conjunto de casos representativo.",
          "Separar frontend, API, persistencia y trabajos asíncronos en una futura versión.",
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
