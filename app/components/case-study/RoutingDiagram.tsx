import { useId } from "react";

import type { RoutingContent, RoutingDiagramContent } from "~/content/types";

import styles from "./RoutingDiagram.module.css";

const TITLE_ID = "ruteo-titulo";

type Box = { x: number; y: number; w: number; h: number };
type Point = [number, number];

/**
 * Geometría de una orientación del diagrama, en unidades del viewBox.
 * `row`: decisiones de izquierda a derecha («No» avanza en horizontal).
 * `column`: decisiones de arriba abajo, para pantallas estrechas.
 */
type Layout = {
  orientation: "row" | "column";
  width: number;
  height: number;
  /** Semiancho y semialto de los rombos. */
  hw: number;
  hh: number;
  start: Box;
  diamonds: Point[];
  destinations: Box[];
  fallback: Box;
  group: Box;
  chips: Box[];
};

const ROW: Layout = {
  orientation: "row",
  width: 1240,
  height: 410,
  hw: 88,
  hh: 62,
  start: { x: 0, y: 82, w: 124, h: 40 },
  diamonds: [240, 470, 700, 930].map((cx): Point => [cx, 102]),
  destinations: [240, 470, 700, 930].map((cx) => ({ x: cx - 85, y: 232, w: 170, h: 64 })),
  fallback: { x: 1066, y: 62, w: 174, h: 80 },
  group: { x: 1066, y: 190, w: 174, h: 212 },
  chips: [0, 1, 2, 3].map((i) => ({ x: 1078, y: 202 + i * 49, w: 151, h: 38 })),
};

const COLUMN: Layout = {
  orientation: "column",
  width: 360,
  height: 948,
  hw: 86,
  hh: 60,
  start: { x: 12, y: 4, w: 166, h: 38 },
  diamonds: [130, 294, 458, 622].map((cy): Point => [95, cy]),
  destinations: [130, 294, 458, 622].map((cy) => ({ x: 212, y: cy - 32, w: 146, h: 64 })),
  fallback: { x: 4, y: 722, w: 352, h: 68 },
  group: { x: 4, y: 830, w: 352, h: 112 },
  chips: [0, 1, 2, 3].map((i) => ({
    x: i % 2 === 0 ? 16 : 184,
    y: i < 2 ? 846 : 892,
    w: 160,
    h: 38,
  })),
};

const centerX = (box: Box) => box.x + box.w / 2;
const centerY = (box: Box) => box.y + box.h / 2;

