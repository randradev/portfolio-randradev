# Checkpoint — Fase 2 completada

Resumen para retomar el proyecto sin releer todo el código. Fuentes de verdad:
`CLAUDE.md`, `SPEC.md`, `ROADMAP.md`, `DESIGN-SYSTEM.md`. La numeración de fases es
la de `ROADMAP.md`.

## Estado

| Fase | Estado |
|---|---|
| 0 — Auditoría de materiales | No documentada en el repo; los contenidos siguen pendientes de confirmar |
| 1 — Base técnica y sistema visual | ✅ Completa |
| 2 — Prueba visual del hero (3D) | ✅ Completa, pendiente de revisión en móvil real |
| 3 — Página principal completa | ⏭️ Siguiente |

El usuario hace los commits manualmente; solo se sugiere el mensaje. No avanzar de fase
sin que el usuario revise.

## Stack y comandos

- React 19 + TypeScript + Vite 8 + **React Router 8 en modo framework** (`app/`).
- `react-router.config.ts`: `ssr: false`, `prerender: ["/"]`. HTML estático por ruta y
  `__spa-fallback.html` para el resto.
- `vercel.json`: salida `build/client`, rewrite de todo a `/__spa-fallback.html`.
- Fuentes autoalojadas: `@fontsource-variable/{manrope,inter,jetbrains-mono}`.
- 3D: `three@0.186` + `@react-three/fiber@9`. Sin `drei` (decisión deliberada).
- Gestor: npm. Alias de import `~/*` → `app/*`.

```
npm run dev            # http://localhost:5173  (móvil: npm run dev -- --host)
npm run typecheck      # react-router typegen && tsc
npm run lint           # eslint (ts, react-hooks v7, jsx-a11y, prettier)
npm run format:check   # prettier
npm run build          # build/client + prerender
```

Las cuatro comprobaciones pasan al cierre de la Fase 2.

## Estructura relevante

```
app/
  root.tsx                 Layout: SkipLink + SiteHeader + <main id="contenido">, ErrorBoundary
  routes.ts                index → routes/home.tsx ; "*" → routes/not-found.tsx
  routes/home.tsx          Renderiza solo <Hero />
  routes/not-found.tsx     404 con meta noindex
  styles/tokens.css        ÚNICA fuente de tokens (color, tipo, espacio, radios, sombras, motion, z)
  styles/base.css          Reset, globales, foco, selección, reduced-motion, .visually-hidden
  content/types.ts         Tipos: NavItem, RouteMeta, CtaLink, HeroContent, SiteConfig
  content/site.ts          Nombre, lang, meta, nav, cvHref (null), cvLabel
  content/home.ts          Textos del hero (PROVISIONALES)
  lib/seo.ts               buildMeta(): title, description, OG, twitter
  lib/usePrefersReducedMotion.ts   useSyncExternalStore sobre matchMedia
  components/layout/       SiteHeader (nav + menú móvil), SkipLink
  components/ui/           Container, Button, ButtonLink, TextLink, AppLink, Tag/TagList, Card
  components/hero/         Hero, HeroVisual, HeroScene, HeroFallback
public/cv/ricardo-andrade-cv.pdf   Existe, pero NO enlazado (cvHref: null) hasta confirmar
```

## Convenciones

- CSS Modules por componente; solo se consumen variables de `tokens.css`.
- Breakpoints (no son variables CSS): `48rem` (tablet / nav de escritorio), `64rem`
  (hero a dos columnas), `80rem`.
- Contenido en `app/content/` y tipado. Los componentes no contienen textos de perfil.
- `ButtonLink`/`TextLink` navegan (`to` interno, `href` externo o archivo). `Button` solo
  ejecuta acciones. `AppLink` añade `target=_blank` y `rel` seguro a los `http(s)`.
- `Card interactive` activa hover y focus-within. `TagList` es una lista semántica.
- Los datos pendientes se marcan con comentarios `PENDIENTE` / `PROVISIONAL`; no se
  inventa contenido.
- react-hooks v7 es estricto: nada de setState síncrono en effects, nada de mutar valores
  de hooks y `useMemo` siempre con una función inline. Corregir el código, no desactivar
  reglas.

## Sistema visual (Fase 1)

- Paleta exacta de `DESIGN-SYSTEM.md`, más derivados: `--color-border-strong`,
  `--color-primary-hover/active`, `--gradient-brand`.
- `--color-on-primary: var(--color-bg)`: texto oscuro en el botón primario (≈6:1).
  El claro daba ≈2.8:1 y se descartó en la Fase 2.
- Escala: `--text-h1` (móvil `clamp(2.4rem,11vw,3.5rem)`, ≥48rem
  `clamp(2.8rem,6vw,5.5rem)`), `--text-h2`, `--text-h3`, body 1rem/1.125rem, meta
  0.8125rem.
