import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

import { site } from "~/content/site";

import { Button } from "../ui/Button";
import { ButtonLink } from "../ui/ButtonLink";
import { Container } from "../ui/Container";
import styles from "./SiteHeader.module.css";

const PANEL_ID = "navegacion-principal";

export function SiteHeader() {
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // El menú queda asociado a la ubicación en la que se abrió:
  // cualquier navegación (incluidos los anclas) lo cierra automáticamente.
  const [openAtKey, setOpenAtKey] = useState<string | null>(null);
  const isOpen = openAtKey === location.key;

  // Transparente sobre el inicio de la página; superficie de cristal al desplazarse.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Sección que cruza el centro de la pantalla: su enlace se marca como actual.
  const [activeId, setActiveId] = useState<string | null>(null);
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenAtKey(null);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className={styles.header} data-scrolled={scrolled || isOpen}>
      <Container className={styles.inner}>
        <Link to="/" className={styles.wordmark}>
          {site.name}
        </Link>

        <Button
          ref={toggleRef}
          variant="secondary"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls={PANEL_ID}
          onClick={() => setOpenAtKey(isOpen ? null : location.key)}
        >
          <span className={styles.toggleIcon} aria-hidden="true" />
          {isOpen ? "Cerrar" : "Menú"}
        </Button>

        <nav
          id={PANEL_ID}
          aria-label="Principal"
          className={styles.panel}
          data-open={isOpen}
        >
          <ul className={styles.list}>
            {site.nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={styles.navLink}
                  aria-current={
                    isHome && item.to === `/#${activeId}` ? "location" : undefined
                  }
                  onClick={() => setOpenAtKey(null)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ButtonLink
            to={site.navCta.to}
            variant="secondary"
            onClick={() => setOpenAtKey(null)}
          >
            {site.navCta.label}
          </ButtonLink>
        </nav>
      </Container>
    </header>
  );
}
