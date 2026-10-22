# LICITAI-CASE-STUDY.md
## Fuente de verdad del caso de estudio de LicitAI

**Estado:** especificación editorial y de implementación  
**Proyecto:** Portafolio profesional de Ricardo Andrade  
**Ruta pública objetivo:** `/proyectos/licitai`  
**Última actualización:** 2026-10-22

---

## 1. Propósito de este documento

Este documento define la fuente de verdad para el **contenido, narrativa, estructura y evidencias del caso de estudio de LicitAI** dentro del portfolio.

Claude Code debe usarlo para implementar la página de LicitAI manteniendo la misma estructura editorial, el lenguaje visual, el tono y los patrones de interacción del caso de estudio de Flux. No debe inventar contenido, sustituir evidencias reales por mockups ficticios ni reinterpretar la historia técnica del proyecto sin respaldo.

### Precedencia y relación con los documentos existentes

Este documento **no reemplaza globalmente** `SPEC.md`, `ROADMAP.md`, `DESIGN-SYSTEM.md`, `CLAUDE.md` ni el copy final de Home.

La jerarquía es:

1. `CLAUDE.md`: reglas persistentes de trabajo y seguridad para Claude Code.
2. `SPEC.md`: alcance general del producto, rutas, requisitos funcionales y arquitectura global del portfolio.
3. `DESIGN-SYSTEM.md`: tokens, tipografías, componentes, responsive y dirección visual global.
4. `ROADMAP.md`: fases de trabajo, prioridades y criterios de terminado.
5. `COPY-HOME-FINAL.md` (o el nombre exacto del copy final que ya exista): fuente de verdad del texto de Home.
6. `FLUX-CASE-STUDY.md`: fuente de verdad del caso de estudio de Flux y **referencia estructural, visual y editorial obligatoria** para LicitAI.
7. **`LICITAI-CASE-STUDY.md`: fuente de verdad específica del contenido, narrativa, claims y evidencias de LicitAI.**
8. Código, dossier técnico, videos, diagramas y capturas de LicitAI: fuentes de evidencia. Si contradicen este documento, marcar la discrepancia y solicitar revisión antes de publicar el claim.

### Relación entre Flux y LicitAI

Las páginas de Flux y LicitAI son **páginas hermanas** dentro del mismo portfolio. Deben compartir la lógica de composición y jerarquía editorial, la estructura de Hero y sus campos, el tono de copy, el tratamiento de etiquetas, stack, CTA, diagramas, capturas, videos y navegación, además de los patrones responsive, accesibilidad y componentes siempre que sea posible.

**Antes de implementar, inspeccionar `FLUX-CASE-STUDY.md`, la página y los componentes reales de Flux.** Reutilizar sus patrones estructurales y visuales; no inventar un layout alternativo para LicitAI. Las diferencias deben responder a las necesidades reales del proyecto, no a una preferencia estética nueva.

La página de Flux **no utiliza una imagen de portada en el Hero**. LicitAI tampoco debe tener una imagen de portada en el Hero. La composición debe apoyarse en los mismos campos tipográficos y editoriales que Flux.

No modificar el copy de Home ni otras páginas como parte de esta tarea, salvo que sea indispensable para enlazar correctamente con `/proyectos/licitai`. No alterar la dirección visual general ni rediseñar Flux.

---

## 2. Contexto del portfolio

El portfolio está orientado exclusivamente a conseguir empleo en desarrollo de software. El posicionamiento global es **Full Stack como perfil base, con Python e IA aplicada como diferenciador**.

La página de LicitAI debe demostrar capacidad para diseñar y construir un sistema de software completo: integración con fuentes externas, extracción y tratamiento de datos, uso controlado de un LLM, reglas de negocio, persistencia, interfaz y gestión de fallos. No debe presentarlo como una oferta comercial ni como una landing para captar clientes.

### Contribución personal

- **Rol:** desarrollo individual del proyecto de extremo a extremo.
- El autor tomó las decisiones y desarrolló la aplicación completa, apoyándose en herramientas asistentes de IA para codificación, principalmente Claude Code y también Gemini CLI.
- No presentar a las herramientas como autoras del proyecto ni atribuirles decisiones de producto. Tampoco es necesario convertir el uso de asistentes de codificación en un tema de la narrativa pública: el foco debe estar en el sistema construido y en las decisiones que el autor pueda explicar.
- No atribuirse validaciones de negocio, resultados de producción ni experiencia con usuarios reales que no estén confirmados.
- Si se describe una decisión técnica, el autor debe poder comprenderla y explicarla. Evitar convertir detalles de implementación no comprendidos en el argumento principal de empleabilidad.

### Entorno y estado

- **Estado demostrado:** ejecución local del prototipo.
- **Demo pública prevista:** se pretende desplegar una versión de solo lectura en Streamlit, con datos ya disponibles y sin permitir ejecutar sincronizaciones, scraping ni análisis nuevos desde la interfaz.
- La demo pública debe considerarse **pendiente hasta que exista una URL desplegada y se haya verificado su comportamiento**.
- La extracción de detalles mediante Selenium y las dependencias externas hacen que no se deba asumir que el flujo completo es apto para ejecutarse en Streamlit Cloud.
- No describir el proyecto como producción, servicio multiusuario o producto validado comercialmente.

