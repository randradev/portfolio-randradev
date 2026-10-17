import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Rutas explícitas (SPEC §5). Los casos de estudio (/proyectos/:slug) y /cv
// se añadirán en sus fases correspondientes.
export default [
  index("routes/home.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
