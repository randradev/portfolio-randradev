import { Hero } from "~/components/hero/Hero";
import { buildMeta } from "~/lib/seo";

export function meta() {
  return buildMeta();
}

/** Página principal. Las secciones de proyectos, experiencia, etc. llegan en la Fase 3. */
export default function Home() {
  return <Hero />;
}
