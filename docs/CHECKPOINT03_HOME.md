# Checkpoint — Fase 3 completada (página principal)

Resumen para retomar el proyecto sin releer todo el código. Fuentes de verdad:
`CLAUDE.md`, `SPEC.md`, `ROADMAP.md`, `DESIGN-SYSTEM.md` y, para los textos de la Home,
`docs/COPY-HOME.md`. Checkpoint anterior: `docs/CHECKPOINT FASE 2.md` (stack, comandos,
hero 3D y convenciones siguen vigentes).

## Estado

| Fase | Estado |
|---|---|
| 0 — Auditoría de materiales | Parcial: CV y repos contrastados en esta sesión (ver «Verificación de contenido») |
| 1 — Base técnica y sistema visual | ✅ Completa |
| 2 — Prueba visual del hero (3D) | ✅ Completa, pendiente de revisión en móvil real |
| 3 — Página principal completa | ✅ Completa, pendiente de revisión del usuario |
| 4 — Casos de estudio | ⏭️ Siguiente |

El usuario hace los commits manualmente; solo se sugiere el mensaje
(propuesto: `feat: Fase 3 | Página principal completa`). No avanzar de fase sin que el
usuario revise.

> **Aviso para agentes futuros:** después de este checkpoint el usuario va a revisar y
> cambiar varios textos. Los textos citados aquí reflejan el estado al cierre de la sesión.
> Ante cualquier diferencia, mandan los archivos de `app/content/` y la versión vigente de
> `docs/COPY-HOME.md`. No restaurar textos antiguos a partir de este documento.

## Qué se hizo en la sesión

1. Se leyeron `CLAUDE.md`, `SPEC.md`, `ROADMAP.md`, `DESIGN-SYSTEM.md`,
   `docs/CHECKPOINT FASE 2.md` y `docs/COPY-HOME.md`, y se inspeccionó el repositorio
   (working tree limpio salvo `docs/COPY-HOME.md`, último commit `fe9afff`).
2. Se contrastó el copy con `public/cv/ricardo-andrade-cv.pdf` y con los repositorios
   públicos de GitHub (API pública, sin `gh`, que no está instalado).
3. Se consultaron al usuario las discrepancias y decisiones bloqueantes (ver
   «Decisiones del usuario»).
4. Se implementaron todas las secciones de la Home, el footer y la navegación interna con
   contenido tipado.
5. Se validó con typecheck, lint, prettier, build y revisión en Chrome (escritorio,
   iframes de 320/375/768/1024 px, menú móvil, 404 y consola).

## Decisiones del usuario (sesión de Fase 3)

| Tema | Discrepancia | Decisión |
|---|---|---|
| Fechas de Mauricio Minck | Copy «Marzo – mayo de 2026» vs. CV «Diciembre 2024 – Febrero 2025» | **Copy** (el CV del repo está desactualizado) |
| Formación | Copy: U. Mayor 2024–2026 + «AI Fundamentals for Industry» (USACH, 2026). CV: 2023–2026, sin USACH | **Todo como en el copy** |
| CTA de proyectos | `/proyectos/:slug` no existe hasta la Fase 4 (daría 404); no hay página «Ver todos los proyectos» | **Ocultar** ambos CTA hasta la Fase 4 |
| CV público | El PDF actual muestra el teléfono del usuario | **Desactivado** (`cvHref: null`) hasta que el usuario aporte un PDF sin teléfono |

## Decisiones por defecto (informadas, sin objeción del usuario hasta ahora)

- **Hero:** se resalta con el gradiente la frase «la inteligencia artificial.» (`emphasis`).
- **Etiqueta opcional `FULL STACK × AI`:** no se usa.
- **Navegación:** la del copy (Inicio, Proyectos, Trayectoria, Sobre mí, Contacto) con el CTA
  «Ver proyectos». Sustituye al antiguo botón de CV en el header (`site.cvLabel` se
  eliminó). El CV se abre desde Trayectoria, Contacto y el footer cuando se active.
- **«Tecnologías agrupadas» (ROADMAP):** se resolvió con etiquetas debajo de cada área de
  «Cómo trabajo», solo con tecnologías del CV o de los repos.
- **Trayectoria:** nombre legal y cargos del CV (el copy no los trae). Planetario se
  escribió «Mayo de 2024 – actualidad» para seguir el formato del resto (el CV pone
  «Mayo 2024 – Actualidad»).
- **Promedio:** omitido (el copy exige confirmación expresa; además el CV dice 6,8 y el
  copy, 6,82).
- **Textos auxiliares opcionales de las tarjetas:** incluidos (`tagline`).
- **Contacto:** correo, GitHub y LinkedIn del CV. El teléfono no se muestra.
- **Tarjetas de proyecto:** sin imagen (no hay capturas reales) y sin rol (no confirmado).
- **Orden de secciones:** el del copy, no el de SPEC §5.

