# DESIGN-SYSTEM.md --- Sistema visual

## 1. Dirección creativa

**Concepto:** editorial premium con una pieza 3D abstracta.

El sitio debe sentirse preciso, sofisticado y tecnológico, pero seguir
siendo un portafolio profesional legible. El objeto 3D aporta
personalidad; el contenido, los proyectos y la evidencia técnica son los
protagonistas funcionales.

### Principios

-   Contraste y jerarquía antes que decoración.
-   Azul y violeta como identidad cromática principal.
-   Metal y cristal como materiales del objeto 3D.
-   Espacio negativo generoso y composiciones editoriales.
-   Movimiento medido, nunca obligatorio para entender el contenido.
-   Componentes consistentes en todas las rutas.

## 2. Tokens de color

  --------------------------------------------------------------------------------
  Token                      Valor                         Uso
  -------------------------- ----------------------------- -----------------------
  `--color-bg`               `#080B12`                     Fondo principal

  `--color-surface`          `#111827`                     Superficies y tarjetas

  `--color-surface-raised`   `#1C2739`                     Superficies elevadas y
                                                           estados

  `--color-primary`          `#4D8DFF`                     CTA principal, enlaces
                                                           destacados y foco

  `--color-accent`           `#8B5CF6`                     Acentos violetas,
                                                           gradientes puntuales

  `--color-positive`         `#00D6C9`                     Estados positivos
                                                           puntuales

  `--color-text`             `#EDF2FA`                     Texto principal

  `--color-text-muted`       `#A8B3C7`                     Texto secundario

  `--color-border`           `rgba(168, 179, 199, 0.16)`   Bordes discretos

  `--color-overlay`          `rgba(8, 11, 18, 0.72)`       Capas de superposición
                                                           cuando se necesiten
  --------------------------------------------------------------------------------

No usar turquesa como tercer color dominante. Los gradientes
azul-violeta se reservan para áreas de énfasis, el objeto 3D y detalles
seleccionados; no cubrir toda la interfaz con ellos.

## 3. Tipografía

Familias del catálogo de Google Fonts, servidas desde el propio sitio con
Fontsource (sin conexión a terceros). Fuente: `docs/REDESIGN-BRIEF.md` §3.4.

-   **Space Grotesk** (variable 300–700): titulares y encabezados.
-   **Raleway** (variable): párrafos, navegación, controles y contenido
    general. Peso mínimo 400 en texto de menos de 20px; usar siempre
    `font-variant-numeric: lining-nums` (Raleway trae numerales de estilo
    antiguo por defecto).
-   **IBM Plex Mono** (400 y 500): etiquetas técnicas, stack, metadatos
    breves y eyebrows. Uso selectivo.

No usar Inter como tipografía principal ni texto con gradiente en los
titulares: el contraste se construye con escala y peso.

### Jerarquía (tokens en `app/styles/tokens.css`)

-   Display del hero (`--text-display`): `clamp(3rem, 1.2rem + 6vw, 6rem)`,
    interlineado `0.94`, tracking `-0.04em`.
-   H2 ancla (`--text-h2-xl`, proyectos, perfil, contacto):
    `clamp(2.5rem, 1.5rem + 4vw, 4.5rem)`.
-   H2 de sección (`--text-h2`): `clamp(2rem, 1.4rem + 2.2vw, 3rem)`.
-   H3 de tarjeta: `1.25rem–1.5rem`.
-   Cuerpo principal: `1.0625rem`, line-height `1.65`.
-   Metadatos: `0.8125rem` en mono, con contraste suficiente.

Los tamaños son una guía inicial. Ajustar según contenido real y pruebas
visuales. Evitar párrafos largos con ancho excesivo; mantener una medida
de lectura cómoda.

## 4. Espaciado y layout

Usar una escala consistente basada en múltiplos de 4 u 8 px. Evitar
valores arbitrarios repetidos.

-   Contenedor máximo orientativo: `1160–1240px`.
-   Padding horizontal: generoso en escritorio, reducido sin quedar
    pegado al borde en móvil.
-   Separación entre secciones: amplia y consistente.
-   Tarjetas: padding suficiente para distinguir título, resumen,
    etiquetas y CTA.
-   Radios: moderados; evitar que todos los elementos parezcan cápsulas.
-   Bordes: sutiles, no líneas brillantes por todas partes.

