import { ArchitectureSection } from "~/components/case-study/ArchitectureSection";
import { CaseStudyHero } from "~/components/case-study/CaseStudyHero";
import { ContextSection } from "~/components/case-study/ContextSection";
import { flux } from "~/content/case-studies/flux";
import { buildMeta } from "~/lib/seo";

export function meta() {
  return buildMeta(flux.meta);
}

/** Caso de estudio de Flux. Orden de secciones: FLUX-CASE-STUDY.md §4. */
export default function FluxCaseStudy() {
  return (
    <>
      <CaseStudyHero content={flux.hero} />
      <ContextSection content={flux.context} />
      <ArchitectureSection content={flux.architecture} />
    </>
  );
}
