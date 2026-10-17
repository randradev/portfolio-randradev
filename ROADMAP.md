# ROADMAP.md --- Plan de implementación

## Principios de ejecución

-   Priorizar una web pública que pueda ayudar a conseguir empleo.
-   Trabajar en incrementos pequeños y revisables.
-   No construir el panel de administración ni un backend propio en el
    MVP.
-   Validar visualmente el hero temprano, especialmente el 3D.
-   No añadir contenido ficticio para completar una pantalla.
-   Cada etapa debe dejar el proyecto en un estado ejecutable.

## Fase 0 --- Preparación y auditoría de materiales

### Tareas

-   Revisar CV, repositorios, capturas, demos y perfiles disponibles.
-   Confirmar el contenido real de LicitAI y Flux.
-   Crear una lista de hechos confirmados y pendientes.
-   Acordar el nombre que se mostrará, correo y enlaces públicos.
-   Definir el archivo final del CV y los recursos multimedia
    disponibles.

### Hecho cuando

-   Existe una fuente de verdad para el contenido.
-   Los elementos no verificados están marcados como pendientes y no se
    presentan como hechos.

## Fase 1 --- Base técnica y sistema visual

### Tareas

-   Crear el proyecto React + TypeScript + Vite.
-   Preparar scripts de desarrollo, build, lint y comprobaciones
    básicas.
-   Definir estructura de carpetas y estrategia de routing.
-   Implementar tokens CSS, tipografías y estilos globales.
-   Crear componentes base: contenedor, botón, enlace, etiqueta, tarjeta
    y navegación.
-   Configurar Git y confirmar que el proyecto puede construirse en
    producción.

### Hecho cuando

-   La aplicación inicia y el build termina sin errores.
-   Los tokens están centralizados y no se repiten colores
    arbitrariamente.
-   La base se ve consistente en móvil y escritorio.

## Fase 2 --- Prueba visual del hero

### Tareas

-   Construir navegación y composición del hero.
-   Probar el objeto abstracto metálico/cristalino con reflejos azules y
    violetas.
-   Integrar Three.js de forma aislada, preferentemente con React Three
    Fiber si resulta adecuado.
-   Añadir fallback estático y soporte para movimiento reducido.
-   Verificar legibilidad, contraste, carga inicial y CTA.

### Hecho cuando

-   El hero comunica el perfil sin depender de la animación.
-   El 3D no bloquea interacción ni hace lenta la carga inicial de forma
    desproporcionada.
-   La composición se revisó en móvil y escritorio.
-   Si el resultado visual no compensa el coste, se puede sustituir por
    un recurso pre-renderizado sin rehacer el sitio.

## Fase 3 --- Página principal completa

### Tareas

-   Añadir proyectos destacados.
-   Añadir tecnologías agrupadas.
-   Añadir experiencia y formación.
-   Añadir sección sobre mí y contacto.
-   Añadir footer y navegación interna.
-   Cargar contenido desde datos tipados separados de los componentes.

### Hecho cuando

-   Todas las secciones tienen contenido verificable.
-   Los CTA principales funcionan.
-   No hay enlaces de ejemplo ni texto de relleno en producción.

## Fase 4 --- Casos de estudio

### Tareas

-   Crear una plantilla reutilizable de caso de estudio.
-   Completar LicitAI con información comprobada.
-   Completar Flux con información comprobada.
-   Incorporar diagramas, capturas o grabaciones reales.
-   Mostrar repositorio o demo solo cuando estén disponibles y
    verificados.
-   Incluir limitaciones y aprendizajes cuando aporten valor.

### Hecho cuando

-   Cada caso explica contexto, problema, solución, rol, arquitectura,
    decisiones y límites.
-   Los recursos visuales corresponden al proyecto real.
-   Los enlaces externos funcionan.

## Fase 5 --- Calidad, accesibilidad y SEO

### Tareas

-   Revisar responsive en anchos pequeños, medios y grandes.
-   Revisar navegación por teclado y foco visible.
-   Revisar `prefers-reduced-motion`.
-   Revisar textos alternativos, encabezados, contraste y semántica.
-   Revisar metadatos por ruta y previews sociales.
-   Optimizar imágenes y recursos 3D.
-   Corregir errores de consola y enlaces rotos.
-   Ejecutar build y herramientas de auditoría disponibles.

### Hecho cuando

-   No quedan problemas críticos de accesibilidad, navegación o
    funcionamiento conocidos.
-   El contenido principal se mantiene utilizable si el 3D no carga.
-   El build de producción termina correctamente.

## Fase 6 --- Despliegue

### Tareas

-   Conectar el repositorio a Vercel.
-   Configurar variables de entorno solo si realmente se necesitan.
-   Verificar las rutas profundas al abrirlas directamente y
    recargarlas.
-   Revisar la versión desplegada desde móvil y escritorio.
-   Confirmar que los recursos y enlaces no dependen de rutas locales.

### Hecho cuando

-   Existe una URL pública estable.
-   Las rutas de proyectos funcionan directamente.
-   El CV y los contactos funcionan.
-   No se exponen secretos ni archivos privados.

## Fase 7 --- Mejoras posteriores al MVP

Orden sugerido, según necesidad real: 1. Mejorar los recursos visuales y
demostraciones de los proyectos. 2. Refinar microinteracciones según
feedback. 3. Añadir analítica respetuosa con la privacidad si existe una
razón concreta. 4. Evaluar CMS o panel de administración si actualizar
contenido se vuelve frecuente. 5. Considerar backend propio solo si
aparece una necesidad que no se resuelva de forma más simple.

## Regla de control de alcance

Si una tarea no mejora claramente la comprensión del perfil, la
evidencia técnica, la accesibilidad, el rendimiento o la capacidad de
publicar, dejarla para después del MVP.

## Flujo de trabajo con Claude Code

Para cada tarea: 1. Leer `CLAUDE.md`, `SPEC.md`, `DESIGN-SYSTEM.md` y la
sección correspondiente de este roadmap. 2. Antes de editar, resumir el
enfoque y los archivos que probablemente cambiarán. 3. Implementar solo
el alcance de la tarea actual. 4. Ejecutar las comprobaciones
relevantes. 5. Informar archivos modificados, decisiones, resultados de
las comprobaciones y pendientes. 6. Revisar el diff y probar el
resultado antes de pasar a la tarea siguiente.

No pedir que implemente todas las fases en una sola ejecución.