---

## 3. Posicionamiento y resumen editorial

### Título recomendado

**LicitAI — Análisis y priorización de licitaciones**

### Resumen corto

LicitAI es un prototipo que reúne oportunidades de Mercado Público, filtra las que podrían ser relevantes para un perfil de negocio y utiliza IA para evaluar su adecuación, identificar riesgos y apoyar su priorización.

### Idea central del caso

**LicitAI combina datos de una fuente pública, extracción de información, análisis con IA y reglas explícitas para ayudar a revisar oportunidades de contratación pública.**

La idea debe demostrarse con la interfaz real, diagramas basados en el código y ejemplos de análisis. No basta con afirmarla.

### Tono

- Profesional, directo y técnicamente claro.
- Describir qué hace el sistema, cómo funciona y por qué se tomaron determinadas decisiones.
- Usar frases concretas y sobrias, como en Flux.
- Evitar grandilocuencia, jerga innecesaria, lenguaje de marketing y promesas de impacto no medidas.
- No utilizar expresiones como “revoluciona”, “transforma el mercado”, “lleva al siguiente nivel” o equivalentes.
- No afirmar que el score predice la probabilidad de ganar una licitación.
- No inventar métricas de ahorro, precisión, productividad, usuarios o impacto comercial.
- Describir LicitAI como prototipo funcional demostrado localmente, no como plataforma desplegada en producción.

---

## 4. Alcance prioritario de la página

Orden editorial recomendado. Mantener la estructura y el ritmo de Flux; no es obligatorio que cada punto sea una sección enorme.

1. Hero del caso de estudio.
2. Contexto, problema y objetivo.
3. Arquitectura y flujo de procesamiento.
4. Caso técnico: análisis de una oportunidad.
5. Modelo de scoring y tratamiento de la incertidumbre.
6. Interfaz y organización de oportunidades.
7. Decisiones técnicas y aprendizajes.
8. Fiabilidad y validación, tratadas de forma proporcionada.
9. Estado, limitaciones y siguientes pasos.
10. Navegación al resto del portfolio.

### Qué priorizar visualmente

- El flujo completo desde la API de Mercado Público hasta el resultado presentado en Streamlit.
- Una captura real del listado de oportunidades.
- Una captura real del detalle de análisis, con evidencia y riesgos legibles.
- La separación entre la evaluación de Gemini y el cálculo determinista del score en Python.
- Los estados del análisis y el manejo de información insuficiente.
- La arquitectura actual del prototipo.
- Decisiones concretas sobre datos, validación y fallos.

La interfaz debe servir para explicar el sistema. No convertir la página en una galería de pantallas ni en una lista de funciones.

### Sobre pruebas automatizadas

El dossier registra una suite de 257 pruebas automatizadas, pero el autor indica que Claude Code diseñó e implementó las pruebas y que todavía no domina en profundidad todos sus detalles. Por estrategia editorial:

- No convertir la cantidad de pruebas en el argumento principal del caso.
- No dedicar una sección extensa a describir la suite ni listar los módulos cubiertos uno por uno.
- Si se menciona la existencia de pruebas, hacerlo brevemente y solo después de confirmar que el autor puede explicar qué validan y qué no.
- No usar “257 tests” como titular, badge del Hero ni afirmación central.
- No presentar las pruebas automatizadas como prueba de precisión del modelo, validación con usuarios o garantía de funcionamiento en producción.
- Priorizar decisiones que el autor pueda explicar con seguridad: separar el cálculo del score del LLM, validar respuestas estructuradas, distinguir datos disponibles de información faltante y controlar fallos de integraciones.

---

## 5. Dirección visual específica

Seguir `DESIGN-SYSTEM.md` y, sobre todo, la implementación real de Flux. No crear un sistema paralelo.

- Mantener el universo visual editorial premium del portfolio: oscuro, azul y violeta, con profundidad y uso selectivo de glassmorphism cuando corresponda al sistema existente.
- Mantener las tipografías, jerarquías, anchuras de lectura, espaciados, etiquetas, composición y comportamiento responsive de Flux.
- Mantener la navegación y los componentes existentes.
- Evitar que LicitAI parezca una plantilla genérica de SaaS o un dashboard independiente.
- **No añadir una imagen al Hero.** Flux no la tiene; LicitAI debe respetar la misma composición de Hero basada en texto y campos editoriales.
- Las capturas deben mostrar LicitAI tal como existe. No rediseñar la aplicación dentro de una imagen ni falsificar funcionalidades.
- Se puede usar un marco editorial consistente con Flux para alojar capturas, pero sin alterar el significado de la evidencia.
- Usar diagramas vectoriales o componentes propios para arquitectura y scoring cuando sea posible; deben ser legibles, responsive y coherentes con el diseño del sitio.
- Animaciones discretas. Respetar `prefers-reduced-motion`.
- No usar imágenes de stock ni imágenes generadas como si fueran capturas auténticas de LicitAI.
- No incorporar una imagen decorativa de portada para llenar espacio vacío.

