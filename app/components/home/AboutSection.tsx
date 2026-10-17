import { about } from "~/content/home";

import { ButtonLink } from "../ui/ButtonLink";
import styles from "./AboutSection.module.css";
import { Section } from "./Section";

export function AboutSection() {
  return (
    <Section
      intro={about}
      layout="media"
      scale="xl"
      titleBySentence
      media={
        <div className={styles.photo}>
          <img
            className={styles.image}
            src={about.photo.src}
            alt={about.photo.alt}
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
          />
        </div>
      }
      actions={
        <ButtonLink to={about.cta.to} variant="secondary">
          {about.cta.label}
        </ButtonLink>
      }
    />
  );
}
