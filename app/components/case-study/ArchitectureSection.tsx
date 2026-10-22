import type { ArchitectureContent } from "~/content/types";

import { Section } from "../home/Section";
import styles from "./ArchitectureSection.module.css";
import { RoutingDiagram } from "./RoutingDiagram";
import shared from "./shared.module.css";

const CAPTION_ID = "arquitectura-fuente";
const SERVICES_ID = "arquitectura-servicios";

const pad = (index: number) => String(index + 1).padStart(2, "0");

/**
 * Diagrama de arquitectura por responsabilidades. Es HTML semántico (listas
 * ordenadas), no una imagen: se lee igual con lector de pantalla y se reorganiza
 * en móvil. Las líneas y nodos son decorativos.
 */
export function ArchitectureSection({ content }: { content: ArchitectureContent }) {
  return (
    <Section intro={content} layout="stack" tone="grid">
      <figure className={styles.figure} aria-labelledby={CAPTION_ID}>
        <ol
          className={styles.layers}
          aria-label="Capas del sistema, desde la entrada del usuario"
        >
          {content.layers.map((layer, index) => (
            <li key={layer.name} className={styles.layer} data-kind={layer.kind}>
              <span className={styles.node} aria-hidden="true" />
              <div className={styles.layerHead}>
                <span className={`${shared.index} ${styles.index}`} aria-hidden="true">
                  {pad(index)}
                </span>
                <h3 className={styles.layerName}>{layer.name}</h3>
              </div>
              <p className={styles.layerDescription}>{layer.description}</p>
              <ul className={styles.modules} aria-label={`Código de ${layer.name}`}>
                {layer.modules.map((module) => (
                  <li key={module}>
                    <code>{module}</code>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <section
          className={`${shared.dashedPanel} ${styles.services}`}
          aria-labelledby={SERVICES_ID}
        >
          <h3 id={SERVICES_ID} className={shared.label}>
            {content.services.title}
          </h3>
          <dl className={styles.serviceList}>
            {content.services.items.map((service) => (
              <div key={service.title} className={styles.service}>
                <dt className={styles.serviceName}>{service.title}</dt>
                <dd className={styles.serviceDescription}>{service.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <figcaption id={CAPTION_ID} className={styles.caption}>
          {content.caption}
        </figcaption>
      </figure>

      {content.routing && <RoutingDiagram content={content.routing} />}

      <div className={styles.turn}>
        <h3 className={styles.turnTitle}>{content.turn.title}</h3>
        <ol className={styles.steps}>
          {content.turn.steps.map((step, index) => (
            <li key={step} className={styles.step}>
              <span className={styles.stepIndex} aria-hidden="true">
                {pad(index)}
              </span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
