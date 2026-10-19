# FLUX-CASE-STUDY.md
## Fuente de verdad del caso de estudio de Flux

**Estado:** especificación editorial y de implementación  
**Proyecto:** Portafolio profesional de Ricardo Andrade  
**Ruta pública objetivo:** `/proyectos/flux`  
**Última actualización:** 2026-10-17

---

## 1. Propósito de este documento

Este documento define la fuente de verdad para el **contenido, narrativa, estructura y evidencias del caso de estudio de Flux** dentro del portfolio.

Claude Code debe usarlo para implementar o adaptar la página de Flux. No debe inventar contenido, sustituir las evidencias reales por mockups ficticios ni reinterpretar la historia técnica del proyecto sin respaldo.

### Precedencia y relación con los documentos existentes

Este documento **no reemplaza globalmente** `SPEC.md`, `ROADMAP.md`, `DESIGN-SYSTEM.md`, `CLAUDE.md` ni el copy final de Home.

La jerarquía es:

1. `CLAUDE.md`: reglas persistentes de trabajo y seguridad para Claude Code.
2. `SPEC.md`: alcance general del producto, rutas, requisitos funcionales y arquitectura global del portfolio.
3. `DESIGN-SYSTEM.md`: tokens, tipografías, componentes, responsive y dirección visual global.
4. `ROADMAP.md`: fases de trabajo, prioridades y criterios de terminado.
5. `COPY-HOME-FINAL.md` (o el nombre exacto del copy final que ya exista en el repositorio): fuente de verdad del texto de Home.
6. **`FLUX-CASE-STUDY.md`: fuente de verdad específica del caso de estudio de Flux.** Para cualquier conflicto sobre la narrativa, secciones, contenido, claims y selección de evidencias de Flux, prevalece este documento.
7. Código, videos, diagramas, documentación técnica y capturas del proyecto Flux: fuentes de evidencia para verificar afirmaciones. Si contradicen un texto de este documento, no ocultar la discrepancia: marcarla y solicitar revisión antes de publicar el claim.

No modificar el copy de Home ni otras páginas como parte de esta tarea, salvo que sea indispensable para enlazar correctamente con `/proyectos/flux`. No alterar la dirección visual general aprobada.

## 2. Contexto del portfolio

El portfolio está orientado exclusivamente a conseguir empleo en desarrollo de software. El posicionamiento global es **Full Stack como perfil base, con Python e IA aplicada como diferenciador**.

La página de Flux debe demostrar especialmente la capacidad del autor para trabajar en backend e integración de IA. No debe presentarlo como una oferta comercial ni como una landing para captar clientes.

### Contribución personal

- Participación: trabajo individual con colaboración puntual.
- Foco personal: principalmente backend e IA.
- No atribuir automáticamente todo el frontend, diseño, arquitectura o trabajo del equipo al autor.
- Si el alcance exacto de una contribución no está confirmado por el código, el historial o el propio autor, usar formulaciones prudentes como “desarrollé principalmente…” o dejarlo pendiente.

## 3. Posicionamiento y resumen editorial

### Título recomendado

**Flux — Orquestación financiera conversacional**

### Resumen corto

Flux es un proyecto de banca digital conversacional que combina una interfaz web, una API backend, flujos de orquestación y lógica de negocio para guiar simulaciones y procesos de productos financieros.

### Idea central del caso

**No es solo un chatbot: es un sistema que coordina conversación, recuperación de conocimiento, estado de sesión, reglas financieras y pasos de formalización.**

Esta es la tesis narrativa principal. Debe demostrarse con diagramas, fragmentos de ejecución y código real; no basta con afirmarla.

### Tono

- Profesional, directo y técnicamente claro.
- Explicar decisiones de ingeniería con lenguaje comprensible para reclutadores y responsables técnicos.
- Evitar grandilocuencia, jerga innecesaria, claims de producción no demostrados y métricas inventadas.
- Describir Flux como proyecto/prototipo académico o experimental cuando corresponda; no insinuar que es una plataforma bancaria desplegada en producción.

## 4. Alcance prioritario de la página

Orden editorial recomendado:

1. Hero del caso de estudio.
2. Contexto, problema y objetivo.
3. Arquitectura del backend y orquestación.
4. Caso técnico: consulta RAG durante el flujo de crédito.
5. Flujo de crédito de consumo.
6. Flujo de depósito a plazo.
7. Seguridad y formalización: OTP y generación de PDF.
8. Decisiones técnicas y aprendizajes.
9. Estado, limitaciones y siguientes pasos.
10. Navegación al resto del portfolio.

