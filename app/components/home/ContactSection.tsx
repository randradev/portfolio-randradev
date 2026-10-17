import { contact } from "~/content/home";
import { site } from "~/content/site";

import { ButtonLink } from "../ui/ButtonLink";
import { TextLink } from "../ui/TextLink";
import styles from "./ContactSection.module.css";
import { Section } from "./Section";

export function ContactSection() {
  const { email, profiles } = site.contact;

  return (
    <Section
      intro={contact}
      layout="panel"
      tone="horizon"
      scale="xl"
      actions={
        <>
          <ButtonLink href={`mailto:${email}`} size="large">
            {contact.primaryCtaLabel}
          </ButtonLink>
          {site.cvHref && (
            <ButtonLink href={site.cvHref} variant="secondary" size="large">
              {contact.cvCtaLabel}
            </ButtonLink>
          )}
        </>
      }
    >
      <div className={styles.details}>
        <p className={styles.note}>{contact.note}</p>
        <ul className={styles.channels} aria-label="Canales de contacto">
          <li>
            <TextLink href={`mailto:${email}`}>{email}</TextLink>
          </li>
          {profiles.map((profile) => (
            <li key={profile.href}>
              <TextLink href={profile.href}>{profile.label}</TextLink>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
