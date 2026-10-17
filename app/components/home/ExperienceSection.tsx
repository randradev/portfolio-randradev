import { experienceIntro } from "~/content/home";
import { experience } from "~/content/profile";
import { site } from "~/content/site";

import { ButtonLink } from "../ui/ButtonLink";
import { Section } from "./Section";
import { Timeline } from "./Timeline";

export function ExperienceSection() {
  return (
    <Section
      intro={experienceIntro}
      actions={
        site.cvHref && (
          <ButtonLink href={site.cvHref} variant="secondary">
            {experienceIntro.cvCtaLabel}
          </ButtonLink>
        )
      }
    >
      <Timeline
        entries={experience.map((item) => ({
          key: item.organization,
          period: item.period,
          title: item.organization,
          subtitle: item.role,
          description: item.description,
        }))}
      />
    </Section>
  );
}