No es obligatorio convertir cada punto en una sección enorme. Mantener una narrativa visual fluida y evitar bloques de texto excesivos.

### Qué priorizar visualmente

- Arquitectura y backend.
- Grafo de LangGraph, nodos, estado compartido y rutas condicionales.
- Evidencia real del RAG.
- Lógica financiera y validaciones.
- OTP y generación de contratos PDF.

La interfaz conversacional debe servir como contexto, no ser la única protagonista.

## 5. Dirección visual específica

Seguir `DESIGN-SYSTEM.md` sin crear un sistema paralelo.

- Mantener el universo visual editorial premium, oscuro, azul y violeta, con profundidad y uso selectivo de glassmorphism.
- Usar Space Grotesk para titulares, Raleway para lectura e IBM Plex Mono para etiquetas técnicas, logs y fragmentos de código, si estas son las tipografías ya validadas e implementadas en el repositorio.
- No reintroducir Inter ni cambiar globalmente las fuentes como parte de esta tarea.
- Mantener la navegación y componentes ya existentes.
- Evitar que la página parezca una plantilla genérica de SaaS o un dashboard.
- Usar diagramas vectoriales o componentes propios para arquitectura y flujos cuando sea posible; deben ser legibles, responsive y coherentes con el diseño del sitio.
- Animaciones discretas. Respetar `prefers-reduced-motion`.
- No usar imágenes de referencia generadas o de stock como si fueran capturas auténticas de Flux.

Si `DESIGN-SYSTEM.md` todavía contiene valores tipográficos anteriores, no modificarlo silenciosamente. Informar del conflicto y proponer una actualización separada; no hacer una migración global dentro de esta tarea.

## 6. Narrativa y contenido propuesto

Los siguientes textos son una base editorial para implementar. Se pueden pulir para legibilidad, pero no se deben añadir afirmaciones técnicas no respaldadas.

### 6.1 Hero

**Eyebrow:** `BACKEND ENGINEERING · CONVERSATIONAL AI`

**Título:** `Flux — Orquestación financiera conversacional`

**Texto:**
Una experiencia conversacional que coordina modelos de IA, recuperación de conocimiento y lógica financiera para guiar flujos de productos bancarios.

**Datos destacados:** `FastAPI` · `LangGraph` · `Python` · `RAG`

**CTA primario:** `Explorar la arquitectura`  
**CTA secundario:** `Ver demostración` — mostrar solo si se incorpora un video real accesible.

No mostrar cifras de rendimiento, usuarios, precisión, ahorros ni disponibilidad de producción.

### 6.2 Contexto y desafío

**Título:** `La conversación debía seguir reglas de negocio reales`

**Texto:**
El desafío consistía en coordinar una interacción conversacional con procesos financieros que requieren recopilar información, resolver dudas, validar condiciones y conducir al usuario por distintas etapas. La IA debía convivir con lógica determinista y controles explícitos, en lugar de sustituirlos.

Verificar esta formulación contra el repositorio y la documentación. No afirmar que el sistema se utilizó con clientes bancarios reales.

### 6.3 Arquitectura

**Título:** `Una conversación, múltiples responsabilidades`

Explicar la arquitectura por responsabilidades:

- **Interfaz y API:** entrada del usuario y comunicación con el backend.
- **Orquestación:** grafo de ejecución, nodos y rutas condicionales con LangGraph.
- **Estado:** estructura compartida que conserva datos y resultados del flujo.
- **IA y conocimiento:** interpretación de entradas y recuperación de contexto cuando corresponda.
- **Motores financieros:** cálculo y validación de reglas específicas de cada producto.
- **Formalización y servicios:** OTP, persistencia y generación documental, según el flujo.

La visualización debe derivarse del código real. No dibujar todas las conexiones del diagrama antiguo como si siguieran vigentes sin comprobarlas. Marcar explícitamente el gráfico como “arquitectura del proyecto” y, si solo refleja una versión concreta, indicar la versión/fecha cuando se conozca.

### 6.4 Caso técnico principal: RAG en el flujo de crédito

**Título:** `Una pregunta no debía romper el flujo`

**Texto:**
Durante la recopilación de datos para una solicitud de crédito, el usuario preguntó: “¿Qué es el CAE?”. En la grabación de la ejecución, el backend clasificó la entrada como pregunta, registró la recuperación de cinco documentos del producto `LOAN` y generó una respuesta contextualizada antes de continuar la conversación.

