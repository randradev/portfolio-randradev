# SPEC.md --- Portafolio profesional

## 1. Propósito

Construir un portafolio web personal, rápido, accesible y visualmente
distintivo que ayude a conseguir empleo en desarrollo de software. El
sitio debe presentar al propietario como **desarrollador Full Stack con
interés y experiencia aplicada en IA como diferenciador**, sin dar la
impresión de que el objetivo principal sea captar clientes freelance.

El sitio debe demostrar criterio técnico y de producto, no solo enumerar
tecnologías. Cada proyecto debe explicar el problema, las decisiones
técnicas, el funcionamiento, los límites conocidos y lo que se aprendió.

## 2. Objetivos y criterios de éxito

### Objetivos principales

-   Comunicar el perfil profesional y la propuesta de valor en los
    primeros segundos.
-   Facilitar que reclutadores y equipos técnicos exploren dos
    proyectos: LicitAI y Flux.
-   Mostrar experiencia, formación, tecnologías y acceso al CV.
-   Hacer que el contacto profesional sea fácil.
-   Mantener una experiencia visual premium, editorial y moderna sin
    sacrificar legibilidad, velocidad ni accesibilidad.

### Fuera del objetivo del MVP

-   No construir una plataforma SaaS.
-   No implementar autenticación, base de datos ni panel de
    administración propio en la primera versión.
-   No añadir formularios complejos, analítica invasiva ni integraciones
    que no sean necesarias para publicar.
-   No inventar métricas, usuarios, resultados, funcionalidades,
    testimonios o enlaces.
-   No presentar un proyecto como desplegado o disponible en vivo si no
    se ha comprobado.

## 3. Audiencia y tono

**Audiencia:** reclutadores, responsables de ingeniería y equipos que
contratan perfiles junior o de entrada en desarrollo de software.

**Tono:** profesional, directo, claro y humano. Evitar exageraciones,
jerga innecesaria, frases grandilocuentes y claims imposibles de
verificar.

**Posicionamiento:** Full Stack como base; IA aplicada como
diferenciador. El sitio debe mostrar capacidad para entender un
problema, construir una solución, integrar sistemas y explicar
decisiones.

## 4. Decisiones técnicas iniciales

-   Frontend: React + TypeScript.
-   Herramienta de desarrollo y build: Vite.
-   Estilos: CSS organizado con variables de diseño; evitar introducir
    una librería visual grande sin necesidad demostrable.
-   3D: Three.js; evaluar React Three Fiber para integrarlo
    declarativamente en React.
-   Hosting objetivo: Vercel.
-   Contenido del MVP: datos tipados dentro del repositorio, separados
    de los componentes de presentación.
-   Backend: ninguno propio en el MVP. Los enlaces de contacto pueden
    usar correo y perfiles externos.
-   Gestión de paquetes: elegir una herramienta estándar y mantenerla
    consistente; no mezclar gestores.
-   Pruebas: comprobaciones automatizadas para build, lint y las pruebas
    que se incorporen; revisión manual de responsive, accesibilidad y
    enlaces.
-   No instalar dependencias por comodidad si una solución sencilla con
    la plataforma existente es suficiente.

Estas son decisiones iniciales, no una obligación de mantener una
dependencia si una prueba técnica demuestra que perjudica el rendimiento
o la mantenibilidad. Si se propone un cambio, explicar el motivo antes
de aplicarlo.

## 5. Arquitectura de información y rutas

### Rutas públicas del MVP

-   `/` --- Página principal.
-   `/proyectos/licitai` --- Caso de estudio de LicitAI.
-   `/proyectos/flux` --- Caso de estudio de Flux.
-   `/cv` --- Vista web del CV, con acceso al archivo descargable si el
    archivo real está disponible.

La ruta `/cv` puede simplificarse o redirigirse si durante la
implementación resulta más clara una sección de experiencia en la página
principal con un enlace directo al PDF real. No crear una ruta vacía
solo por cumplir la lista.

### Estructura de la página principal

