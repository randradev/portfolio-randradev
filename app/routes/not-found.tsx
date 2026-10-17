import { Container } from "~/components/ui/Container";
import { TextLink } from "~/components/ui/TextLink";
import { buildMeta } from "~/lib/seo";

import styles from "./not-found.module.css";

export function meta() {
  return [
    ...buildMeta({
      title: "Página no encontrada",
      description: "La página solicitada no existe.",
    }),
    { name: "robots", content: "noindex" },
  ];
}

export default function NotFound() {
  return (
    <Container as="section" className={styles.page}>
      <h1>Página no encontrada</h1>
      <p className={styles.text}>La dirección que has abierto no existe o ha cambiado.</p>
      <TextLink to="/">Volver al inicio</TextLink>
    </Container>
  );
}
