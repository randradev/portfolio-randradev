import { type CSSProperties, Fragment } from "react";

import type { ProductFlowContent } from "~/content/types";

import { Card } from "../ui/Card";
import { Section } from "../home/Section";
import { EvidenceFigure } from "./EvidenceFigure";
import styles from "./ProductFlowSection.module.css";
import shared from "./shared.module.css";

type ProductFlowSectionProps = {
  content: ProductFlowContent;
  tone?: "base" | "deep";
};

/** Permite partir nombres de nodo largos solo tras un guion bajo. */
function breakAfterUnderscores(name: string) {
  return name.split("_").map((part, index, all) => (
    <Fragment key={index}>
      {part}
      {index < all.length - 1 && (
        <>
          _<wbr />
        </>
      )}
    </Fragment>
  ));
}

/**
 * Flujo de un producto financiero: etapas del grafo en orden, salidas
 * alternativas, reglas del motor y la grabación del recorrido completo.
 * El diagrama es una lista ordenada; nodos y riel son decorativos.
 */
export function ProductFlowSection({ content, tone = "base" }: ProductFlowSectionProps) {
  const { id, stages, legend, exits, engine } = content;
  const exitsId = `${id}-salidas`;

  return (
    <Section intro={content} layout="stack" tone={tone}>
      <div className={styles.flow}>
        <ol
          className={styles.stages}
          style={{ "--stage-count": stages.length } as CSSProperties}
          aria-label={`Etapas del flujo de ${content.eyebrow.toLowerCase()}`}
        >
          {stages.map((stage) => (
            <li
              key={stage.node}
              className={styles.stage}
              data-automatic={stage.automatic || undefined}
            >
              <span className={styles.node} aria-hidden="true" />
              <h3 className={styles.stageName}>{stage.name}</h3>
              <code className={styles.stageNode}>
                {breakAfterUnderscores(stage.node)}
              </code>
              <p className={styles.stageDescription}>{stage.description}</p>
              {stage.automatic && (
                <span className="visually-hidden">({legend.automatic})</span>
              )}
            </li>
          ))}
        </ol>

        <ul className={styles.legend} aria-label="Leyenda">
          <li>
            <span className={styles.legendNode} aria-hidden="true" />
            {legend.conversational}
          </li>
          <li data-automatic>
            <span className={styles.legendNode} aria-hidden="true" />
            {legend.automatic}
          </li>
        </ul>
      </div>

      <section className={styles.exits} aria-labelledby={exitsId}>
        <h3 id={exitsId} className={shared.label}>
          {exits.title}
        </h3>
        <ul className={styles.exitList}>
          {exits.items.map((exit) => (
            <li key={exit.name} className={styles.exit}>
              <span className={styles.exitName}>{exit.name}</span>
              <span className={styles.exitTrigger}>{exit.trigger}</span>
              {exit.node && <code className={styles.exitNode}>{exit.node}</code>}
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.detail}>
        <Card as="div">
          <div className={styles.engineHead}>
            <h3 className={shared.label}>{engine.title}</h3>
            <code className={styles.engineModule}>{engine.module}</code>
          </div>
          <dl className={styles.rules}>
            {engine.rules.map((rule) => (
              <div key={rule.label} className={styles.rule}>
                <dt className={styles.ruleLabel}>{rule.label}</dt>
                <dd>{rule.value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.engineNote}>{engine.note}</p>
        </Card>

        <EvidenceFigure media={content.demo} className={styles.demo} />
      </div>
    </Section>
  );
}
