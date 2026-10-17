import { AppLink, type AppLinkProps } from "./AppLink";
import styles from "./TextLink.module.css";

type TextLinkProps = AppLinkProps & {
  /** Para enlaces dentro de un párrafo. */
  inline?: boolean;
};

/** Enlace de texto subrayado: identificable sin depender solo del color. */
export function TextLink({ inline = false, className, ...rest }: TextLinkProps) {
  const classes = [styles.link, inline && styles.inline, className]
    .filter(Boolean)
    .join(" ");
  return <AppLink className={classes} {...rest} />;
}
