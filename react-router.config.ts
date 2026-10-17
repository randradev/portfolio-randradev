import type { Config } from "@react-router/dev/config";

export default {
  // Sin servidor: el build genera HTML estático por ruta (SPEC §4 y §11).
  ssr: false,
  // Rutas públicas que se pre-renderizan. Los casos de estudio se añadirán
  // en la Fase 4, cuando su contenido esté verificado.
  prerender: ["/"],
} satisfies Config;
