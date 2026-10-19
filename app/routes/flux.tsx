import { ArchitectureSection } from "~/components/case-study/ArchitectureSection";
import { CaseStudyHero } from "~/components/case-study/CaseStudyHero";
import { ClosingSection } from "~/components/case-study/ClosingSection";
import { ContextSection } from "~/components/case-study/ContextSection";
import { DecisionsSection } from "~/components/case-study/DecisionsSection";
import { OutcomesSection } from "~/components/case-study/OutcomesSection";
import { ProductFlowSection } from "~/components/case-study/ProductFlowSection";
import { RagSection } from "~/components/case-study/RagSection";
import { SecuritySection } from "~/components/case-study/SecuritySection";
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
      <RagSection content={flux.rag} />
      <ProductFlowSection content={flux.credit} />
      <ProductFlowSection content={flux.deposit} tone="deep" />
      <SecuritySection content={flux.security} />
      <DecisionsSection content={flux.decisions} />
      <OutcomesSection content={flux.outcomes} />
      <ClosingSection content={flux.closing} />
    </>
  );
}
