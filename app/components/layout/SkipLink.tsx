import styles from "./SkipLink.module.css";

export const MAIN_CONTENT_ID = "contenido";

/** Primer elemento enfocable: permite saltar la navegación con teclado. */
export function SkipLink() {
  return (
    <a className={styles.skipLink} href={`#${MAIN_CONTENT_ID}`}>
      Saltar al contenido
    </a>
  );
}
