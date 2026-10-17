import { Link } from "react-router";

import { footer } from "~/content/home";
import { site } from "~/content/site";

import { Container } from "../ui/Container";
import { TextLink } from "../ui/TextLink";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.identity}>
          <Link to="/" className={styles.wordmark}>
            {site.name}
          </Link>
          <p className={styles.descriptor}>{footer.descriptor}</p>
        </div>

        <nav aria-label="Secundaria">
          <ul className={styles.list}>
            {site.nav.map((item) => (
              <li key={item.to}>
                <TextLink to={item.to} className={styles.link}>
                  {item.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={styles.list} aria-label="Perfiles y CV">
          {site.contact.profiles.map((profile) => (
            <li key={profile.href}>
              <TextLink href={profile.href} className={styles.link}>
                {profile.label}
              </TextLink>
            </li>
          ))}
          {site.cvHref && (
            <li>
              <TextLink href={site.cvHref} className={styles.link}>
                {footer.cvLabel}
              </TextLink>
            </li>
          )}
        </ul>

        <p className={styles.credit}>{footer.credit}</p>
      </Container>
    </footer>
  );
}