La página debe conservar ritmo editorial: bloques amplios, alineaciones
claras y cambios de escala entre hero, secciones y tarjetas.

## 5. Navegación

### Escritorio

-   Barra horizontal clásica, limpia y refinada.
-   Nombre o wordmark a la izquierda.
-   Enlaces centrales o agrupados de forma equilibrada.
-   CTA de CV/contacto como acción secundaria destacada.
-   Fondo integrado con la página; si se usa transparencia, mantener
    contraste.

### Móvil

-   Menú compacto con botón claramente etiquetado.
-   Estado abierto/cerrado accesible por teclado.
-   Cierre después de navegar.
-   Evitar menús que cubran contenido sin una salida evidente.

No añadir navegación compleja ni menús multinivel.

## 6. Botones y enlaces

### Primario

-   Fondo azul eléctrico.
-   Texto de contraste alto.
-   Hover y active perceptibles, sin saltos bruscos.
-   Foco de teclado evidente.

### Secundario

-   Fondo transparente o superficie oscura.
-   Borde sutil.
-   Texto claro y hover azul-violeta moderado.

### Enlaces de texto

-   Identificables sin depender únicamente del color cuando sea posible.
-   Área táctil adecuada en móvil.
-   Etiquetas específicas: evitar "Haz clic aquí".

No usar botones para acciones que son navegación; usar enlaces para
navegar y botones para ejecutar acciones.

## 7. Tarjetas de proyecto

Cada tarjeta debe incluir, cuando exista información: - Nombre del
proyecto. - Resumen orientado al problema o valor. - Rol o
contribución. - Tecnologías relevantes, en número limitado. -
Imagen/captura real o ilustración claramente conceptual. - Enlace al
caso de estudio.

Estados: - Hover sutil con cambio de borde, elevación o desplazamiento
mínimo. - Foco visible por teclado. - En móvil, la información esencial
debe estar siempre visible; no depender del hover. - No presentar
métricas o etiquetas como hechos si no están verificadas.

### Implementación actual (rediseño, iteración 3)

-   Paneles anchos con portada 16:9 que alterna de lado entre proyectos
    y luz propia (azul / violeta). Stack en mono con filetes, sin chips.
-   Sin captura real (`cover: null`) se muestra una portada abstracta:
    luz, trama técnica y el nombre en contorno. No imita una interfaz;
    se sustituye en cuanto exista la captura.
-   El hover con desplazamiento solo se activa si existe caso de estudio.

## 8. Objeto 3D

### Dirección

-   Objeto abstracto con combinación de metal cromado y cristal
    translúcido.
-   Reflejos y refracciones azul-violeta.
-   Silueta reconocible y composición con espacio negativo para el
    texto.
-   Movimiento lento, continuo y discreto; sin rotación frenética ni
    partículas por defecto.
-   El objeto no debe competir con el título ni tapar los CTA.

### Implementación

-   Three.js, preferentemente mediante React Three Fiber si encaja con
    la estructura React.
-   Cargar la escena de forma diferida cuando sea razonable.
-   Evitar texturas de alta resolución y luces excesivas sin beneficio
    visual claro.
-   Considerar límites de rendimiento y una alternativa estática.
-   Si `prefers-reduced-motion: reduce`, detener o simplificar
    movimiento y mostrar una composición estática.
-   Si la carga falla o el dispositivo no puede renderizar la escena, el
    hero debe seguir viéndose intencional y completo.
-   No depender de WebGL para exponer información textual.

### Implementación actual (rediseño, iteración 2)

-   Pieza: metaforma orgánica, una esfera deformada en el vertex shader
    con ruido simplex animado (`HeroScene.tsx` + `blobShader.ts`), en metal
    holográfico (cromo con iridiscencia de lámina fina). Respira de forma
    constante; con puntero fino se inclina como máximo 4° y, con el
    puntero encima, se agita (más amplitud, frecuencia y velocidad) y
    vuelve a la calma al salir.
-   El canvas es opaco y pinta su propio fondo de luz azul-violeta, el
    mismo halo que lleva el render estático. Una máscara radial CSS funde
    sus bordes con la página. Los reflejos salen del entorno procedural.