Si `DESIGN-SYSTEM.md` contiene valores distintos de los componentes implementados en Flux, no modificarlos silenciosamente. Informar del conflicto y proponer una actualización separada; no hacer una migración global dentro de esta tarea.

---

## 6. Narrativa y contenido propuesto

Los siguientes textos son una base editorial para implementar. Se pueden pulir para legibilidad, pero no se deben añadir afirmaciones técnicas no respaldadas. Mantener la extensión y el estilo de copy de Flux: claro, específico y sin lenguaje publicitario.

### 6.1 Hero

**No incluir imagen de portada.** Reproducir la estructura de campos del Hero de Flux.

**Eyebrow:** `DATA PROCESSING · APPLIED AI`  
(Confirmar la convención de idioma de los eyebrow en Flux y mantenerla. Si Flux usa etiquetas en inglés, conservar ese patrón.)

**Título:** `LicitAI — Análisis y priorización de licitaciones`

**Texto:**

Un prototipo que procesa oportunidades de Mercado Público y utiliza IA para evaluar su adecuación a un perfil de negocio, identificar riesgos y apoyar su priorización.

**Datos destacados:** `Python` · `Streamlit` · `Gemini API` · `Selenium`

No destacar SQLite como tecnología del Hero. La persistencia puede explicarse en la arquitectura, donde corresponde por su función. No añadir tecnologías que no estén presentes en el código actual.

**Rol:** `Desarrollo individual`

**Entorno:** `Ejecución local demostrada`

Si el componente de Hero de Flux no incluye estos dos campos como metadatos, no crear una variación visual nueva solo para agregarlos: seguir exactamente los campos y el patrón real de Flux. El rol y el estado de ejecución pueden aparecer en el bloque de metadatos que corresponda dentro de la estructura existente.

**CTA primario:** `Explorar la arquitectura`  
Debe llevar a la sección de arquitectura, siguiendo el comportamiento del CTA equivalente en Flux.

**CTA secundario:** `Ver demostración`  
Puede mostrarse porque el autor generará una grabación real. Integrarlo únicamente cuando el video exista en los assets y se haya comprobado que reproduce una ejecución auténtica. No inventar una URL ni dejar un CTA sin destino.

No mostrar métricas de rendimiento, usuarios, precisión, ahorros ni disponibilidad de producción.

### 6.2 Contexto y desafío

**Título:** `Revisar licitaciones requiere algo más que encontrar coincidencias`

**Texto:**

Mercado Público publica oportunidades que una empresa proveedora debe revisar y contrastar con sus capacidades. LicitAI automatiza parte de esa revisión: filtra oportunidades según un perfil de negocio, extrae información de las fichas y genera un análisis estructurado para ayudar a decidir cuáles conviene estudiar.

El problema no es solo encontrar palabras clave. También hay que distinguir requisitos, riesgos e información que todavía no está disponible.

Verificar la redacción final contra el dossier y el comportamiento actual. Si se usa una cifra sobre el volumen de publicaciones diarias, debe presentarse como una observación de ejecuciones concretas, no como un promedio representativo si no existe evidencia suficiente.

No afirmar que LicitAI toma la decisión de postular ni que reemplaza la revisión humana.

### 6.3 Arquitectura y flujo de procesamiento

**Título:** `De una publicación a un análisis estructurado`

Explicar el flujo por responsabilidades:

1. **Fuente:** consulta de oportunidades publicadas mediante la API de Mercado Público.
2. **Filtrado:** aplicación de palabras clave y condiciones del perfil para reducir el conjunto de oportunidades.
3. **Extracción:** Selenium obtiene información adicional de la ficha pública, que no está disponible en el listado inicial de la API.
4. **Análisis:** Gemini evalúa la información disponible con una rúbrica y devuelve una respuesta estructurada.
5. **Cálculo y validación:** Python valida el resultado y calcula el score y el estado según las reglas implementadas.
6. **Persistencia:** los datos y análisis se almacenan para su consulta e historial.
7. **Interfaz:** Streamlit presenta oportunidades, análisis, favoritas, archivo, cola de procesamiento, panorama y perfil.

**Diagrama requerido:** `licitai-processing-flow.svg`

El diagrama debe derivarse del código actual. No confundir el flujo real con la arquitectura Full Stack futura. Incluir solo componentes que existen en la versión documentada.

### 6.3.1 Modelo de datos

**Título sugerido:** `Cómo se organiza la información`

Incluir un diagrama del **modelo de datos real de la versión actual**, para mostrar criterio de diseño más allá de la interfaz y del uso de IA. Debe representar las entidades/tablas relevantes, sus relaciones y las claves principales cuando se puedan confirmar en el código. Mantenerlo legible y editorial; mostrar solo lo necesario para entender cómo LicitAI organiza oportunidades, análisis, perfiles y demás conceptos que efectivamente existan.

**Recurso requerido:** `licitai-data-model.svg`

