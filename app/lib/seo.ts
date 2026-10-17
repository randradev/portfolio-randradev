import type { MetaDescriptor } from "react-router";

import { site } from "~/content/site";
import type { RouteMeta } from "~/content/types";

/**
 * Construye los metadatos de una ruta (título, descripción, Open Graph).
 * PENDIENTE: `og:url` y `og:image` cuando exista el dominio final y una imagen real.
 */
export function buildMeta(meta: Partial<RouteMeta> = {}): MetaDescriptor[] {
  const title = meta.title ? `${meta.title} · ${site.name}` : site.meta.title;
  const description = meta.description ?? site.meta.description;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:card", content: "summary" },
  ];
}
