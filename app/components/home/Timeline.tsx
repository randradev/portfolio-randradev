import styles from "./Timeline.module.css";

export type TimelineEntry = {
  key: string;
  period: string;
  title: string;
  subtitle: string;
  description?: string;
  /** Etapa vigente: nodo activo. El periodo ya lo indica en texto. */
  current?: boolean;
};

/** Línea de tiempo vertical (más reciente primero): raíl fino con un nodo por etapa. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className={styles.list}>
      {entries.map((entry) => (
        <li
          key={entry.key}
          className={styles.item}
          data-current={entry.current || undefined}
        >
          <p className={styles.period}>{entry.period}</p>
          <h3 className={styles.title}>{entry.title}</h3>
          <p className={styles.subtitle}>{entry.subtitle}</p>
          {entry.description && <p className={styles.description}>{entry.description}</p>}
        </li>
      ))}
    </ol>
  );
}
