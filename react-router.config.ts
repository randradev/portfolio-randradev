import type { Config } from "@react-router/dev/config";

export default {
  // Sin servidor: el build genera HTML estático por ruta (SPEC §4 y §11).
  ssr: false,
  // Rutas públicas que se pre-renderizan: cada una tiene su HTML y funciona
  // al entrar directamente o recargar.
  prerender: ["/", "/proyectos/flux", "/proyectos/licitai"],
} satisfies Config;
