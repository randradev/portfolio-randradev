import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

type BaseProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
};

/** Ruta interna del sitio: navegación del cliente con React Router. */
type InternalProps = BaseProps & { to: string; href?: never };

/** URL externa o archivo estático (p. ej. el PDF del CV): `<a>` nativo. */
type ExternalProps = BaseProps & { href: string; to?: never };

export type AppLinkProps = InternalProps | ExternalProps;

/**
 * Primitivo de enlace compartido por ButtonLink y TextLink.
 * Los enlaces externos (http/https) se abren en otra pestaña con `rel` seguro.
 */
export function AppLink(props: AppLinkProps) {
  if (props.to !== undefined) {
    const { to, ...rest } = props;
    return <Link to={to} {...rest} />;
  }

  const { href, children, ...rest } = props;
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      {...rest}
    >
      {children}
      {isExternal && <span className="visually-hidden"> (se abre en otra pestaña)</span>}
    </a>
  );
}
