import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Rutas explícitas (SPEC §5). /cv se añadirá en su fase correspondiente.
export default [
  index("routes/home.tsx"),
  route("proyectos/flux", "routes/flux.tsx"),
  route("proyectos/licitai", "routes/licitai.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
