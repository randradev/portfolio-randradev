import heroRender from "~/assets/hero-render.webp";

/**
 * Render pre-producido de la escena 3D (metaforma de metal holográfico), con
 * su propio fondo de luz. Se usa sin WebGL, en móvil, durante la carga o si la
 * escena falla. Para regenerarlo, capturar el canvas de HeroScene con
 * `preserveDrawingBuffer` activo y exportarlo como WebP.
 */
export function HeroFallback({ className }: { className?: string }) {
  return (
    <img
      className={className}
      src={heroRender}
      alt=""
      width={864}
      height={864}
      decoding="async"
    />
  );
}
