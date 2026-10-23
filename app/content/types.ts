/**
 * Tipos del contenido del sitio. El contenido vive en `app/content/` y los
 * componentes solo lo consumen.
 */

/** Enlace de navegación. `to` es una ruta interna (admite `#ancla`). */
export interface NavItem {
  label: string;
  to: string;
}

/** Metadatos SEO de una ruta. */
export interface RouteMeta {
  title: string;
  description: string;
}

/** Llamada a la acción que navega a una ruta interna. */
export interface CtaLink {
  label: string;
  to: string;
}

/** Enlace a una URL externa o a un archivo (`mailto:`, PDF, perfil…). */
export interface ExternalLink {
  label: string;
  href: string;
}

/** Contenido del hero de la página principal. */
export interface HeroContent {
  eyebrow: string;
  /** El título se compone como `lead` + `emphasis`; `emphasis` se resalta. */
  title: { lead: string; emphasis: string };
  summary: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  /** Microcopy bajo los CTA. */
  note: string;
}

/** Encabezado común de las secciones de la página principal. */
export interface SectionIntro {
  /** `id` del `<section>`: destino de los anclas de la navegación. */
  id: string;
  eyebrow: string;
  title: string;
  /** Párrafos de introducción. */
  description?: string[];
}

/** Imagen con texto alternativo descriptivo. */
export interface ImageAsset {
  src: string;
  alt: string;
}

/** Proyecto destacado. Los casos de estudio completos llegan en la Fase 4. */
export interface Project {
  slug: string;
  name: string;
  category: string;
  summary: string;
  /** Solo tecnologías verificadas en el CV o el repositorio. */
  stack: string[];
  /**
   * Ruta del caso de estudio. `null` mientras la ruta no exista: la tarjeta
   * no muestra el CTA para no enlazar a un 404.
   */
  caseStudyTo: string | null;
  /**
   * Portada 16:9: captura real del proyecto. `null` mientras no exista; se
   * muestra una portada abstracta que no imita una interfaz.
   */
  cover: ImageAsset | null;
}

export interface ProjectsContent extends SectionIntro {
  cardCtaLabel: string;
  /** Enlace "Ver todos los proyectos". `null`: no se muestra. */
  allProjectsLink: ExternalLink | null;
}

/** Área del bloque "Capacidades", con las tecnologías que la respaldan. */
export interface ApproachArea {
  /** Icono decorativo asociado al área. */
  icon: "interfaces" | "systems" | "ai";
  title: string;
  description: string;
  technologies: string[];
}

export interface ApproachContent extends SectionIntro {
  areas: ApproachArea[];
}

export interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  description: string;
  /** Puesto vigente: se marca como estado activo en la línea de tiempo. */
  current?: boolean;
}

export interface EducationItem {
  /** `degree`: carrera (se destaca). `course`: curso o programa complementario. */
  kind: "degree" | "course";
  title: string;
  institution: string;
  period: string;
}

/** Sección con un CTA hacia el CV, visible solo si `site.cvHref` existe. */
export interface ExperienceContent extends SectionIntro {
  cvCtaLabel: string;
}

export interface AboutContent extends SectionIntro {
  cta: CtaLink;
  photo: ImageAsset;
}

export interface ContactContent extends SectionIntro {
  primaryCtaLabel: string;
  cvCtaLabel: string;
}

export interface FooterContent {
  credit: string;
  descriptor: string;
  cvLabel: string;
}

/* ── Casos de estudio ───────────────────────────────────────────────────── */

/** Dato breve de la ficha del caso (rol, tipo, entorno, repositorio). */
export interface CaseStudyFact {
  label: string;
  value: string;
  /** Enlace verificado asociado al valor (p. ej. el repositorio). */
  href?: string;
}