**Instrucciones para Claude Code:**
- Inspeccionar el esquema SQLite real, las instrucciones de creación/migración de tablas y las consultas en `core/database_mgr.py` (o sus rutas equivalentes en el repositorio actual). Seguir también las referencias a esos datos desde el resto del código.
- Derivar tablas, campos y relaciones únicamente de evidencia encontrada en el código o en el esquema. No inferir relaciones solo porque los nombres parezcan relacionados.
- Distinguir relaciones explícitas por claves foráneas de relaciones lógicas que el código mantiene sin una restricción declarada.
- No presentar el modelo de datos de una futura arquitectura V2 como si estuviera implementado. No proponer una migración a PostgreSQL como parte de este diagrama.
- Si el esquema real no está disponible o hay dudas que no puedan resolverse, no inventar el diagrama: informar qué archivo o fragmento concreto hace falta y dejar el recurso pendiente.
- El diagrama debe explicar el modelo, no mostrar datos reales de personas, credenciales, registros sensibles ni grandes listas de campos de poco valor narrativo.

### 6.4 Caso técnico principal: análisis de una oportunidad

**Título:** `Un score debe explicar de dónde viene`

Mostrar una oportunidad real o un ejemplo público de datos que pueda compartirse. La captura debe permitir entender:

- Qué oportunidad se está evaluando.
- Qué información de la ficha está disponible.
- Qué criterios se evalúan.
- Qué evidencia respalda las notas.
- Qué riesgos o requisitos requieren atención.
- Qué estado se asigna al análisis y por qué.

**Secuencia visual recomendada:**

1. La oportunidad entra al sistema desde la fuente.
2. El perfil de negocio se usa para determinar si merece análisis.
3. Se extrae la información adicional de la ficha.
4. Gemini produce una evaluación estructurada.
5. Python valida y calcula el resultado.
6. La interfaz presenta el score, el estado y los antecedentes relevantes.

**Recursos:** captura real del listado y captura real del detalle de análisis. No usar capturas inventadas ni modificar el score para que el ejemplo parezca mejor.

Si el ejemplo se basa en datos simulados, marcarlo como tal. Si se basa en una licitación pública real, comprobar que no se expongan secretos, información privada del perfil ni datos de terceros que no deban publicarse.

### 6.5 Modelo de scoring y tratamiento de la incertidumbre

**Título:** `La IA evalúa; el código calcula`

**Texto base:**

Gemini entrega una evaluación por criterio junto con la evidencia disponible. Python calcula el resultado final y aplica las reglas de estado. Así, el score no depende de una cifra total generada libremente por el modelo.

El modelo de evaluación contempla cinco criterios ponderados:

- Compatibilidad comercial: 35 %.
- Requisitos obligatorios: 25 %.
- Capacidad de cumplimiento: 20 %.
- Viabilidad geográfica y logística: 10 %.
- Viabilidad económica y contractual: 10 %.

Las ponderaciones y la interpretación deben contrastarse con `core/rubrica.py` y el dossier antes de publicarse. No duplicar valores en componentes si ya están disponibles desde una fuente de contenido tipada.

Explicar de forma visual y breve:

- **Definitivo:** la evaluación cumple las condiciones de cobertura definidas por la rúbrica.
- **Provisional:** existe información útil, pero faltan antecedentes no esenciales para cerrar la evaluación.
- **No elegible:** se ha confirmado un incumplimiento excluyente.
- **Evaluación insuficiente:** falta información crítica o no se pudo obtener una respuesta válida.

Usar las etiquetas exactas que presenta la aplicación en su interfaz actual. No traducirlas ni renombrarlas de manera inconsistente.

**Diagrama requerido:** `licitai-scoring-model.svg`

Debe mostrar los cinco criterios, sus ponderaciones, la contribución de Gemini y el cálculo/reglas que se ejecutan en Python. Incluir los estados de salida solo si pueden representarse con claridad sin sobrecargar el diagrama.

**Límites que deben explicitarse:**

- El score expresa adecuación al perfil según la rúbrica; **no es una probabilidad de ganar la licitación**.
- La rúbrica no debe presentarse como calibrada científicamente ni validada con una muestra representativa de evaluaciones humanas.
- Las evaluaciones humanas existentes en la base de desarrollo incluyen registros simulados; no describirlas como feedback de usuarios reales.
- El riesgo de pago y la urgencia deben explicarse como señales separadas si la versión actual los muestra así; no incluirlos dentro del score si el código no lo hace.

### 6.6 Interfaz y organización de oportunidades

**Título:** `Una vista para revisar, priorizar y volver al análisis`

Mostrar la interfaz real de Streamlit con una o dos capturas, seleccionadas por valor narrativo:

- Listado de oportunidades.
- Detalle del análisis.
- Opcionalmente, la cola de procesamiento o el panorama analítico, si ayudan a explicar una capacidad importante.

No es necesario mostrar todas las vistas. Elegir capturas limpias, consistentes y legibles, con datos coherentes entre sí.

La demo pública prevista en Streamlit debe ser **de solo lectura**: mostrar datos ya disponibles y no permitir que el visitante ejecute sincronizaciones, scraping, análisis de Gemini o acciones que consuman recursos externos. No considerar la demo lista hasta que esté desplegada y comprobada.