-   Render pre-producido (`app/assets/hero-render.webp`, mismo encuadre y
    máscara) como fallback, durante la carga y en móvil (< 48rem). Si
    cambia la escena, regenerarlo capturando el canvas.
-   `dpr` limitado a 1.5; sin frames fuera de pantalla.

### Validación

-   Revisar en móvil real o emulación razonable.
-   Comprobar consumo, estabilidad y tiempos de carga.
-   Si el resultado no justifica el coste, usar un render preproducido
    como alternativa sin alterar el resto del diseño.

## 9. Motion y microinteracciones

-   Hover/focus/active: aproximadamente 180--300 ms.
-   Entradas de contenido: aproximadamente 300--500 ms.
-   Easing suave y consistente.
-   Evitar animaciones de entrada que retrasen la lectura.
-   No animar todas las tarjetas de forma independiente sin razón.
-   Respetar movimiento reducido en todas las animaciones no esenciales.
-   Evitar parallax intenso, scroll-jacking y cursores personalizados
    que dificulten la usabilidad.

## 10. Superficies y efectos

### Atmósfera

-   Grano monocromo global (`--grain`) en una sola capa fija, opacidad
    `0.04`, sin blend mode.
-   Cada sección declara su luz con la prop `tone` de `Section`:
    `base` (lectura), `deep` (superficie profunda con luz violeta),
    `grid` (trama técnica enmascarada) y `horizon` (luz de cierre). El
    hero tiene su propia luz y estrías de cristal.
-   La luz azul y violeta se define con los tokens `--light-*`; no
    repetir el mismo gradiente en todas las secciones.

### Superficies

-   Sólida: `--color-surface`, borde `--color-border`, sombra
    `--highlight-edge` + `--shadow-raised`.
-   Cristal (`Card surface="glass"` y panel de `Section`): `--glass-bg`,
    `--glass-border` y `--glass-filter`, con fallback opaco. Solo en
    cabecera, paneles de proyecto y contacto.

-   Glassmorphism solo en elementos donde ayude a crear jerarquía.
-   Desenfoques moderados y con fallback visual.
-   Sombras amplias y sutiles; evitar brillos neón constantes.
-   No usar bordes gradientes en cada tarjeta.
-   No aplicar blur a texto ni a elementos que deban mantener
    legibilidad.

## 11. Imágenes y multimedia

-   Priorizar capturas y demostraciones reales de los proyectos.
-   Mantener proporciones coherentes en las tarjetas.
-   Usar `object-fit` según el tipo de recurso y evitar recortes que
    oculten información.
-   No reproducir videos automáticamente con sonido.
-   Usar póster y controles para video cuando corresponda.
-   Optimizar imágenes y servir tamaños apropiados.
-   Añadir alt descriptivo para contenido informativo; usar alt vacío en
    decoración.

## 12. Responsive

Diseñar de forma fluida y probar al menos: - Móvil estrecho: alrededor
de 320--375 px. - Móvil estándar: alrededor de 390--430 px. - Tablet:
alrededor de 768 px. - Escritorio: alrededor de 1280 px. - Pantalla
amplia: alrededor de 1440 px o más.

En móvil: - Apilar columnas. - Mantener título, CTA y resumen del hero
visibles sin que el 3D los desplace demasiado. - Reducir o reemplazar
efectos costosos. - Mantener áreas táctiles cómodas. - Prevenir scroll
horizontal.

## 13. Accesibilidad visual

-   Contraste suficiente en texto, controles y estados.
-   Foco visible.
-   Estados que no dependan solo del color.
-   No usar tipografía diminuta para información importante.
-   Mantener una jerarquía semántica de encabezados.
-   Comprobar zoom de navegador y movimiento reducido.
-   Evitar destellos rápidos o efectos que puedan causar molestias.

## 14. Checklist de revisión visual

Antes de cerrar una etapa: - ¿La jerarquía del contenido se entiende en
pocos segundos? - ¿Azul y violeta equilibran la composición sin
saturarla? - ¿El 3D acompaña al mensaje en vez de dominarlo? - ¿La
tipografía es legible en móvil? - ¿Los CTA destacan sin competir entre
sí? - ¿Las tarjetas son coherentes y muestran información útil? - ¿Los
estados de foco y teclado son visibles? - ¿El sitio sigue siendo claro
sin animaciones? - ¿Se evitaron recursos ficticios que parezcan capturas
reales?
