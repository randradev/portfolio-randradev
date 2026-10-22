import { ArchitectureSection } from "~/components/case-study/ArchitectureSection";
import { CaseStudyHero } from "~/components/case-study/CaseStudyHero";
import { ClosingSection } from "~/components/case-study/ClosingSection";
import { ContextSection } from "~/components/case-study/ContextSection";
import { DataModelSection } from "~/components/case-study/DataModelSection";
import { DecisionsSection } from "~/components/case-study/DecisionsSection";
import { InterfaceSection } from "~/components/case-study/InterfaceSection";
import { OutcomesSection } from "~/components/case-study/OutcomesSection";
import { RagSection } from "~/components/case-study/RagSection";
import { ScoringSection } from "~/components/case-study/ScoringSection";
import { SecuritySection } from "~/components/case-study/SecuritySection";
import { licitai } from "~/content/case-studies/licitai";
import { buildMeta } from "~/lib/seo";

export function meta() {
  return buildMeta(licitai.meta);
}

/**
 * Caso de estudio de LicitAI. Orden de secciones: LICITAI-CASE-STUDY.md §4.
 * El análisis y la fiabilidad reutilizan la composición de las secciones RAG y
 * de seguridad de Flux.
 */
export default function LicitaiCaseStudy() {
  return (
    <>
      <CaseStudyHero content={licitai.hero} />
      <ContextSection content={licitai.context} />
      <ArchitectureSection content={licitai.architecture} />
      <DataModelSection content={licitai.dataModel} />
      <RagSection content={licitai.analysis} />
      <ScoringSection content={licitai.scoring} />
      <InterfaceSection content={licitai.interface} />
      <DecisionsSection content={licitai.decisions} />
      <SecuritySection content={licitai.reliability} />
      <OutcomesSection content={licitai.outcomes} />
      <ClosingSection content={licitai.closing} />
    </>
  );
}