No hacer que el caso de estudio dependa de que la demo pública ya esté disponible. Si todavía no existe, la grabación real puede ser el CTA secundario y el estado de despliegue se mantiene como pendiente.

### 6.7 Decisiones técnicas y aprendizajes

**Título:** `Controlar lo que la IA puede afirmar`

Seleccionar tres o cuatro decisiones relevantes, cada una con este formato:

- **Decisión**
- **Motivo verificable**
- **Cómo está implementada**
- **Trade-off o límite**

Candidatos a verificar en el código:

1. **Separar evaluación y cálculo:** Gemini aporta notas y evidencia; Python calcula el score y aplica las reglas.
2. **Validar la respuesta estructurada:** comprobar el contrato de salida antes de almacenar o presentar un análisis.
3. **Distinguir falta de información de compatibilidad:** la ausencia de evidencia no debe convertirse automáticamente en una nota favorable.
4. **Conservar trazabilidad:** guardar la versión del modelo/prompt/perfil y el historial según lo implementado.
5. **Manejar fallos externos:** reintentos, límites y control de ejecuciones simultáneas, solo si el autor puede explicar el comportamiento y la implementación actual lo confirma.

Priorizar decisiones que el autor pueda defender en una entrevista técnica. No inventar alternativas consideradas ni justificar decisiones con motivos que el autor no haya confirmado. No presentar como aprendizaje personal profundo una explicación que solo se haya inferido de los tests generados por un asistente.

### 6.8 Fiabilidad y validación

**Título:** `Los fallos externos forman parte del flujo`

Esta sección debe ser breve y subordinada a la arquitectura y las decisiones técnicas. No crear un bloque visual centrado en “257 tests”.

Explicar, si se confirma con el autor y el código:

- Las respuestas de Gemini se validan antes de usarse.
- Los errores de API, extracción y análisis tienen tratamiento explícito.
- El flujo aplica límites y controles para evitar ejecuciones simultáneas o reintentos sin límite.
- Existe una suite de pruebas automatizadas, pero no debe describirse como evidencia de precisión del score ni de funcionamiento en producción.

No enumerar archivos de tests, no atribuir cobertura completa ni detallar internals que el autor no esté preparado para explicar. Si se decide mencionar la suite, usar una formulación sobria y verificar primero qué significa la última ejecución documentada. No usar el número de tests como badge, claim principal o destacado del Hero.

### 6.9 Estado, limitaciones y siguientes pasos

**Título:** `Un prototipo funcional con límites identificados`

Distinguir claramente entre capacidades implementadas, demostradas localmente y previstas.

**Implementado o documentado en la versión actual:**

- Consulta de oportunidades desde la API de Mercado Público.
- Filtrado basado en el perfil.
- Extracción de información de las fichas mediante Selenium.
- Análisis estructurado con Gemini.
- Rúbrica de cinco criterios y cálculo del score en Python.
- Interfaz Streamlit para consultar y organizar oportunidades.
- Gestión de historial y trazabilidad en el alcance confirmado por el código.

**Limitaciones relevantes:**

- La ejecución completa se ha demostrado localmente; no insinuar que el sistema ya está desplegado en producción.
- La calidad del score no se ha validado con una muestra representativa de evaluaciones humanas.
- El análisis de bases de licitación en PDF no está implementado en esta versión.
- El SDK de Gemini utilizado está marcado como sin soporte por su proveedor; no afirmar que la migración está hecha.
- No hay integración continua (CI) configurada.
- Las evaluaciones simuladas no son evidencia de uso o validación por usuarios.
- El flujo completo depende de servicios externos y de Selenium/Chrome, por lo que la demo pública prevista no permitirá ejecutar análisis nuevos.

**Siguientes pasos posibles:**

- Publicar una demo Streamlit de solo lectura con datos curados.
- Incorporar análisis de bases PDF con referencias a las fuentes.
- Evaluar la rúbrica con criterios humanos y un conjunto de casos representativo.
- Diseñar una futura arquitectura Full Stack separando frontend, API, persistencia y trabajos asíncronos.

Estas mejoras son propuestas, no funcionalidades actuales. No insinuar que ya están desarrolladas. No presentar una V2 Full Stack como parte de este caso de estudio si no existe implementación que la respalde.

### 6.10 Cierre y navegación

Seguir el cierre de Flux y los patrones existentes de navegación entre proyectos.

Incluir los enlaces que realmente existan:

- Repositorio de LicitAI.
- Volver a proyectos.
- Proyecto Flux como caso de estudio relacionado.
- Demo de solo lectura, solo cuando esté desplegada y validada.
- Video de demostración, solo cuando el archivo real esté disponible.

No inventar URLs. No dejar botones o CTA sin destino. Si la demo aún está pendiente, no mostrar un enlace falso ni etiquetar como disponible una funcionalidad futura.

---

## 7. Fuentes de evidencia disponibles

### A. Dossier técnico de LicitAI

Archivo aportado: `LICITAI_PROJECT_DOSSIER(1).md`.

Es la fuente principal para entender el estado de la versión documentada, el flujo, la rúbrica, las integraciones, las limitaciones y el nivel de verificación. El dossier identifica qué afirmaciones proceden de código, tests, ejecución real, datos, historial, inferencia o propuesta.

