import { Fragment } from "react";

import type { DataEntity, DataField, DataModelContent } from "~/content/types";

import { Section } from "../home/Section";
import styles from "./DataModelSection.module.css";
import routing from "./RoutingDiagram.module.css";
import shared from "./shared.module.css";

type EntityId = DataEntity["id"];
type Box = { x: number; y: number; w: number; h: number };

/** Medidas de una tabla, en unidades del viewBox. */
const HEADER = 56;
const ROW = 22;
const PADDING = 14;
const INSET = 14;

const entityHeight = (entity: DataEntity) =>
  HEADER + PADDING + entity.fields.length * ROW;

/** Centro vertical de la fila `index` de una tabla. */
const rowY = (box: Box, index: number) => box.y + HEADER + 4 + index * ROW + ROW / 2;

/**
 * Geometría de una orientación. `row`: tablas independientes a la izquierda,
 * la tabla central y, a la derecha, las tablas que dependen de ella.
 * `column`: la tabla central y sus dependientes arriba; las independientes al final.
 */
type Layout = {
  orientation: "row" | "column";
  width: number;
  height: number;
  boxes: Record<EntityId, Box>;
  /** Abscisa del tramo vertical de las relaciones. */
  elbowX: number;
};

function stack(
  ids: EntityId[],
  heights: Record<EntityId, number>,
  x: number,
  w: number,
  y0: number,
  gap: number,
) {
  const boxes: Partial<Record<EntityId, Box>> = {};
  let y = y0;
  for (const id of ids) {
    boxes[id] = { x, y, w, h: heights[id] };
    y += heights[id] + gap;
  }
  return { boxes, bottom: y - gap };
}

function buildLayouts(entities: DataEntity[]): { row: Layout; column: Layout } {
  const heights = Object.fromEntries(
    entities.map((entity) => [entity.id, entityHeight(entity)]),
  ) as Record<EntityId, number>;

  const left = stack(["perfil", "ejecuciones"], heights, 0, 320, 0, 48);
  const center = stack(["licitaciones"], heights, 400, 400, 0, 0);
  const right = stack(["historial", "fallidas"], heights, 880, 320, 0, 48);
  const row: Layout = {
    orientation: "row",
    width: 1200,
    height: Math.max(left.bottom, center.bottom, right.bottom) + 2,
    boxes: { ...left.boxes, ...center.boxes, ...right.boxes } as Record<EntityId, Box>,
    elbowX: 840,
  };

  const col = stack(
    ["licitaciones", "historial", "fallidas", "perfil", "ejecuciones"],
    heights,
    28,
    330,
    0,
    36,
  );
  const column: Layout = {
    orientation: "column",
    width: 360,
    height: col.bottom + 2,
    boxes: col.boxes as Record<EntityId, Box>,
    elbowX: 12,
  };

  return { row, column };
}

function Field({ field, box, index }: { field: DataField; box: Box; index: number }) {
  const y = rowY(box, index);
  const x = box.x + INSET;

  if (field.kind === "group") {
    return (
      <text className={styles.group} x={x} y={y + 3} dominantBaseline="central">
        {field.text}
      </text>
    );
  }

  return (
    <text
      className={field.kind === "ref" ? styles.ref : styles.field}
      x={x}
      y={y}
      dominantBaseline="central"
    >
      {field.kind === "pk" && <tspan className={styles.pk}>PK </tspan>}
      {field.text}
    </text>
  );
}