/** Cabecera de un caso de estudio. */
export interface CaseStudyHeroContent {
  /** Vuelta al listado de proyectos. */
  backLink: CtaLink;
  eyebrow: string;
  /** El `h1` se compone como `lead` + `emphasis` (nombre + propuesta). */
  title: { lead: string; emphasis: string };
  summary: string;
  /** Tecnologías destacadas, solo verificadas en el código. */
  highlights: string[];
  primaryCta: CtaLink;
  /** Enlace a la demostración en video. `null` mientras no haya un video publicado. */
  demoCta: CtaLink | null;
  facts: CaseStudyFact[];
}

/** Idea o responsabilidad breve, con título y explicación. */
export interface CaseStudyPoint {
  title: string;
  description: string;
}

export interface CaseStudyContextContent extends SectionIntro {
  /** Responsabilidades que el sistema debía mantener separadas. */
  points: CaseStudyPoint[];
}

/** Capa del diagrama de arquitectura, derivada del código. */
export interface ArchitectureLayer {
  name: string;
  description: string;
  /** Módulos o piezas del repositorio que implementan la capa. */
  modules: string[];
  /** `ai`: capa de modelos y conocimiento; se distingue con el acento violeta. */
  kind?: "ai";
}

/** Regla del ruteo de entrada, evaluada en orden; la primera que se cumple decide. */
export interface RoutingRule {
  priority: string;
  condition: string;
  destination: string;
  /** Matiz breve del destino (p. ej. qué pasa si falla la validación). */
  detail?: string;
}

/** Decisión del diagrama de flujo. En los textos, «\n» marca el salto de línea. */
export interface RoutingDecision {
  priority: string;
  question: string;
  destination: string;
}

export interface RoutingDiagramContent {
  /** Descripción accesible del diagrama completo. */
  label: string;
  start: string;
  yes: string;
  no: string;
  decisions: RoutingDecision[];
  /** Salida cuando ninguna decisión se cumple: el clasificador LLM. */
  fallback: { priority: string; title: string; node: string; outcomes: string[] };
}

export interface RoutingContent {
  title: string;
  description: string;
  /** Función del código que implementa el ruteo. */
  source: string;
  diagram: RoutingDiagramContent;
  /** Etiqueta del desplegable con las reglas en texto. */
  textToggle: string;
  /** Las mismas reglas, en texto completo. */
  rules: RoutingRule[];
}

export interface ArchitectureContent extends SectionIntro {
  /** Procedencia del diagrama (versión del código). */
  caption: string;
  layers: ArchitectureLayer[];
  /** Ruteo de entrada (Flux). Ausente en sistemas sin un ruteo equivalente. */
  routing?: RoutingContent;
  services: { title: string; items: CaseStudyPoint[] };
  /** Recorrido de un turno de conversación, en orden. */
  turn: { title: string; steps: string[] };
}

/**
 * Tipo de evidencia, para distinguir qué demuestra cada recurso
 * (FLUX-CASE-STUDY.md §6.10): `recording` grabación de la interfaz,
 * `log` registro de consola de una ejecución, `capture` captura de pantalla.
 */
export type EvidenceKind = "recording" | "log" | "capture";

interface EvidenceBase {
  /** Ancla del recurso (p. ej. destino del CTA «Ver demostración»). */
  id?: string;
  kind: EvidenceKind;
  /** Fecha de la ejecución, legible («17 oct 2026»). */
  date: string;
  /** Qué muestra y cómo leerlo; también sirve de descripción accesible. */
  caption: string;
  width: number;
  height: number;
}

export interface EvidenceImage extends EvidenceBase {
  type: "image";
  src: string;
  alt: string;
}

export interface EvidenceVideo extends EvidenceBase {
  type: "video";
  src: string;
  poster: string;
  /** Nombre accesible del reproductor. */
  title: string;
  /** Duración legible («1:15»). */
  duration: string;
}

export type EvidenceMedia = EvidenceImage | EvidenceVideo;

