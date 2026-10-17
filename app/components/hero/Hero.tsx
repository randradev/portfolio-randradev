import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { hero } from "~/content/home";
import { site } from "~/content/site";

import styles from "./Hero.module.css";
import { HeroVisual } from "./HeroVisual";

const TITLE_ID = "hero-titulo";

/** Hero de la página principal: el texto y los CTA no dependen del 3D. */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby={TITLE_ID}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{site.name}</p>
          <h1 id={TITLE_ID} className={styles.title}>
            {hero.title.lead}{" "}
            <span className={styles.emphasis}>{hero.title.emphasis}</span>
          </h1>
          <p className={styles.summary}>{hero.summary}</p>
          <div className={styles.actions}>
            <ButtonLink to={hero.primaryCta.to} size="large">
              {hero.primaryCta.label}
            </ButtonLink>
            {site.cvHref ? (
              <ButtonLink href={site.cvHref} variant="secondary" size="large">
                {site.cvLabel}
              </ButtonLink>
            ) : (
              <ButtonLink to={hero.contactCta.to} variant="secondary" size="large">
                {hero.contactCta.label}
              </ButtonLink>
            )}
          </div>
        </div>

        <HeroVisual className={styles.visual} />
      </Container>
    </section>
  );
}
