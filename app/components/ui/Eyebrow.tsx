import type { ReactNode } from "react";

import styles from "./Eyebrow.module.css";

/** Antetítulo técnico breve sobre un encabezado (hero y secciones). */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={styles.eyebrow}>{children}</p>;
}