## Estructura añadida o modificada

```
app/
  content/
    types.ts       + ExternalLink, SectionIntro, Project, ProjectsContent, ApproachArea,
                     ApproachContent, ExperienceItem, EducationItem, ExperienceContent,
                     AboutContent, ContactContent, FooterContent, ContactChannels.
                     HeroContent: eyebrow, secondaryCta, note (se quitó contactCta).
                     SiteConfig: navCta y contact (se quitó cvLabel).
    site.ts        Meta del copy §12, nav del copy §1, navCta, cvHref: null, contact.
    home.ts        Todos los textos de la Home: hero, projectsIntro, approach,
                   experienceIntro, about, educationIntro, contact, footer.
    projects.ts    NUEVO. LicitAI y Flux (slug, category, summary, tagline, stack,
                   caseStudyTo: null). Reutilizable en la Fase 4.
    profile.ts     NUEVO. experience[] y education[].
  components/
    ui/Eyebrow.tsx            NUEVO. Antetítulo mono en mayúsculas (salió del Hero).
    home/Section.tsx          NUEVO. <section id aria-labelledby> + Container + header
                              (Eyebrow, h2 con id `${id}-titulo`, párrafos, actions).
                              Props: layout "split" | "panel", align "end" | "start".
    home/ProjectsSection.tsx  NUEVO. Lista de Card con categoría, nombre, resumen,
                              tagline, TagList y CTA solo si caseStudyTo existe.
    home/ApproachSection.tsx  NUEVO. 3 áreas separadas por línea superior, con TagList.
    home/Timeline.tsx         NUEVO. <ol> periodo | título, subtítulo, descripción.
                              Lo usan Experience y Education.
    home/ExperienceSection.tsx, AboutSection.tsx, EducationSection.tsx,
    home/ContactSection.tsx   NUEVOS. Contact usa layout "panel"; CTA mailto + lista de
                              canales (correo, GitHub, LinkedIn).
    layout/SiteFooter.tsx     NUEVO. Wordmark, descriptor, nav secundaria, perfiles, CV
                              (si existe) y crédito. Se renderiza en root.tsx (también
                              en la 404).
    layout/SiteHeader.*       CTA «Ver proyectos» (cierra el menú al pulsarlo). Enlaces
                              con nowrap; gaps reducidos entre 48rem y 64rem.
    hero/Hero.*               id="inicio", Eyebrow, título en una línea lógica sin <br>,
                              CTA secundario a #trayectoria, microcopy `.note`.
  routes/home.tsx             Hero + 6 secciones.
  root.tsx                    + <SiteFooter /> tras <main>.
```

Cada componente nuevo tiene su `.module.css` y solo consume tokens de `tokens.css`.

### Anclas

`#inicio` (hero), `#proyectos`, `#enfoque` (sin enlace en la nav), `#trayectoria`,
`#sobre-mi`, `#formacion` (sin enlace en la nav), `#contacto`. Los enlaces usan
`/#ancla` para funcionar desde cualquier ruta.

### Puntos de activación (un solo dato)

| Qué | Dónde | Valor actual |
|---|---|---|
| CTA del CV (Trayectoria, Contacto, footer) | `site.cvHref` en `site.ts` | `null` → `"/cv/ricardo-andrade-cv.pdf"` |
| «Explorar caso de estudio» | `caseStudyTo` en `projects.ts` | `null` → `"/proyectos/licitai"`, `"/proyectos/flux"` |
| «Ver todos los proyectos» | `projectsIntro.allProjectsLink` en `home.ts` | `null` → `{ label, href }` |

## Sistema visual aplicado

- **Section:** `padding-block: calc(var(--section-gap) / 2)`. Con ≥64rem y `split`, título
  (7fr) e introducción (5fr) en columnas alineadas por la base; `align="start"` en «Sobre
  mí» porque su introducción es larga. `panel`: superficie `--color-surface`, borde y
  `--shadow-raised` (solo en Contacto).
- **Proyectos:** tarjetas tipográficas (nombre en `clamp(2rem, 1.5rem + 2vw, 2.75rem)`,
  extrabold), tagline con borde izquierdo violeta (`--color-accent`), etiquetas al pie
  (`margin-top: auto`). Dos columnas en ≥64rem. `Card interactive` solo si hay CTA.
- **Cómo trabajo:** sin tarjetas; línea superior `--color-border-strong`, etiqueta del área
  en mono y `--color-primary`. Tres columnas en ≥64rem.
- **Timeline:** periodo en mono a la izquierda (columna de 14rem en ≥48rem), filas
  separadas por `--color-border`.
- **Hero:** título `max-width: 22ch`, móvil `clamp(2rem, 7.5vw, 3rem)`, ≥64rem
  `clamp(2.5rem, 3.5vw, 3.375rem)` (antes era más grande; se redujo porque el titular
  nuevo es una frase larga).