No asumir que una afirmación documentada sigue siendo cierta si el código actual la contradice. Contrastar las secciones relevantes con el repositorio de LicitAI.

### B. Repositorio de LicitAI

Repositorio público indicado para revisar: `https://github.com/randradev/LicitAI` (**verificar la URL y el nombre real del repositorio antes de publicar el enlace**).

Usarlo para contrastar la rama principal, módulos y documentación. No asumir que el repositorio remoto contiene archivos locales no versionados.

Archivos y componentes relevantes mencionados en el dossier:

- `core/rubrica.py`: cálculo y reglas de la rúbrica.
- `core/ai_analyst.py`: prompt e integración de análisis con Gemini.
- `core/parsing.py`: extracción y tratamiento de datos.
- `core/database_mgr.py`: persistencia y acceso a los datos.
- `web/app.py` y módulos de `web/`: interfaz Streamlit, según la estructura real del repositorio.
- `tests/`: pruebas automatizadas, que deben inspeccionarse solo en la medida necesaria para no hacer claims que el autor no pueda explicar.

La lista anterior es una guía de búsqueda, no una garantía de que las rutas sigan exactamente iguales.

### C. Rúbrica de scoring

Archivo relacionado: `licitai-scoring-rubrica-v1.md`, si está presente en el repositorio o entre los recursos disponibles.

Contrastar las ponderaciones, los estados y sus reglas con `core/rubrica.py`. Si la especificación y la implementación difieren, no elegir una versión en silencio: documentar la discrepancia y pedir confirmación antes de publicar una explicación definitiva.

### D. Capturas y grabaciones reales

El autor puede generar grabaciones auténticas de la ejecución local. Deben usarse para demostrar el flujo real y, si se elige un video para el CTA, servir de destino para `Ver demostración`.

No usar grabaciones generadas, interfaces ficticias ni montajes que alteren el comportamiento observado.

### E. Datos de ejemplo

El dossier distingue datos públicos de licitaciones, perfiles ficticios y evaluaciones simuladas. Mantener esa distinción en el copy y en los assets. No presentar datos simulados como actividad de usuarios reales.

---

## 8. Organización de los recursos para Claude Code

Claude Code debe buscar primero si ya existen recursos de LicitAI dentro del repositorio del portfolio. No duplicarlos si están bien organizados. La estructura debe seguir el patrón que ya se utiliza para los assets de Flux.

**Importante:** no crear una imagen de portada para el Hero. La página de Flux no la utiliza; LicitAI debe seguir la misma estructura.

Si no existe una estructura adecuada, proponer o crear la siguiente organización después de la auditoría:

```text
public/
  media/
    projects/
      licitai/
        README.md
        architecture/
          licitai-processing-flow.svg
          licitai-data-model.svg
          licitai-scoring-model.svg
          licitai-current-architecture.svg
        screenshots/
          licitai-opportunities.png
          licitai-analysis-detail.png
          licitai-processing-queue.png
          licitai-analytics-overview.png
        videos/
          licitai-demo.mp4
          licitai-demo-poster.webp
        code/
          scoring-excerpt.txt
          structured-analysis-excerpt.txt
```

No crear archivos vacíos ni copiar todos los materiales automáticamente. Usar solo los recursos que existan y tengan valor narrativo. El diagrama de arquitectura actual es recomendado si aporta algo distinto del diagrama de procesamiento; si ambos se solapan, priorizar claridad antes que cantidad.

### Recursos que debe preparar el autor

| Prioridad | Insumo | Formato preferido | Qué debe demostrar |
|---|---|---|---|
| Imprescindible | Captura del listado de oportunidades | PNG original | Cómo se presentan y organizan las oportunidades |
| Imprescindible | Captura del detalle de análisis | PNG original | Score, estado, evidencia, riesgos y criterios |
| Imprescindible | Diagrama del flujo de procesamiento | SVG | Desde la API hasta la interfaz |
| Imprescindible | Diagrama del modelo de datos actual | SVG | Entidades/tablas y relaciones confirmadas en el esquema real |
| Imprescindible | Diagrama del modelo de scoring | SVG | Criterios, ponderaciones, cálculo Python y estados |
| Recomendado | Captura de cola o panorama | PNG original | Una capacidad adicional solo si ayuda a explicar el sistema |
| Recomendado | Diagrama de arquitectura actual | SVG | Componentes reales y sus relaciones, sin mezclar la V2 |
| Recomendado | Video de demostración real | MP4 H.264 | Recorrido breve por una ejecución local auténtica |
| Opcional | Fragmento de código de scoring | TXT o MD | Cálculo en Python, solo si es breve y el autor puede explicarlo |
| Opcional | Fragmento de validación estructurada | TXT o MD | Validación de respuesta, si aporta evidencia comprensible |
| Opcional | Poster del video | WebP | Vista previa del video; no es una portada del Hero |

No es necesario producir todos los recursos opcionales. Primero reunir las dos capturas principales, los dos diagramas requeridos y el video real.

### Guía para capturas y video

