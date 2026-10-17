import type { ReactNode } from "react";

import type { ApproachArea } from "~/content/types";

/**
 * Iconos de línea propios (rejilla de 24px, trazo de 1.5px, sin relleno) para
 * no introducir una librería cuyo estilo se reconocería como genérico.
 * Decorativos: el título del área ya comunica su significado.
 */
const PATHS: Record<ApproachArea["icon"], ReactNode> = {
  // Interfaces: ventana con barra y bloques de contenido.
  interfaces: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9h18" />
      <path d="M6.5 12.5h4v4h-4z" />
      <path d="M13.5 13h4M13.5 16h2.5" />
    </>
  ),
  // Sistemas: nodo central que integra cuatro servicios.
  systems: (
    <>
      <rect x="9.25" y="9.25" width="5.5" height="5.5" rx="1" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M6.5 6.5l2.75 2.75M17.5 6.5l-2.75 2.75M6.5 17.5l2.75-2.75M17.5 17.5l-2.75-2.75" />
    </>
  ),
  // IA aplicada: destello principal y uno secundario.
  ai: (
    <>
      <path d="M11 4c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5z" />
      <path d="M18 15.5v5M15.5 18h5" />
    </>
  ),
};

export function CapabilityIcon({
  icon,
  className,
}: {
  icon: ApproachArea["icon"];
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[icon]}
    </svg>
  );
}
