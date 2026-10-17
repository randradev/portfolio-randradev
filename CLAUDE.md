# CLAUDE.md --- Instrucciones para Claude Code

## Contexto del proyecto

Este repositorio contiene un portafolio profesional orientado a
conseguir empleo en desarrollo de software. El posicionamiento es **Full
Stack como base, IA aplicada como diferenciador**. No convertir el sitio
en una landing de captación de clientes freelance.

Antes de realizar cambios, leer: - `SPEC.md`: alcance y requisitos del
producto. - `ROADMAP.md`: fase actual y criterios de terminado. -
`DESIGN-SYSTEM.md`: dirección visual y reglas de interfaz.

## Reglas de trabajo

1.  Trabajar solo en la tarea solicitada. No implementar todo el roadmap
    en una sola ejecución.
2.  Antes de editar, resumir el enfoque, los archivos previstos y
    cualquier incertidumbre importante.
3.  Si falta información sobre un proyecto, marcarla como pendiente y
    pedir confirmación cuando afecte a una afirmación pública. No
    inventar.
4.  Mantener el contenido separado de los componentes visuales y tipado
    con TypeScript.
5.  Reutilizar componentes y tokens existentes. Evitar duplicar estilos,
    colores, datos o lógica.
6.  Mantener una solución sencilla y mantenible; no añadir dependencias
    sin justificar su necesidad.
7.  No incorporar un backend, base de datos, autenticación o panel de
    administración en el MVP salvo petición explícita.
8.  No exponer claves, tokens, secretos, datos personales privados ni
    archivos internos.
9.  No afirmar que un comando, test o build pasó si no se ejecutó.
10. Al terminar, resumir los archivos modificados, decisiones,
    comprobaciones ejecutadas, resultados y pendientes.

## Stack y arquitectura prevista

-   React + TypeScript + Vite.
-   CSS con variables/tokens centralizados.
-   Three.js para el objeto 3D; evaluar React Three Fiber para
    integrarlo en React.
-   Hosting objetivo: Vercel.
-   Contenido local tipado para el MVP.
-   Routing explícito para la página principal y los casos de estudio.
-   No asumir que existen dependencias, scripts o estructura hasta
    inspeccionar el repositorio.

Si el repositorio ya contiene una implementación, inspeccionarla antes
de cambiar la estructura. No reemplazar configuración funcional sin
explicar el motivo.

## Dirección visual obligatoria

Seguir `DESIGN-SYSTEM.md`. Resumen: - Fondo `#080B12`, superficies
`#111827` y `#1C2739`. - Azul `#4D8DFF`, violeta `#8B5CF6`. - Texto
`#EDF2FA`, secundario `#A8B3C7`. - Manrope para títulos, Inter para
cuerpo y JetBrains Mono para detalles técnicos. - Estética editorial
premium, objeto 3D de metal y cristal con reflejos azul-violeta. -
Glassmorphism y motion controlados. - Responsive, foco visible y respeto
por `prefers-reduced-motion`.

No improvisar una estética distinta ni convertir cada sección en una
composición con gradientes y brillos.

## Calidad y validación

-   Inspeccionar `package.json` antes de asumir nombres de comandos.
-   Ejecutar build, lint y pruebas disponibles relevantes a los cambios.
-   Si una comprobación no puede ejecutarse, informar la razón.
-   Revisar errores de consola cuando sea posible.
-   No ocultar errores mediante desactivación de reglas o configuración
    sin justificación.
-   Comprobar las rutas directas y recargas según la estrategia de
    routing.
-   No afirmar compatibilidad o accesibilidad completa sin una revisión
    apropiada.

## Seguridad y contenido

-   No añadir secretos al repositorio ni al frontend.
-   Las variables `VITE_*` son visibles en el cliente; nunca guardar
    secretos en ellas.
-   Verificar enlaces antes de publicarlos.
-   No crear estadísticas, métricas, usuarios, testimonios o resultados
    ficticios.
-   No mostrar enlaces de demo o repositorio que no hayan sido
    confirmados.
-   No usar capturas conceptuales como si fueran imágenes reales de la
    aplicación.
-   Respetar la confidencialidad de empleadores y terceros.

## Formato de cierre de cada tarea

Informar: 1. **Implementado:** resumen breve. 2. **Archivos
modificados:** lista. 3. **Validaciones:** comandos ejecutados y
resultado real. 4. **Pendientes o riesgos:** información faltante,
limitaciones o decisiones que necesitan aprobación. 5. **Siguiente paso
sugerido:** una sola tarea concreta.

No continuar automáticamente con la siguiente fase sin que el usuario
revise el resultado.