- Capturar la aplicación real con un tamaño de ventana consistente y suficiente resolución para leer los detalles.
- Seleccionar datos coherentes entre capturas: si se muestra la misma licitación en el listado y en el análisis, debe corresponder al mismo registro.
- Evitar datos temporales, mensajes de depuración, paneles de desarrollo y elementos accidentales.
- No modificar puntuaciones, riesgos ni resultados para que el sistema parezca más efectivo.
- Si se usa un perfil ficticio o una evaluación simulada, registrarlo en `README.md` y marcarlo cuando pueda cambiar la interpretación de la evidencia.
- El video puede durar aproximadamente 30–45 segundos si ese tiempo permite demostrar el flujo sin aceleraciones engañosas. Mostrar listado, detalle de análisis y explicación del score; no es necesario mostrar cada pantalla.
- No publicar credenciales, tickets, claves, `.env`, rutas privadas ni información que no deba hacerse pública.

### Privacidad y seguridad de los recursos

Antes de publicar capturas, videos, logs o archivos:

- Ocultar tokens, claves, tickets de API, URLs privadas y credenciales.
- Revisar que no se muestren variables de entorno ni archivos de configuración con secretos.
- No publicar bases de datos de desarrollo completas, dumps, sesiones ni archivos privados como parte del bundle público.
- Revisar datos del perfil y distinguir claramente los perfiles ficticios de cualquier dato personal.
- No incluir documentación interna que no sea necesaria para entender el proyecto.
- Si un recurso necesita saneamiento y no puede hacerse de forma segura, no publicarlo; dejarlo registrado como pendiente.

### Índice de recursos

`public/media/projects/licitai/README.md` debe registrar para cada recurso:

- Nombre del archivo.
- Procedencia (captura local, diagrama derivado del código, grabación, etc.).
- Qué demuestra.
- Fecha de creación o versión de la aplicación cuando sea relevante.
- Si contiene datos simulados o reales.
- Estado de revisión de privacidad.
- Sección de la página en la que se utilizará.

---

## 9. Contrato de implementación para Claude Code

### Fase A — Auditoría antes de tocar UI

Antes de editar:

1. Leer `CLAUDE.md`, `SPEC.md`, `DESIGN-SYSTEM.md`, `ROADMAP.md`, el copy final de Home, `FLUX-CASE-STUDY.md` y este documento.
2. Inspeccionar el estado real del repositorio del portfolio: framework, router, componentes, tokens, tipografías, rutas de proyectos, página de Flux y recursos multimedia.
3. Revisar `FLUX-CASE-STUDY.md` y la implementación real de Flux para identificar exactamente la estructura del Hero, los metadatos, los CTA, los bloques editoriales, la composición de capturas y diagramas, la navegación y el cierre.
4. Inspeccionar el código de LicitAI y contrastarlo con `LICITAI_PROJECT_DOSSIER(1).md`. No ejecutar operaciones que puedan modificar datos, consumir cuotas externas o exponer credenciales sin autorización.
5. Confirmar los módulos, flujo, ponderaciones, estados, stack y limitaciones de la versión actual.
6. Inspeccionar expresamente el esquema SQLite, las definiciones de tablas y las consultas para documentar el modelo de datos real. Crear `licitai-data-model.svg` a partir de esa evidencia; si no es suficiente, indicar exactamente qué esquema o archivo falta y pedirlo al autor. No hace falta que el autor prepare manualmente el diagrama si el esquema ya está en el repositorio. No solicitar ni incluir una base de datos con datos personales o credenciales: basta con el esquema saneado.
7. Elaborar una matriz interna de claims/evidencias con estados `confirmado en código`, `demostrado en ejecución local`, `documentado pero no verificado`, `simulado` o `pendiente`.
8. Identificar qué recursos existen, cuáles faltan y cuáles debe preparar el autor.
9. Presentar un plan breve con archivos que pretende modificar y cualquier contradicción relevante.

No implementar todavía si la auditoría revela afirmaciones importantes contradictorias que no se pueden resolver.

### Fase B — Implementación de la página

Una vez completada la auditoría:

1. Implementar la ruta `/proyectos/licitai` siguiendo el mismo patrón de datos y componentes que Flux.
2. Mantener la misma estructura del Hero que Flux. **No añadir imagen de portada.**
3. Reutilizar componentes, tokens, fuentes, routing, transiciones y patrones del portfolio.
4. Mantener el contenido separado de los componentes visuales mediante datos tipados, siguiendo la arquitectura existente.
5. Integrar únicamente recursos reales disponibles, saneados y relevantes.
6. Construir los diagramas de flujo, modelo de datos y scoring a partir de la versión de código comprobada. El modelo de datos debe distinguir relaciones declaradas de relaciones lógicas inferidas del código.
7. Usar el CTA `Ver demostración` solo cuando exista una grabación real disponible y un destino funcional.
8. No mostrar una demo desplegada como disponible hasta que exista y se haya verificado. Si todavía no está lista, no inventar una URL ni bloquear la página por ello.
9. No convertir las pruebas automatizadas en el foco del caso. No destacar la cantidad de tests; priorizar decisiones técnicas que el autor pueda explicar.
10. Mantener el tono de Flux: directo, preciso y sin claims de marketing.
11. Mantener responsive, accesibilidad, foco visible, teclado, contraste y `prefers-reduced-motion`.
12. No implementar backend, CMS ni panel de administración.
13. No instalar dependencias nuevas sin justificar la necesidad.
14. No rediseñar Home, Flux ni otros proyectos.
15. No modificar el diseño de la aplicación LicitAI para fabricar capturas que parezcan parte del portfolio.