- Espaciado `--space-1..32` (múltiplos de 4px), `--container-max: 75rem`,
  `--tap-target: 44px`.
- Motion: 180/240/400ms, `--ease-standard`. Bajo `prefers-reduced-motion` las duraciones
  pasan a 0 y base.css neutraliza transiciones y animaciones.
- Header sticky con overlay y blur (con `@supports`). Menú móvil: `aria-expanded`, se
  cierra con Escape (devuelve el foco) y al navegar (estado ligado a `location.key`).

## Hero 3D (Fase 2)

- **Hero.tsx**: eyebrow (`site.name`, mono), h1 `lead` + `emphasis` (texto con
  `--gradient-brand`, fallback y `forced-colors`), resumen y CTA. El CTA secundario es
  "Ver CV" si existe `cvHref`; si no, "Contacto". El h1 usa una escala propia (móvil
  `clamp(2.25rem,10vw,3.5rem)`, ≥64rem `clamp(3.25rem,5vw,4.75rem)`) para que
  "Desarrollador" quepa a 320px.
- **HeroVisual.tsx**: punto único de decisión entre escena y fallback.
  - `supportsScene()` (cacheado): requiere WebGL2 y que no haya `saveData`. Se lee con
    `useSyncExternalStore` (snapshot de servidor `false`), así la escena solo se monta en
    cliente.
  - `HeroScene` se carga con `lazy()` (chunk aparte), dentro de una error boundary y
    Suspense.
  - El fallback siempre está debajo y hace un fundido cruzado cuando la escena avisa
    `onReady` (`data-ready`).
  - IntersectionObserver: anima solo en pantalla. Con movimiento reducido, `animate=false`
    y `frameloop="demand"` (escena estática).
  - Si se pierde el contexto WebGL o hay un error, vuelve al fallback.
  - `aria-hidden` y `pointer-events: none`.
- **HeroScene.tsx**: lee la paleta de los tokens CSS con `getComputedStyle`. Entorno de
  reflejos propio: sala oscura con paneles emisivos (softbox, relleno, azul, violeta,
  rim) → `PMREMGenerator`, conectado con `<primitive attach="environment">`. Objetos:
  torus knot cromado (`metalness 1`, `roughness 0.14`) e icosaedro de cristal
  (`transmission`, `iridescence`, atenuación violeta). Giro de `0.12 rad/s` en Y.
  `dpr [1, 1.75]`.
- **HeroFallback.tsx**: SVG del anillo entrelazado con un cristal facetado, colores por
  `var(--…)` y `useId` para los gradientes.
- **Para sustituir el 3D** por un render pre-producido, basta con cambiar `HeroVisual`.

## Verificación realizada (Fase 2)

- Chrome en escritorio: la escena renderiza y no hay errores. Avisos ajenos a nuestro
  código: `THREE.Clock` obsoleto (interno de R3F) y un aviso de precisión de shaders de
  ANGLE/D3D.
- 320/375/768px (medido en iframes): sin scroll horizontal, el h1 no se desborda y los
  CTA quedan en la primera pantalla.
- Sin WebGL2 simulado: aparece el SVG y no se crea el canvas.
- Teclado: skip link → wordmark → nav → CTA, con foco visible.
- **No verificado**: reduced motion en el navegador (solo revisado en código), móvil real,
  Lighthouse y menú móvil abierto en esta fase.

## Pendientes abiertos

1. **Peso del 3D**: chunk `HeroScene` de ≈914 kB (≈243 kB gzip). Se carga diferido, pero
   Vite avisa por tamaño. R3F importa todo `three`. Si en móvil real resulta pesado, las
   opciones son three sin R3F o una imagen pre-renderizada. Decide el usuario.
2. **Textos del hero provisionales** (`app/content/home.ts`): pendiente de confirmar.
3. **CV**: confirmar si `public/cv/ricardo-andrade-cv.pdf` es el definitivo. Para
   activarlo basta con `cvHref: "/cv/ricardo-andrade-cv.pdf"` en `site.ts`.
4. **Anclas de la nav y de los CTA** (`#proyectos`, `#sobre-mi`, `#experiencia`,
   `#contacto`): sin destino hasta la Fase 3.
5. **SEO**: `meta.description` provisional, y faltan `og:url`/`og:image` (dominio e
   imagen reales).
6. **Contenido general (SPEC §13)**: correo y perfiles, URLs de repos y demos, capturas
   reales, roles y stacks de LicitAI y Flux. Todo sin confirmar.

## Siguiente: Fase 3 (ROADMAP)

Proyectos destacados (LicitAI, Flux), tecnologías agrupadas, experiencia y formación,
sobre mí, contacto, footer y navegación interna. Todo desde datos tipados en
`app/content/`, sin relleno. Antes de escribir contenido público, pedir al usuario los
datos reales o marcarlos como pendientes.
