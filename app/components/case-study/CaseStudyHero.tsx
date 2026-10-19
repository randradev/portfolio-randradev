import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { Eyebrow } from "~/components/ui/Eyebrow";
import { TagList } from "~/components/ui/Tag";
import { TextLink } from "~/components/ui/TextLink";
import type { CaseStudyHeroContent } from "~/content/types";

import styles from "./CaseStudyHero.module.css";

const TITLE_ID = "caso-titulo";

/**
 * Cabecera de un caso de estudio: nombre a escala display, propuesta en peso
 * ligero y, debajo, el resumen con los CTA junto a la ficha del proyecto.
 */
export function CaseStudyHero({ content }: { content: CaseStudyHeroContent }) {
  const { title, demoCta } = content;

  return (
    <section className={styles.hero} aria-labelledby={TITLE_ID}>
      <Container className={styles.inner}>
        <div className={styles.head}>
          <TextLink to={content.backLink.to} className={styles.back}>
            <span aria-hidden="true">←</span> {content.backLink.label}
          </TextLink>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 id={TITLE_ID} className={styles.title}>
            <span className={styles.name}>{title.lead}</span>
            <span className="visually-hidden"> — </span>
            <span className={styles.emphasis}>{title.emphasis}</span>
          </h1>
        </div>

        <div className={styles.lead}>
          <p className={styles.summary}>{content.summary}</p>
          <TagList items={content.highlights} label="Tecnologías destacadas" />
          <div className={styles.actions}>
            <ButtonLink to={content.primaryCta.to} size="large">
              {content.primaryCta.label}
            </ButtonLink>
            {demoCta && (
              <ButtonLink to={demoCta.to} variant="secondary" size="large">
                {demoCta.label}
              </ButtonLink>
            )}
          </div>
        </div>

        {/* Ficha técnica: pares etiqueta / valor separados por filetes. */}
        <dl className={styles.facts}>
          {content.facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className={styles.factLabel}>{fact.label}</dt>
              <dd className={styles.factValue}>
                {fact.href ? (
                  <TextLink href={fact.href} inline>
                    {fact.value}
                  </TextLink>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
