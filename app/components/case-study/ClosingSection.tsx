import type { CaseStudyClosingContent } from "~/content/types";

import { ButtonLink } from "../ui/ButtonLink";
import { Section } from "../home/Section";

/** Cierre del caso: panel de cristal sobre la luz de horizonte, como el contacto de Home. */
export function ClosingSection({ content }: { content: CaseStudyClosingContent }) {
  return (
    <Section
      intro={content}
      layout="panel"
      tone="horizon"
      actions={
        <>
          <ButtonLink to={content.primaryCta.to} size="large">
            {content.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={content.secondaryLink.href} variant="secondary" size="large">
            {content.secondaryLink.label}
          </ButtonLink>
        </>
      }
    />
  );
}
