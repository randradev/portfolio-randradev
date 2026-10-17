import { AppLink, type AppLinkProps } from "./AppLink";
import { buttonClassName, type ButtonSize, type ButtonVariant } from "./Button";

type ButtonLinkProps = AppLinkProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** Enlace de navegación con apariencia de botón (CTA). */
export function ButtonLink({ variant, size, className, ...rest }: ButtonLinkProps) {
  return <AppLink className={buttonClassName(variant, size, className)} {...rest} />;
}
