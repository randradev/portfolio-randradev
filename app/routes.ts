import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Rutas explícitas (SPEC §5). El caso de LicitAI y /cv se añadirán en sus
// fases correspondientes.
export default [
  index("routes/home.tsx"),
  route("proyectos/flux", "routes/flux.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