**Secuencia visual:**

1. El usuario plantea una duda dentro del flujo.
2. El sistema detecta que la entrada es una pregunta.
3. Se recuperan fragmentos de conocimiento asociados al producto.
4. El modelo responde usando el contexto recuperado.
5. La conversación puede continuar dentro del proceso financiero.

**Evidencia:** video real de consola/UI de la ejecución del 4 de mayo de 2026, archivo aportado en la conversación cuyo nombre comienza por `flux-project - Antigravity - credit.py 2026-05-04`.

**Importante:** la grabación demuestra ese comportamiento en esa ejecución. No publicar un claim de que la branch actual de GitHub lo implementa hasta localizar la implementación correspondiente. La cantidad de cinco documentos es una observación de esa ejecución, no una métrica de calidad. No presentar el score de similitud como porcentaje de precisión.

### 6.5 Crédito de consumo

**Título:** `Un flujo financiero con rutas explícitas`

Mostrar las etapas que se encuentren respaldadas por el código y los diagramas:

- Recolección de datos.
- Evaluación financiera y validaciones.
- Presentación de oferta o rechazo, según el resultado.
- Aceptación y autenticación cuando corresponda.
- Formalización y generación de contrato.
- Manejo de excepciones y salidas alternativas.

Representar las decisiones mediante un diagrama legible. Diferenciar errores técnicos, rechazos de política y estados completados solo si la versión de código seleccionada realmente lo hace.

No afirmar que el sistema aprueba créditos reales ni que el motor equivale a un modelo de riesgo bancario validado.

### 6.6 Depósito a plazo

**Título:** `Reglas específicas para un segundo producto financiero`

Mostrar la separación de lógica de negocio para depósitos a plazo y las etapas de validación, simulación/cálculo y formalización que puedan verificarse.

El historial local contiene una branch `feat/dap` y commits relacionados con el motor de inversión y su integración. La página debe basarse en la versión concreta que se elija tras la auditoría. No presentar funciones presentes solo en una branch experimental como si estuvieran en `main`.

### 6.7 Seguridad y formalización

**Título:** `La conversación también debe cerrar correctamente`

Explicar los pasos OTP y generación de PDF solo en el alcance demostrado por el código o las grabaciones.

Puede mencionarse ReportLab y el cálculo de SHA-256 si se confirma en la implementación. Describir SHA-256 como hash/verificación de integridad; no llamarlo firma digital legal ni afirmar no repudio sin evidencia específica.

### 6.8 Decisiones técnicas

Seleccionar tres o cuatro decisiones relevantes, cada una con el formato:

- **Decisión**
- **Motivo verificable**
- **Cómo está implementada**
- **Trade-off o límite**

Candidatos a verificar: grafo explícito con LangGraph, estado estructurado, separación entre orquestación y motor financiero, recuperación RAG dentro del flujo, manejo de errores de negocio, generación documental.

No inventar alternativas consideradas ni justificar decisiones con razones que el autor no haya confirmado.

### 6.9 Resultados y aprendizajes

No hay métricas cuantitativas confirmadas. Usar resultados cualitativos respaldados por código y pruebas funcionales, por ejemplo:

- Integración de una consulta de conocimiento dentro de una conversación de crédito, demostrada en video.
- Separación de la orquestación conversacional y lógica de cálculo en los módulos donde el código lo confirme.
- Desarrollo de flujos para crédito y depósito a plazo, en la versión comprobada.
- Aprendizajes sobre estado conversacional, rutas condicionales, validaciones y límites de integrar IA en procesos estructurados.

No convertir estos ejemplos en afirmaciones definitivas hasta terminar la auditoría del código.

### 6.10 Estado y limitaciones

Describir de forma transparente el estado comprobado de la versión documentada. Distinguir:

- Funcionalidad demostrada en una grabación.
- Funcionalidad implementada en la versión de código elegida.
- Funcionalidad documentada pero no verificada.
- Funcionalidad prevista o incompleta.

No publicar detalles técnicos que generen confusión sin contexto. No esconder limitaciones relevantes, pero tampoco declarar que una funcionalidad nunca existió solo porque falta en la branch pública actual.

## 7. Fuentes de evidencia disponibles

### A. Repositorio público

`https://github.com/randradev/flux-project`

Usarlo para enlaces públicos y contraste con `main`. No asumir que es la versión más reciente.

### B. Repositorio local aportado como ZIP

Archivo recibido: `flux-project.zip`.