export interface RagContent extends SectionIntro {
  /** Secuencia de la consulta, en orden. */
  steps: CaseStudyPoint[];
  evidence: EvidenceMedia[];
  /** Aclaraciones para leer la evidencia sin sobreinterpretarla. */
  notes: CaseStudyList;
  /** El mismo mecanismo en otro producto. */
  secondary: { title: string; description: string; evidence: EvidenceMedia[] };
}

/** Etapa de un flujo de producto, ligada a su nodo del grafo. */
export interface FlowStage {
  name: string;
  node: string;
  description: string;
  /** Se ejecuta sin esperar un mensaje del usuario (motor, formalización). */
  automatic?: boolean;
}

/** Salida alternativa del flujo. */
export interface FlowExit {
  name: string;
  trigger: string;
  /** Nodo terminal; ausente si el flujo se detiene sin uno. */
  node?: string;
}

export interface ProductFlowContent extends SectionIntro {
  stages: FlowStage[];
  /** Leyenda de los dos tipos de etapa. */
  legend: { conversational: string; automatic: string };
  exits: { title: string; items: FlowExit[] };
  engine: {
    title: string;
    module: string;
    rules: { label: string; value: string }[];
    note: string;
  };
  demo: EvidenceVideo;
}

/** Bloque con título y una lista de afirmaciones breves. */
export interface CaseStudyList {
  title: string;
  items: string[];
}

export interface SecurityContent extends SectionIntro {
  blocks: CaseStudyList[];
  evidence: EvidenceImage;
  /** Aclaración sobre el alcance del hash (no es una firma con validez legal). */
  note: CaseStudyList;
}

/** Decisión de ingeniería: FLUX-CASE-STUDY.md §6.8. */
export interface EngineeringDecision {
  title: string;
  reason: string;
  implementation: string;
  tradeoff: string;
}

export interface DecisionsContent extends SectionIntro {
  labels: { reason: string; implementation: string; tradeoff: string };
  decisions: EngineeringDecision[];
}

export interface OutcomesContent extends SectionIntro {
  columns: CaseStudyList[];
}

/** Cierre del caso: vuelta al portafolio y enlaces verificados. */
export interface CaseStudyClosingContent extends SectionIntro {
  primaryCta: CtaLink;
  secondaryLink: ExternalLink;
}

/* ── Scoring (LicitAI) ─────────────────────────────────────────────────── */

/** Criterio de una rúbrica de evaluación, con su peso sobre 100. */
export interface ScoringCriterion {
  /** Clave del criterio en el código. */
  key: string;
  name: string;
  weight: number;
  description: string;
  /** Sin su nota no hay evaluación posible. */
  blocking?: boolean;
  /** Si falta, se advierte, pero el score sigue siendo posible. */
  essential?: boolean;
}

/** Estado posible del resultado, en orden de prevalencia. */
export interface ScoringState {
  /** Etiqueta exacta que muestra la aplicación. */
  label: string;
  /** Valor guardado en la base de datos. */
  key: string;
  condition: string;
  score: string;
}

export interface ScoringContent extends SectionIntro {
  /** Qué aporta el modelo y qué calcula el código. */
  split: CaseStudyList[];
  criteria: {
    title: string;
    source: string;
    labels: { weight: string; blocking: string; essential: string };
    items: ScoringCriterion[];
  };
  formula: {
    title: string;
    rules: { label: string; value: string }[];
    note: string;
  };
  states: { title: string; source: string; items: ScoringState[] };
}

/* ── Análisis de una oportunidad (LicitAI) ─────────────────────────────── */

export interface AnalysisContent extends SectionIntro {
  /** Recorrido de la oportunidad, en orden. */
  steps: CaseStudyPoint[];
  /** Captura principal, junto a la secuencia. */
  evidence: EvidenceImage;
  /** Aclaraciones para leer la evidencia sin sobreinterpretarla. */
  notes: CaseStudyList;
  /** Lo que la ficha deja pendiente, con su evidencia. */
  pending: { title: string; description: string; evidence: EvidenceImage };
}

