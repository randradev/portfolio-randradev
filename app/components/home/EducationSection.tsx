import { educationIntro } from "~/content/home";
import { education } from "~/content/profile";

import { Section } from "./Section";
import { Timeline } from "./Timeline";

export function EducationSection() {
  return (
    <Section intro={educationIntro}>
      <Timeline
        entries={education.map((item) => ({
          key: item.title,
          period: item.period,
          title: item.title,
          subtitle: item.institution,
        }))}
      />
    </Section>
  );
}