- **Footer:** sin margen superior (el padding de la última sección basta). Enlaces en
  `--color-text-muted` y `--text-small`.

## Verificación de contenido

| Dato | Fuente | Resultado |
|---|---|---|
| Stack LicitAI: Python, Selenium, Gemini API, SQLite, Streamlit | `requirements.txt` (selenium, streamlit, google-generativeai) y `core/database_mgr.py` (sqlite3) | ✅ |
| Stack Flux: React, FastAPI, LangGraph, Supabase, RAG | CV + árbol del repo (`frontend/package.json`, `infra/supabase.py`, `graph/`) | ✅ |
| github.com/randradev, /licitai-prototipo, /flux-project | HEAD → 200, repos públicos | ✅ |
| LinkedIn `linkedin.com/in/ricardo-andrade-valderrama/` | LinkedIn responde 405 a peticiones automáticas | ⚠️ Confirmar a mano |
| Correo `randradev.dev@gmail.com` | CV | ✅ (dato del CV) |
| Periodos de Púrpura Digital y Planetario | CV | ✅ |
| Periodo de Minck, Universidad Mayor y curso de la USACH | Copy, confirmado por el usuario | ✅ por el usuario; el CV del repo no coincide |

Tecnologías de «Cómo trabajo» (del CV y de los repos):
- Frontend: JavaScript, TypeScript, React, HTML5, CSS3.
- Backend e integración: Python, Node.js, Express, FastAPI, Django, PostgreSQL, MongoDB,
  SQLite.
- IA: Gemini API, LangGraph, RAG.
- Fuera de la selección: C#, MySQL, Git/GitHub, Postman, Gemini CLI, Pydantic, pgvector,
  Resend.

## Validaciones ejecutadas

- `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run build`: pasan
  (última ejecución tras los ajustes finales). Prerender de `/` y `__spa-fallback.html`
  correcto; el HTML de `/` contiene las 7 secciones y el `mailto:`, y no contiene el PDF.
- Chrome, escritorio (≈1568 px): revisión visual de todas las secciones. Sin errores de
  consola tras recargar `/`.
- Iframes de 320/375/768/1024 px: sin scroll horizontal; nav de tablet en una línea
  (enlaces de 44 px de alto).
- Menú móvil (375 px): `aria-expanded` pasa a `true`, al pulsar «Trayectoria» navega a
  `#trayectoria`, se cierra y la sección queda bajo el header (top ≈ 80 px).
- Página 404: se ve correctamente con el footer nuevo.
- Nota: `npm run dev` falló con «Port 5173 is already in use» porque ya había un servidor
  de desarrollo del usuario en ese puerto; se usó ese.

**No verificado:** recorrido completo de foco por teclado sección por sección, movimiento
reducido en el navegador, móvil real, Lighthouse/auditoría de accesibilidad y contraste
medido con herramienta.

## Pendientes abiertos

1. **CV:** el PDF de `public/cv/` muestra el teléfono y está desactualizado (fechas de
   Minck, Universidad Mayor y falta el curso de la USACH). El usuario aportará otra
   versión; luego, activar `cvHref`.
2. **LinkedIn:** confirmar la URL manualmente.
3. **Revisar los datos añadidos que no vienen del copy:** nombre legal de Minck, cargos de
   las tres experiencias y etiquetas de tecnologías de «Cómo trabajo».
4. **Textos:** el usuario va a mejorar y cambiar varios textos tras esta sesión. Si cambia
   `docs/COPY-HOME.md`, sincronizar `app/content/home.ts`, `projects.ts`, `profile.ts` y
   `site.ts` (no hay nada de texto en los componentes salvo etiquetas `aria-label`:
   «Canales de contacto», «Secundaria», «Perfiles y CV», «Tecnologías de …»,
   «Tecnologías: …»).
5. **Hero en 320 px:** con el titular y el resumen actuales, los CTA quedan por debajo de
   la primera pantalla en móviles muy bajos (a 375×812 sí se ven). Si los textos se
   acortan, revisar de nuevo.
6. **Rol en cada proyecto:** sin confirmar. El repo de Flux tiene documentación «dev1»,
   lo que sugiere trabajo en equipo; aclararlo antes de la Fase 4.
7. **Sigue abierto de la Fase 2:** peso del chunk 3D, `og:url`/`og:image`, revisión en
   móvil real.

## Siguiente: Fase 4 (ROADMAP)

Plantilla reutilizable de caso de estudio en `/proyectos/:slug`, empezando por LicitAI.
Reutilizar `app/content/projects.ts` (añadir secciones del caso al tipo `Project`), crear
las rutas en `app/routes.ts`, añadirlas a `prerender` en `react-router.config.ts` y, al
terminar, poner `caseStudyTo` en cada proyecto. Antes, pedir al usuario el rol real,
capturas y la información del caso; no rellenar.
