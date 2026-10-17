import type { ComponentProps } from "react";

import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "default" | "large";

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "default",
  className?: string,
) {
  return [styles.button, styles[variant], size === "large" && styles.large, className]
    .filter(Boolean)
    .join(" ");
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** Botón para ejecutar acciones. Para navegar, usar ButtonLink. */
export function Button({
  variant,
  size,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClassName(variant, size, className)} {...rest} />
  );
}