El ZIP incluye historial Git local, branches y commits. Usarlo como fuente principal para localizar la implementación correspondiente a las grabaciones. No publicar ni subir el archivo completo ni secretos del repositorio.

Branches/historial que ya dieron pistas:
- `feat/fase2-dev1-credito-consultas`: commits relacionados con integración RAG en nodos de extracción y `PRE_APPROVED`.
- `feat/dap`: commits relacionados con motor de inversión, formalización e integración de depósitos a plazo.

Estas pistas no sustituyen la revisión de los archivos y commits concretos.

### C. Diagrama de arquitectura

`https://github.com/randradev/flux-project/blob/main/documentacion-gral/arquitectura-diagrama.md`

Usarlo como referencia histórica. Comparar con el código de la versión seleccionada.

### D. Diagrama de crédito

`https://github.com/randradev/flux-project/blob/main/backend/docs/documentacion-backend/credito/credito-flujo.md`

Usarlo para entender la lógica prevista/representada y comprobar que coincide con el código.

### E. Video de consulta RAG

Archivo aportado: `flux-project - Antigravity - credit.py 2026-05-04 20-58-21.mp4` (usar el nombre real disponible en el repositorio de assets; el nombre exacto puede variar según cómo se copie).

Evidencia observada en la grabación: consulta “¿Qué es el CAE?”, clasificación como pregunta, recuperación registrada de cinco documentos del producto `LOAN` y respuesta contextualizada.

### F. Documentación técnica integral de Flux

PDF de 31 páginas, fechado el 8 de mayo de 2026, compartido en la conversación. Contrastar sus afirmaciones con el código local. No tratar la documentación como prueba suficiente de que todas las funcionalidades siguen implementadas.

## 8. Organización de los recursos para Claude Code

Claude Code debe buscar primero si ya existen recursos de Flux dentro del repositorio. No duplicarlos si están bien organizados.

Si no existe una estructura adecuada, crear:

```text
public/
  media/
    projects/
      flux/
        README.md
        architecture/
          flux-architecture.svg
          credit-flow.svg
          dap-flow.svg
        screenshots/
          flux-chat.png
          rag-console.png
          credit-flow.png
          dap-flow.png
          contract-pdf.png
        videos/
          rag-cae-demo.mp4
          credit-flow-demo.mp4
          dap-flow-demo.mp4
        code/
          state-excerpt.txt
          credit-engine-excerpt.txt
          dap-engine-excerpt.txt
          rag-retrieval-excerpt.txt
```

No crear archivos vacíos ni copiar todos los materiales automáticamente. Usar solo los recursos que existan y que tengan valor narrativo.

### Formatos recomendados

| Insumo | Formato preferido | Uso |
|---|---|---|
| Capturas de interfaz o consola | PNG, preferentemente resolución original | Evidencia real; recortar sin alterar el significado |
| Video de demostración | MP4 H.264, versión optimizada para web | Reproducir el flujo real; ofrecer poster y controles |
| Diagramas | SVG accesible y responsive; fuente Mermaid/Markdown si ya existe | Arquitectura y flujos técnicos |
| Fragmentos de código | TXT o MD con lenguaje y ruta de origen | Mostrar fragmentos cortos, legibles y contextualizados |
| Contrato de ejemplo | PDF saneado o captura PNG | Mostrar el resultado documental sin datos personales |
| Índice de assets | `README.md` o `ASSETS.md` | Registrar archivo, procedencia, fecha, qué demuestra y estado de privacidad |

No reexportar ni modificar un video de manera que parezca mostrar una ejecución diferente. Si se recorta un video, preservar el contexto necesario para que la evidencia siga siendo honesta.

### Privacidad y seguridad de los recursos

Antes de publicar capturas, videos, logs o PDFs:

- Eliminar u ocultar tokens, claves, URLs privadas, IDs sensibles y credenciales.
- Ocultar datos personales, nombres de terceros, correos, teléfonos y datos financieros identificables.
- No publicar `.env`, dumps de base de datos, checkpoints, sesiones, archivos de configuración con secretos ni repositorios completos de trabajo.
- Revisar los PDF de ejemplo y metadatos antes de publicarlos.
- No incluir en el bundle público archivos privados o documentación interna que no sea necesaria.

Si un recurso necesita saneamiento y no puede hacerse de forma segura, no publicarlo; dejarlo registrado como pendiente.

## 9. Contrato de implementación para Claude Code

### Fase A — Auditoría antes de tocar UI

Antes de editar:

1. Leer `CLAUDE.md`, `SPEC.md`, `DESIGN-SYSTEM.md`, `ROADMAP.md`, el copy final de Home y este documento.
2. Inspeccionar el estado real del repositorio del portfolio: framework, router, componentes, tokens, rutas de proyectos y recursos multimedia.
3. Localizar la implementación del caso Flux existente, si la hay. No reemplazarla antes de entenderla.
4. Revisar el código local de Flux y su historial disponible para identificar versiones de RAG, crédito y DAP que correspondan a las evidencias.
5. Elaborar una matriz interna de claims/evidencias con estados `confirmado en código`, `demostrado en video`, `documentado pero no verificado` o `pendiente`.
6. Presentar un plan breve con archivos que pretende modificar y cualquier contradicción relevante.

No implementar todavía si la auditoría revela afirmaciones importantes contradictorias que no se pueden resolver.

### Fase B — Implementación de la página

Una vez completada la auditoría:

1. Implementar o adaptar la ruta existente `/proyectos/flux`.
2. Mantener los componentes, tokens, fuentes, routing y patrones del portfolio.
3. Separar el contenido del componente visual mediante datos tipados, siguiendo la arquitectura existente.
4. Construir los diagramas técnicos a partir de la versión comprobada del código.
5. Integrar únicamente recursos reales disponibles, saneados y relevantes.
6. Añadir navegación entre secciones si mejora la lectura, sin convertirla en una interfaz compleja.
7. Mantener responsive, accesibilidad, foco visible, teclado, contraste y `prefers-reduced-motion`.
8. No implementar backend, CMS ni panel de administración.
9. No instalar dependencias nuevas sin justificar la necesidad.
10. No rediseñar Home ni otros proyectos.

### Fase C — Validación

Comprobar:

- La ruta `/proyectos/flux` carga directamente y al recargar.
- Enlaces internos y externos válidos.
- Layout en móvil, tablet y escritorio sin scroll horizontal involuntario.
- Imágenes y videos tienen dimensiones adecuadas, poster/fallback y controles accesibles.
- Los diagramas se entienden en móvil y escritorio.
- No se muestran recursos privados ni secretos.
- Los textos públicos no incluyen claims pendientes o métricas inventadas.
- Build, lint y pruebas existentes, si están configurados. Informar exactamente qué se ejecutó y sus resultados.

Al terminar, informar archivos modificados, decisiones, comprobaciones, resultado y pendientes.

## 10. Criterios de aceptación

El trabajo se considera listo cuando:

- [ ] Existe un caso de estudio de Flux coherente con el diseño del portfolio.
- [ ] La narrativa prioriza backend e IA, sin ocultar la contribución compartida.
- [ ] La arquitectura se basa en la versión de código seleccionada y sus conexiones se verificaron.
- [ ] La sección RAG usa la evidencia real de la consulta CAE y no la presenta como una métrica de calidad.
- [ ] Crédito y DAP se describen según lo que está implementado o demostrado, con versiones claramente diferenciadas cuando haga falta.
- [ ] OTP, PDF y SHA-256 se describen sin atribuir propiedades legales no demostradas.
- [ ] No hay estadísticas inventadas ni afirmaciones de producción sin evidencia.
- [ ] El contenido está separado de los componentes y tipado conforme al patrón existente.
- [ ] Los recursos tienen procedencia clara y fueron revisados por privacidad.
- [ ] No se alteraron Home, el copy final, la dirección visual global ni otros proyectos.
- [ ] Se ejecutaron las comprobaciones disponibles y se reportaron honestamente.

## 11. Instrucción de inicio para Claude Code

Al recibir esta tarea, **no empieces reescribiendo la página**.

Primero audita el portfolio y las fuentes de Flux, y presenta:

1. Estado actual de `/proyectos/flux`.
2. Estructura de componentes y datos que conviene reutilizar.
3. Matriz de evidencia para RAG, crédito, DAP, OTP y PDF.
4. Contradicciones entre documentación, branches y código.
5. Lista exacta de recursos disponibles y los que faltan.
6. Plan de implementación por archivos.

Después de presentar ese diagnóstico, espera confirmación antes de modificar la UI si hay decisiones o contradicciones relevantes pendientes. Si no hay bloqueos y el usuario ya autorizó explícitamente la implementación, procede en incrementos pequeños según `CLAUDE.md` y `ROADMAP.md`.

**Regla final:** este archivo es la fuente de verdad del contenido y la estructura del caso de estudio de Flux. No es una autorización para inventar hechos, cambiar el resto del portfolio o ignorar las reglas generales del repositorio.