function Diagram({
  content,
  layout,
  className,
}: {
  content: DataModelContent;
  layout: Layout;
  className: string;
}) {
  const isRow = layout.orientation === "row";

  return (
    <svg
      className={`${routing.svg} ${className}`}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      aria-hidden="true"
      focusable="false"
    >
      {/* Relaciones: de la clave primaria de origen a la columna que la referencia. */}
      {content.relations.map((relation) => {
        const from = layout.boxes[relation.from];
        const to = layout.boxes[relation.to];
        const target = content.entities.find((entity) => entity.id === relation.to);
        const refIndex = Math.max(
          0,
          target?.fields.findIndex((field) => field.kind === "ref") ?? 0,
        );
        const y1 = rowY(from, 0);
        const y2 = rowY(to, refIndex);
        const x1 = isRow ? from.x + from.w : from.x;
        const x2 = to.x;
        const [one, many] = relation.cardinality.split(":");
        const labelX = isRow ? [x1 + 10, x2 - 10] : [x1 - 8, x2 - 8];

        return (
          <g key={`${relation.from}-${relation.to}`}>
            <path
              className={styles.relation}
              data-logical={relation.logical || undefined}
              d={`M${x1},${y1} H${layout.elbowX} V${y2} H${x2}`}
            />
            <text
              className={styles.cardinality}
              x={labelX[0]}
              y={y1 - 9}
              textAnchor="middle"
            >
              {one}
            </text>
            <text
              className={styles.cardinality}
              x={labelX[1]}
              y={y2 - 9}
              textAnchor="middle"
            >
              {many}
            </text>
          </g>
        );
      })}

      {content.entities.map((entity) => {
        const box = layout.boxes[entity.id];
        return (
          <g key={entity.id}>
            <rect
              className={entity.id === "licitaciones" ? styles.central : styles.table}
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              rx={8}
            />
            <line
              className={styles.divider}
              x1={box.x}
              x2={box.x + box.w}
              y1={box.y + HEADER}
              y2={box.y + HEADER}
            />
            <text className={styles.name} x={box.x + INSET} y={box.y + 22}>
              {entity.name}
            </text>
            <text className={styles.role} x={box.x + INSET} y={box.y + 42}>
              {entity.role}
            </text>
            {entity.fields.map((field, index) => (
              <Field key={field.text} field={field} box={box} index={index} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Modelo de datos SQLite como diagrama entidad-relación, derivado del esquema
 * de `core/database_mgr.py`. Se dibuja en dos orientaciones con los mismos
 * datos para que el texto no se reduzca hasta ser ilegible. El SVG es
 * decorativo para la tecnología de asistencia: el contenedor lleva una
 * descripción y el modelo completo está en texto en el desplegable.
 */
export function DataModelSection({ content }: { content: DataModelContent }) {
  const { row, column } = buildLayouts(content.entities);
  const notesId = `${content.id}-notas`;

  return (
    <Section intro={content} layout="stack">
      <figure className={routing.figure}>
        <div className={routing.canvas} role="img" aria-label={content.label}>
          <Diagram content={content} layout={row} className={routing.row} />
          <Diagram content={content} layout={column} className={routing.column} />
        </div>
        <ul className={styles.legend} aria-label="Leyenda">
          <li>
            <span className={styles.legendPk} aria-hidden="true">
              PK
            </span>
            {content.legend.pk}
          </li>
          <li>
            <span className={styles.legendRef} aria-hidden="true" />
            {content.legend.ref}
          </li>
          <li>
            <span className={styles.legendLine} aria-hidden="true" />
            {content.legend.logical}
          </li>
        </ul>
        <figcaption className={routing.caption}>{content.caption}</figcaption>
      </figure>

      <details className={`${routing.details} ${styles.details}`}>
        <summary className={routing.summary}>{content.textToggle}</summary>
        <dl className={styles.textModel}>
          {content.entities.map((entity) => (
            <Fragment key={entity.id}>
              <dt>
                <code>{entity.name}</code> — {entity.role}
              </dt>
              <dd>
                {entity.fields
                  .filter((field) => field.kind !== "group")
                  .map((field) => (field.kind === "pk" ? `PK ${field.text}` : field.text))
                  .join(" · ")}
              </dd>
            </Fragment>
          ))}
        </dl>
        <ul className={styles.textRelations}>
          {content.relations.map((relation) => (
            <li key={`${relation.from}-${relation.to}`}>{relation.label}</li>
          ))}
        </ul>
      </details>

      <aside
        className={`${shared.dashedPanel} ${styles.notes}`}
        aria-labelledby={notesId}
      >
        <h3 id={notesId} className={shared.label}>
          {content.notes.title}
        </h3>
        <ul className={shared.bulletList}>
          {content.notes.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
    </Section>
  );
}
