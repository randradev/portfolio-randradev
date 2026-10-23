import type { CSSProperties } from "react";

import type { ScoringContent } from "~/content/types";

import { Card } from "../ui/Card";
import { Section } from "../home/Section";
import styles from "./ScoringSection.module.css";
import shared from "./shared.module.css";

/**
 * Modelo de scoring: qué aporta el modelo y qué calcula el código, los
 * criterios con su peso, la fórmula y los estados del resultado en orden de
 * prevalencia. Las barras de peso son decorativas: el peso está en el texto.
 */
export function ScoringSection({ content }: { content: ScoringContent }) {
  const { id, criteria, formula, states } = content;
  const criteriaId = `${id}-criterios`;
  const statesId = `${id}-estados`;

  return (
    <Section intro={content} layout="stack" tone="grid">
      <div className={styles.split}>
        {content.split.map((block, index) => (
          <section
            key={block.title}
            className={styles.side}
            data-side={index === 0 ? "ai" : "code"}
            aria-labelledby={`${id}-lado-${index}`}
          >
            <h3 id={`${id}-lado-${index}`} className={styles.sideTitle}>
              {block.title}
            </h3>
            <ul className={shared.bulletList}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className={styles.criteria} aria-labelledby={criteriaId}>
        <div className={styles.blockHead}>
          <h3 id={criteriaId} className={shared.label}>
            {criteria.title}
          </h3>
          <code className={styles.source}>{criteria.source}</code>
        </div>
        <ol className={styles.criteriaList}>
          {criteria.items.map((criterion) => (
            <li
              key={criterion.key}
              className={styles.criterion}
              style={{ "--weight": `${criterion.weight}%` } as CSSProperties}
            >
              <div className={styles.criterionHead}>
                <h4 className={styles.criterionName}>{criterion.name}</h4>
                <span className={styles.weight}>
                  <span className="visually-hidden">{criteria.labels.weight}: </span>
                  {criterion.weight}
                </span>
              </div>
              <span className={styles.bar} aria-hidden="true" />
              <p className={styles.criterionDescription}>{criterion.description}</p>
              <div className={styles.tags}>
                <code>{criterion.key}</code>
                {criterion.blocking && (
                  <span className={styles.flag}>{criteria.labels.blocking}</span>
                )}
                {criterion.essential && !criterion.blocking && (
                  <span className={styles.flag}>{criteria.labels.essential}</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className={styles.detail}>
        <Card as="div">
          <h3 className={shared.label}>{formula.title}</h3>
          <dl className={styles.rules}>
            {formula.rules.map((rule) => (
              <div key={rule.label} className={styles.rule}>
                <dt className={styles.ruleLabel}>{rule.label}</dt>
                <dd>{rule.value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.note}>{formula.note}</p>
        </Card>

        <section className={styles.states} aria-labelledby={statesId}>
          <div className={styles.blockHead}>
            <h3 id={statesId} className={shared.label}>
              {states.title}
            </h3>
            <code className={styles.source}>{states.source}</code>
          </div>
          <ol className={styles.stateList}>
            {states.items.map((state) => (
              <li key={state.key} className={styles.state}>
                <span className={styles.stateName}>{state.label}</span>
                <span className={styles.stateCondition}>{state.condition}</span>
                <span className={styles.stateScore}>{state.score}</span>
                <code className={styles.stateKey}>{state.key}</code>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </Section>
  );
}
