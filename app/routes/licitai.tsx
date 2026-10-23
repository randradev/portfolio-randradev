import { AnalysisSection } from "~/components/case-study/AnalysisSection";
import { ArchitectureSection } from "~/components/case-study/ArchitectureSection";
import { CaseStudyHero } from "~/components/case-study/CaseStudyHero";
import { ClosingSection } from "~/components/case-study/ClosingSection";
import { ContextSection } from "~/components/case-study/ContextSection";
import { DataModelSection } from "~/components/case-study/DataModelSection";
import { DecisionsSection } from "~/components/case-study/DecisionsSection";
import { InterfaceSection } from "~/components/case-study/InterfaceSection";
import { OutcomesSection } from "~/components/case-study/OutcomesSection";
import { PanoramaSection } from "~/components/case-study/PanoramaSection";
import { ScoringSection } from "~/components/case-study/ScoringSection";
import { SecuritySection } from "~/components/case-study/SecuritySection";
import { licitai } from "~/content/case-studies/licitai";
import { buildMeta } from "~/lib/seo";

export function meta() {
  return buildMeta(licitai.meta);
}

/**
 * Caso de estudio de LicitAI. Orden de secciones: LICITAI-CASE-STUDY.md §4.
 * El análisis sigue la composición de la sección RAG de Flux y la fiabilidad
 * reutiliza la sección de seguridad.
 */
export default function LicitaiCaseStudy() {
  return (
    <>
      <CaseStudyHero content={licitai.hero} />
      <ContextSection content={licitai.context} />
      <ArchitectureSection content={licitai.architecture} />
      <DataModelSection content={licitai.dataModel} />
      <AnalysisSection content={licitai.analysis} />
      <ScoringSection content={licitai.scoring} />
      <InterfaceSection content={licitai.interface} />
      <PanoramaSection content={licitai.panorama} />
      <DecisionsSection content={licitai.decisions} />
      <SecuritySection content={licitai.reliability} />
      <OutcomesSection content={licitai.outcomes} />
      <ClosingSection content={licitai.closing} />
    </>
  );
}
