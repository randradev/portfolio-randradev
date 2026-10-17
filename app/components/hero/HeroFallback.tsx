import { useId } from "react";

/**
 * Composición estática del objeto del hero (anillo metálico entrelazado con un
 * cristal facetado). Se usa sin WebGL, durante la carga o si la escena falla.
 */
export function HeroFallback({ className }: { className?: string }) {
  const id = useId();
  const ringId = `${id}-anillo`;
  const glassId = `${id}-cristal`;

  return (
    <svg className={className} viewBox="0 0 400 400" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id={ringId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--color-text)" }} />
          <stop offset="0.45" style={{ stopColor: "var(--color-primary)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-accent)" }} />
        </linearGradient>
        <linearGradient id={glassId} x1="0" y1="0" x2="1" y2="1">
          <stop
            offset="0"
            style={{ stopColor: "var(--color-primary)", stopOpacity: 0.28 }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--color-accent)", stopOpacity: 0.14 }}
          />
        </linearGradient>
      </defs>

      <g transform="rotate(-24 200 200)" fill="none" stroke={`url(#${ringId})`}>
        {/* Mitad trasera del anillo, detrás del cristal. */}
        <path
          d="M 50 200 A 150 58 0 0 1 350 200"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </g>

      <g strokeLinejoin="round">
        <polygon
          points="200,95 290.9,147.5 290.9,252.5 200,305 109.1,252.5 109.1,147.5"
          fill={`url(#${glassId})`}
          style={{ stroke: "var(--color-text)" }}
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <path
          d="M200 95 L200 148 M290.9 147.5 L200 148 M290.9 147.5 L245 226 M290.9 252.5 L245 226
             M200 305 L245 226 M200 305 L155 226 M109.1 252.5 L155 226 M109.1 147.5 L155 226
             M109.1 147.5 L200 148 M200 148 L245 226 L155 226 Z"
          fill="none"
          style={{ stroke: "var(--color-text)" }}
          strokeOpacity="0.18"
          strokeWidth="1"
        />
      </g>

      <g transform="rotate(-24 200 200)" fill="none" stroke={`url(#${ringId})`}>
        {/* Mitad delantera del anillo, sobre el cristal. */}
        <path
          d="M 350 200 A 150 58 0 0 1 50 200"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