1.  **Navegación:** marca/nombre, Proyectos, Sobre mí, Experiencia y
    Contacto; acceso al CV destacado sin competir con la llamada
    principal.
2.  **Hero:** título profesional, texto breve, CTA para ver proyectos y
    CTA secundario para CV/contacto. Objeto 3D abstracto metálico y
    cristalino con reflejos azul-violeta.
3.  **Proyectos destacados:** tarjetas para LicitAI y Flux; resumen del
    problema, papel desempeñado, tecnologías verificadas y enlace al
    caso de estudio.
4.  **Tecnologías:** agrupadas por categorías significativas y solo con
    tecnologías que el propietario pueda defender en conversación
    técnica.
5.  **Experiencia y formación:** trayectoria relevante presentada con
    claridad y fechas verificadas.
6.  **Sobre mí:** breve explicación de enfoque, intereses y forma de
    resolver problemas, sin repetir todo el CV.
7.  **Contacto:** correo y perfiles profesionales verificados.
8.  **Footer:** navegación secundaria y enlaces relevantes.

### Plantilla de caso de estudio

Cada proyecto usa una estructura coherente, adaptada al contenido real:

1.  Encabezado: nombre, resumen, estado del proyecto y rol real.
2.  Enlaces disponibles: repositorio, demo o documentación, solo si se
    verificaron.
3.  Problema y contexto.
4.  Objetivo y alcance.
5.  Solución implementada y flujo de uso.
6.  Arquitectura o diagrama técnico.
7.  Decisiones técnicas: por qué se eligieron las tecnologías y qué
    alternativas se consideraron, cuando se conozcan.
8.  Capturas, GIF o video real del proyecto.
9.  Resultados comprobables, limitaciones y próximos pasos.
10. Aprendizajes y navegación al otro proyecto.

No completar secciones con relleno. Si falta información, dejar el campo
pendiente en los datos internos y no mostrar afirmaciones especulativas
en producción.

## 6. Dirección visual

-   Universo visual: híbrido editorial premium con un elemento 3D.
-   Fondo principal Obsidian `#080B12`.
-   Superficie Deep Slate `#111827`.
-   Superficie elevada `#1C2739`.
-   Azul eléctrico `#4D8DFF`.
-   Violeta digital `#8B5CF6`.
-   Turquesa `#00D6C9` reservado principalmente para estados positivos
    puntuales.
-   Texto principal Ice White `#EDF2FA`.
-   Texto secundario Cool Gray `#A8B3C7`.
-   Tipografías: Manrope para títulos, Inter para cuerpo y JetBrains
    Mono para detalles técnicos puntuales.
-   Navegación horizontal clásica y refinada en escritorio; menú
    compacto en móvil.
-   Tarjetas y superficies limpias, contraste alto, glassmorphism muy
    controlado.
-   Evitar estética de dashboard genérico, exceso de brillos, gradientes
    en todos los elementos, partículas decorativas sin propósito y
    animaciones que dificulten leer.

La especificación completa de tokens y comportamiento visual está en
`DESIGN-SYSTEM.md`.

## 7. Experiencia, interacción y responsive

-   Todas las interacciones esenciales deben funcionar con teclado y
    pantalla táctil.
-   Los enlaces y botones deben tener estados visibles de hover, focus,
    active y disabled cuando corresponda.
-   La navegación móvil debe ser fácil de abrir, cerrar y usar con
    teclado.
-   La página debe funcionar en móvil estrecho, tablet y escritorio sin
    scroll horizontal involuntario.
-   El contenido debe seguir siendo comprensible si el 3D no carga.
-   Respetar `prefers-reduced-motion`; no depender del movimiento para
    comunicar información.
-   Evitar que el objeto 3D bloquee CTA, texto o navegación.
-   Las animaciones pequeñas suelen durar 180--300 ms; entradas de
    sección, 300--500 ms. El giro del objeto 3D debe ser lento y
    discreto.
-   El contenido principal y los CTA no deben esperar a que se cargue el
    3D.