/** Líneas de un texto, centradas en vertical alrededor de `cy`. */
function Lines({
  text,
  cx,
  cy,
  lineHeight = 18,
  className,
}: {
  text: string;
  cx: number;
  cy: number;
  lineHeight?: number;
  className?: string;
}) {
  const lines = text.split("\n");
  const first = cy - ((lines.length - 1) * lineHeight) / 2;

  return (
    <text className={className} textAnchor="middle" dominantBaseline="central">
      {lines.map((line, index) => (
        <tspan key={line} x={cx} y={first + index * lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function Flowchart({
  diagram,
  layout,
  className,
}: {
  diagram: RoutingDiagramContent;
  layout: Layout;
  className: string;
}) {
  // Un marcador por SVG: los dos diagramas conviven en la página.
  const markerId = `flecha-${useId().replace(/[^\w-]/g, "")}`;
  const { hw, hh, start, diamonds, destinations, fallback, group, chips } = layout;
  const isRow = layout.orientation === "row";

  // «No»: de la salida de cada figura a la entrada de la siguiente.
  const exitNo = ([cx, cy]: Point): Point => (isRow ? [cx + hw, cy] : [cx, cy + hh]);
  const entry = ([cx, cy]: Point): Point => (isRow ? [cx - hw, cy] : [cx, cy - hh]);
  const startExit: Point = isRow
    ? [start.x + start.w, centerY(start)]
    : [centerX(start), start.y + start.h];
  const lastDiamond = diamonds[diamonds.length - 1];
  const fallbackEntry: Point = isRow
    ? [fallback.x, centerY(fallback)]
    : [lastDiamond[0], fallback.y];

  const noArrows: [Point, Point][] = [
    ...diamonds
      .slice(0, -1)
      .map((d, i): [Point, Point] => [exitNo(d), entry(diamonds[i + 1])]),
    [exitNo(lastDiamond), fallbackEntry],
  ];

  // «Sí»: de cada rombo a su destino.
  const yesArrows = diamonds.map(([cx, cy], i): [Point, Point] => {
    const box = destinations[i];
    return isRow
      ? [
          [cx, cy + hh],
          [cx, box.y],
        ]
      : [
          [cx + hw, cy],
          [box.x, cy],
        ];
  });

  const arrow = ([from, to]: [Point, Point], key: string) => (
    <line
      key={key}
      className={styles.arrow}
      x1={from[0]}
      y1={from[1]}
      x2={to[0]}
      y2={to[1]}
      markerEnd={`url(#${markerId})`}
    />
  );

  /** Etiqueta junto al punto medio de una flecha. */
  const arrowLabel = ([from, to]: [Point, Point], text: string, key: string) => {
    const vertical = from[0] === to[0];
    const mx = (from[0] + to[0]) / 2;
    const my = (from[1] + to[1]) / 2;
    return (
      <text
        key={key}
        className={styles.arrowLabel}
        x={vertical ? mx + 10 : mx}
        y={vertical ? my : my - 10}
        textAnchor={vertical ? "start" : "middle"}
        dominantBaseline="central"
      >
        {text}
      </text>
    );
  };

  const box = (b: Box, className: string, radius = 8) => (
    <rect className={className} x={b.x} y={b.y} width={b.w} height={b.h} rx={radius} />
  );

  return (
    <svg
      className={`${styles.svg} ${className}`}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path className={styles.arrowHead} d="M0,0 L10,5 L0,10 z" />
        </marker>
      </defs>

      {/* Inicio */}
      {box(start, styles.start, start.h / 2)}
      <Lines
        text={diagram.start}
        cx={centerX(start)}
        cy={centerY(start)}
        className={styles.text}
      />

      {arrow([startExit, entry(diamonds[0])], "inicio")}
      {noArrows.map((pair, i) => arrow(pair, `no-${i}`))}
      {noArrows.map((pair, i) => arrowLabel(pair, diagram.no, `no-label-${i}`))}
      {yesArrows.map((pair, i) => arrow(pair, `si-${i}`))}
      {yesArrows.map((pair, i) => arrowLabel(pair, diagram.yes, `si-label-${i}`))}

      {/* Decisiones y sus destinos */}
      {diagram.decisions.map((decision, i) => {
        const [cx, cy] = diamonds[i];
        const dest = destinations[i];
        return (
          <g key={decision.priority}>
            <polygon
              className={styles.decision}
              points={`${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`}
            />
            <text
              className={styles.priority}
              x={cx}
              y={cy - 28}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {decision.priority}
            </text>
            <Lines
              text={decision.question}
              cx={cx}
              cy={cy + 6}
              lineHeight={17}
              className={styles.text}
            />
            {box(dest, styles.destination)}
            <Lines
              text={decision.destination}
              cx={centerX(dest)}
              cy={centerY(dest)}
              className={styles.text}
            />
          </g>
        );
      })}

      {/* Clasificador LLM y sus salidas */}
      {box(fallback, styles.fallback)}
      <text
        className={styles.fallbackTitle}
        x={centerX(fallback)}
        y={centerY(fallback) - 11}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${diagram.fallback.priority} · ${diagram.fallback.title}`}
      </text>
      <text
        className={styles.code}
        x={centerX(fallback)}
        y={centerY(fallback) + 13}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {diagram.fallback.node}
      </text>

      {arrow(
        [
          [centerX(fallback), fallback.y + fallback.h],
          [centerX(fallback), group.y],
        ],
        "clasificador",
      )}
      {box(group, styles.group, 12)}
      {diagram.fallback.outcomes.map((outcome, i) => (
        <g key={outcome}>
          {box(chips[i], styles.chip, 6)}
          <Lines
            text={outcome}
            cx={centerX(chips[i])}
            cy={centerY(chips[i])}
            className={styles.chipText}
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * Ruteo de entrada del grafo como diagrama de flujo. Se dibuja en dos
 * orientaciones con los mismos datos (fila en escritorio, columna en móvil)
 * para que el texto nunca se reduzca hasta ser ilegible. El SVG es decorativo
 * para la tecnología de asistencia: el contenedor lleva una descripción y las
 * reglas completas están en texto en el desplegable.
 */
export function RoutingDiagram({ content }: { content: RoutingContent }) {
  return (
    <section className={styles.routing} aria-labelledby={TITLE_ID}>
      <div className={styles.head}>
        <h3 id={TITLE_ID} className={styles.title}>
          {content.title}
        </h3>
        <p className={styles.description}>{content.description}</p>
      </div>

      <figure className={styles.figure}>
        <div className={styles.canvas} role="img" aria-label={content.diagram.label}>
          <Flowchart diagram={content.diagram} layout={ROW} className={styles.row} />
          <Flowchart
            diagram={content.diagram}
            layout={COLUMN}
            className={styles.column}
          />
        </div>
        <figcaption className={styles.caption}>
          <code>{content.source}</code>
        </figcaption>
      </figure>

      <details className={styles.details}>
        <summary className={styles.summary}>{content.textToggle}</summary>
        <ol className={styles.rules}>
          {content.rules.map((rule) => (
            <li key={rule.priority}>
              <strong>{rule.priority}.</strong> {rule.condition} → {rule.destination}.
              {rule.detail && ` ${rule.detail}`}
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