### Fase C — Validación

Comprobar:

- La ruta `/proyectos/licitai` carga directamente y al recargar.
- La estructura del Hero, sus campos, el tono, los CTA y la composición visual son coherentes con Flux.
- El Hero no contiene imagen de portada.
- Los enlaces internos y externos son válidos.
- El layout en móvil, tablet y escritorio no presenta scroll horizontal involuntario.
- Las imágenes y videos tienen dimensiones adecuadas, poster/fallback y controles accesibles.
- Los diagramas se entienden en móvil y escritorio.
- No se muestran recursos privados ni secretos.
- Los textos públicos no incluyen claims pendientes, métricas inventadas ni funcionalidades futuras descritas como actuales.
- La existencia de una demo se comunica correctamente: local demostrada o pública desplegada, según el estado real.
- Build, lint y pruebas existentes, si están configurados. Informar exactamente qué se ejecutó y sus resultados.

Al terminar, informar archivos modificados, decisiones, comprobaciones, resultado y pendientes.

---

## 10. Criterios de aceptación

El trabajo se considera listo cuando:

- [ ] Existe un caso de estudio de LicitAI coherente con el diseño del portfolio.
- [ ] LicitAI y Flux se perciben como páginas hermanas: estructura, composición, tono, jerarquía editorial y navegación consistentes.
- [ ] El Hero utiliza los mismos campos y patrones que Flux, sin imagen de portada.
- [ ] El Hero presenta un stack pertinente sin destacar SQLite.
- [ ] La contribución se describe como desarrollo individual, sin atribuir el proyecto a las herramientas asistentes.
- [ ] El entorno se describe como ejecución local demostrada; una demo pública solo se menciona como disponible cuando realmente esté desplegada y verificada.
- [ ] La arquitectura se basa en el código actual, sin mezclarla con la futura V2.
- [ ] El modelo de datos se deriva del esquema SQLite y del código reales; las tablas y relaciones mostradas están verificadas.
- [ ] El flujo API → filtros → extracción → Gemini → cálculo/validación Python → persistencia → Streamlit está representado correctamente.
- [ ] El scoring explica las ponderaciones y estados de acuerdo con la implementación actual.
- [ ] El score no se describe como probabilidad de ganar ni como precisión validada.
- [ ] Las limitaciones relevantes se comunican de forma directa.
- [ ] Las pruebas automatizadas se tratan de forma proporcionada y no son el argumento principal.
- [ ] Los recursos tienen procedencia clara y fueron revisados por privacidad.
- [ ] No se inventaron métricas, resultados comerciales, usuarios ni capacidades de producción.
- [ ] El contenido está separado de los componentes y tipado conforme al patrón existente.
- [ ] No se alteraron Home, Flux, la dirección visual global ni otros proyectos.
- [ ] Se ejecutaron las comprobaciones disponibles y se reportaron honestamente.

---

## 11. Instrucción de inicio para Claude Code

Al recibir esta tarea, **no empieces implementando la página ni generando recursos automáticamente**.

Primero audita el portfolio y las fuentes de LicitAI, con especial atención a la página y al documento de Flux. Presenta:

1. Estado actual de la ruta de LicitAI y de la estructura de datos de proyectos.
2. Estructura real del Hero de Flux y componentes que deben reutilizarse.
3. Diferencias estructurales y de contenido que LicitAI necesita por ser un proyecto distinto.
4. Esquema de datos real identificado en el código y plan para producir `licitai-data-model.svg`; si no se puede confirmar, indicar el archivo o esquema saneado que debe proporcionar el autor.
5. Matriz de claims/evidencias basada en el código y el dossier.
6. Lista exacta de recursos existentes, faltantes y los que debe recolectar el autor.
7. Confirmación de que el Hero no llevará imagen de portada.
7. Confirmación de cómo se tratará el CTA de demostración y el estado de la demo Streamlit.
8. Plan de implementación por archivos y posibles bloqueos.

Después de presentar ese diagnóstico, espera confirmación antes de modificar la UI si hay decisiones o contradicciones relevantes pendientes. Si no hay bloqueos y el usuario ya autorizó explícitamente la implementación, procede en incrementos pequeños según `CLAUDE.md` y `ROADMAP.md`.

**Regla final:** este archivo es la fuente de verdad del contenido y la estructura del caso de estudio de LicitAI. `FLUX-CASE-STUDY.md` es la referencia estructural, visual y editorial obligatoria. Las dos páginas deben sentirse como hermanas del mismo portfolio. No inventar hechos, no crear una portada visual que Flux no tiene, no exagerar las pruebas ni cambiar el resto del portfolio.