## 8. Rendimiento y accesibilidad

-   Cargar el 3D de forma diferida cuando sea razonable y evitar
    bloquear la renderización inicial.
-   Usar una alternativa estática para dispositivos de menor capacidad,
    errores de carga o movimiento reducido.
-   Comprimir y dimensionar imágenes; no cargar videos pesados
    automáticamente.
-   Evitar dependencias innecesarias y vigilar el tamaño del bundle.
-   Usar HTML semántico, jerarquía correcta de encabezados, foco
    visible, etiquetas descriptivas y contraste suficiente.
-   Añadir texto alternativo útil a imágenes informativas; las
    decorativas deben ignorarse por tecnologías de asistencia.
-   No comunicar estados solo mediante color.
-   Comprobar accesibilidad y rendimiento con herramientas disponibles
    antes de publicar.

## 9. Contenido y veracidad

El CV y los repositorios reales son la fuente de verdad. Antes de
publicar: - Verificar fechas, nombres de organizaciones, cargos,
formación y tecnologías. - Confirmar qué partes de cada proyecto fueron
realizadas por el propietario y cuáles fueron colaborativas. - Verificar
URLs de repositorios, demos y perfiles. - No inventar métricas,
resultados, usuarios, impacto comercial o disponibilidad. - Si un
proyecto no está desplegado, indicarlo de manera honesta y dar prioridad
a una demo grabada o capturas reales. - No publicar secretos, claves
API, datos personales de terceros ni información confidencial de
empleadores.

Proyectos iniciales previstos: **LicitAI** y **Flux**. Las
descripciones, funciones y stacks deben verificarse con los repositorios
y materiales reales antes de fijarlos en la web.

## 10. Contenido estructurado

Mantener el contenido separado de los componentes visuales. La
estructura debe permitir definir: - Perfil y datos de contacto. -
Experiencia laboral y formación. - Tecnologías agrupadas por
categoría. - Proyectos con slug, título, resumen, rol, estado, stack,
enlaces, secciones de caso de estudio, recursos visuales y orden. -
Metadatos SEO por ruta.

Los tipos deben ser explícitos con TypeScript. Evitar duplicar
manualmente el mismo dato en varias páginas.

## 11. SEO y publicación

-   Títulos y descripciones únicos por ruta.
-   Open Graph y metadatos sociales básicos.
-   URLs legibles y enlaces internos funcionales.
-   Favicon y metadatos de identidad cuando estén disponibles.
-   Configurar Vercel para que las rutas públicas funcionen directamente
    al recargarlas, según la estrategia de routing elegida.
-   No publicar hasta revisar enlaces, responsive, errores de consola,
    build y contenido final.

## 12. Criterios de aceptación del MVP

El MVP está listo cuando: - La página principal y los dos casos de
estudio se pueden visitar y recargar directamente. - La propuesta
profesional se entiende rápidamente y no está orientada a vender
servicios a clientes. - Los proyectos explican problema, solución,
decisiones y límites con información real. - El CV y los contactos
apuntan a recursos verificados. - El diseño es consistente con
`DESIGN-SYSTEM.md`. - El sitio es utilizable con teclado y en pantallas
móviles. - El contenido sigue siendo legible si el 3D falla o se
desactiva. - No hay errores críticos de consola ni enlaces rotos
conocidos. - El build de producción termina correctamente. - El
despliegue de Vercel se ha revisado en una URL real.

## 13. Pendientes que requieren confirmación

No bloquear la estructura inicial por estos puntos, pero mantenerlos
explícitos: - Nombre/wordmark final que aparecerá en la navegación. -
Textos definitivos de presentación. - Correo y perfiles públicos que se
mostrarán. - PDF definitivo del CV. - URLs reales de repositorios y
demos. - Capturas, video o GIF reales de LicitAI y Flux. - Confirmación
de roles, alcance, tecnologías y resultados de cada proyecto. - Decisión
futura sobre CMS/panel de administración.
