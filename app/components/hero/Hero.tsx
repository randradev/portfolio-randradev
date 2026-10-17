import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { Eyebrow } from "~/components/ui/Eyebrow";
import { hero } from "~/content/home";

import styles from "./Hero.module.css";
import { HeroVisual } from "./HeroVisual";

const SECTION_ID = "inicio";
const TITLE_ID = "hero-titulo";

/**
 * Hero de la página principal: titular a escala display que se solapa con el
 * objeto y, anclados abajo, el resumen y los CTA. El texto no depende del 3D.
 */
export function Hero() {
  return (
    <section id={SECTION_ID} className={styles.hero} aria-labelledby={TITLE_ID}>
      <Container className={styles.inner}>
        <div className={styles.head}>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 id={TITLE_ID} className={styles.title}>
            <span className={styles.line}>{hero.title.lead}</span>{" "}
            <span className={`${styles.line} ${styles.emphasis}`}>
              {hero.title.emphasis}
            </span>
          </h1>
        </div>

        <div className={styles.foot}>
          <p className={styles.summary}>{hero.summary}</p>
          <div className={styles.actions}>
            <ButtonLink to={hero.primaryCta.to} size="large">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink to={hero.secondaryCta.to} variant="secondary" size="large">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <p className={styles.note}>{hero.note}</p>
        </div>

        <HeroVisual className={styles.visual} />
      </Container>
    </section>
  );
}
