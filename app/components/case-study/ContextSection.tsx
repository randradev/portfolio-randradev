import type { CaseStudyContextContent } from "~/content/types";

import { Section } from "../home/Section";
import { PointList } from "./PointList";

/** Problema del caso y responsabilidades que el sistema debía separar. */
export function ContextSection({ content }: { content: CaseStudyContextContent }) {
  return (
    <Section intro={content} align="start">
      <PointList points={content.points} label="Responsabilidades separadas" />
    </Section>
  );
}
