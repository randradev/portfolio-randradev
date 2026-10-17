import { about } from "~/content/home";

import { ButtonLink } from "../ui/ButtonLink";
import { Section } from "./Section";

export function AboutSection() {
  return (
    <Section
      intro={about}
      align="start"
      scale="xl"
      actions={
        <ButtonLink to={about.cta.to} variant="secondary">
          {about.cta.label}
        </ButtonLink>
      }
    />
  );
}
