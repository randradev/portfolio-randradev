import type { ReactNode } from "react";

import styles from "./Tag.module.css";

/** Etiqueta técnica (stack, metadatos breves). */
export function Tag({ children }: { children: ReactNode }) {
  return <span className={styles.tag}>{children}</span>;
}

/** Lista semántica de etiquetas. */
export function TagList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className={styles.list} aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