/* ── Panorama (LicitAI) ────────────────────────────────────────────────── */

/** Gráfico de la aplicación: qué mide y para qué sirve. */
export interface PanoramaMetric {
  title: string;
  measures: string;
  relevance: string;
}

/** Uno o más gráficos que se leen juntos, con su captura si se publica. */
export interface PanoramaGroup {
  metrics: PanoramaMetric[];
  evidence?: EvidenceImage;
}

export interface PanoramaContent extends SectionIntro {
  labels: { measures: string; relevance: string };
  groups: PanoramaGroup[];
}

/* ── Modelo de datos (LicitAI) ─────────────────────────────────────────── */

/**
 * Fila de una tabla del diagrama. `pk`: clave primaria. `ref`: columna que
 * vincula con otra tabla. `group`: subtítulo de un grupo de columnas.
 */
export interface DataField {
  text: string;
  kind?: "pk" | "ref" | "group";
}

export interface DataEntity {
  /** Identificador estable para la geometría del diagrama. */
  id: "perfil" | "licitaciones" | "historial" | "fallidas" | "ejecuciones";
  /** Nombre de la tabla en SQLite. */
  name: string;
  role: string;
  fields: DataField[];
}

/** Relación entre tablas. `logical`: la mantiene el código, sin FOREIGN KEY. */
export interface DataRelation {
  from: DataEntity["id"];
  to: DataEntity["id"];
  cardinality: string;
  label: string;
  logical: boolean;
}

export interface DataModelContent extends SectionIntro {
  /** Descripción accesible del diagrama completo. */
  label: string;
  entities: DataEntity[];
  relations: DataRelation[];
  legend: { pk: string; ref: string; logical: string };
  /** Procedencia del diagrama (archivo y versión del código). */
  caption: string;
  textToggle: string;
  notes: CaseStudyList;
}

/* ── Interfaz (LicitAI) ────────────────────────────────────────────────── */

export interface InterfaceContent extends SectionIntro {
  demo: EvidenceVideo;
  capture: EvidenceImage;
  pages: { title: string; items: CaseStudyPoint[] };
}

/** Partes comunes a todos los casos de estudio. */
export interface CaseStudyBase {
  meta: RouteMeta;
  hero: CaseStudyHeroContent;
  context: CaseStudyContextContent;
  architecture: ArchitectureContent;
  decisions: DecisionsContent;
  outcomes: OutcomesContent;
  closing: CaseStudyClosingContent;
}

/** Contenido completo de la página de un caso de estudio (Flux). */
export interface CaseStudyContent extends CaseStudyBase {
  rag: RagContent;
  credit: ProductFlowContent;
  deposit: ProductFlowContent;
  security: SecurityContent;
}

/** Caso de estudio de LicitAI: LICITAI-CASE-STUDY.md §4. */
export interface LicitaiCaseStudyContent extends CaseStudyBase {
  dataModel: DataModelContent;
  analysis: AnalysisContent;
  scoring: ScoringContent;
  interface: InterfaceContent;
  panorama: PanoramaContent;
  /** Fallos externos y validación, con la composición de la sección de seguridad de Flux. */
  reliability: SecurityContent;
}

/** Canales de contacto públicos, verificados contra el CV. */
export interface ContactChannels {
  email: string;
  profiles: ExternalLink[];
}

export interface SiteConfig {
  /** Nombre/wordmark visible en la navegación. */
  name: string;
  /** Idioma del documento (atributo `lang`). */
  lang: string;
  /** Metadatos por defecto, usados cuando una ruta no define los suyos. */
  meta: RouteMeta;
  /** Enlaces principales de la navegación. */
  nav: NavItem[];
  /** CTA destacado de la navegación. */
  navCta: CtaLink;
  /**
   * Ruta pública del CV en PDF (servido desde `public/`).
   * `null` mientras no esté confirmado: los CTA del CV no se muestran.
   */
  cvHref: string | null;
  contact: ContactChannels;
}
