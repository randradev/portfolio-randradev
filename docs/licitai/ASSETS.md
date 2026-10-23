# LicitAI — Índice de recursos del caso de estudio

Registro de procedencia, contenido demostrado y revisión de privacidad de los
recursos publicados en `/proyectos/licitai` (`LICITAI-CASE-STUDY.md` §8).

**Originales (fuera del repositorio):** `Desktop/Proyectos/LicitAI MVP/portfolio-evidencia/originales/`
(copiados y verificados por SHA-256 el 2026-10-22). No se suben al repositorio.

**Código de referencia:** repositorio local `licitai rescatada/licitai`, rama
`main`, commit `ca854c1` (2026-10-22), idéntico a `origin/main` de
`randradev/licitai-prototipo` (público, HTTP 200 el 2026-10-22).

**Datos visibles:** licitaciones públicas de Mercado Público. El perfil de
empresa (distribuidora de insumos de laboratorio y salud) es ficticio
(`LICITAI_PROJECT_DOSSIER.md` §2). De las 15 evaluaciones humanas de la base,
14 son simuladas.

## Procesado común

- Recorte de la interfaz del navegador (pestañas, URL `localhost:8501`,
  marcadores y perfil): `crop=1920:918:0:122` en el video.
- Video: H.264, 1440 × 688, CRF 28, `+faststart`, sin pista de audio (la
  original estaba en silencio, −91 dB). Velocidad y duración originales, sin
  cortes internos. 31 MB → 2,9 MB.
- Imágenes: WebP sin pérdida. Las capturas de pantalla completa se recortan a la
  zona de contenido de la aplicación, sin alterar lo que muestran.

## Video — `public/media/projects/licitai/videos/`

| Archivo | Origen | Duración | Qué demuestra |
|---|---|---|---|
| `licitai-demo.mp4` | `licitai-demo.mp4`, grabación local del 2026-10-22 | 96,9 s | Recorrido por Oportunidades, el análisis con desglose del score, Favoritas, En proceso, Panorama y Perfil, sobre datos ya sincronizados. Panorama incluye la calibración «¿Qué tan acertada es la IA?» calculada casi solo con evaluaciones simuladas: el pie del video lo aclara. |

## Imágenes — `app/assets/projects/licitai/`

| Archivo | Origen | Sección | Qué demuestra |
|---|---|---|---|
| `analysis-detail.webp` | `licitai-analysis-detail-particular.png`, `crop=660:785:0:0` (columna del análisis, sin el panel de preparación) | Análisis | Ficha `1057421-39-LE26` (Hospital de Laja): 93/100, desglose 5/4/5/5/4 con peso y evidencia. 35 + 20 + 20 + 10 + 8 = 93, coherente con `rubrica.calcular`. |
| `analysis-uncertainty.webp` | Fotograma 32 s de la grabación, `crop=1000:585:455:442` | Análisis | Otra licitación (Angol): excluyentes «No verificable», información faltante, riesgos y reclamos de pago con su fuente. |
| `opportunities.webp` | `licitai-opportunities.png`, `crop=1060:669:425:56` | Interfaz | Página Oportunidades: indicadores, filtros, orden y la primera tarjeta con score y señales. |
| `processing-queue.webp` | `licitai-processing-queue.png`, `crop=1282:515:430:60` | Fiabilidad | Dos licitaciones con «La IA no entregó un análisis válido», con «Analizar ahora» y «Reintentar». |
| `panorama-funnel.webp` | Fotograma 66 s de la grabación, `crop=1030:315:440:334` | Panorama | Embudo de 30 días: 2.482 publicadas, 18 coinciden con el perfil, 16 analizadas, 2 favoritas. |
| `panorama-closings.webp` | Fotograma 70 s de la grabación, `crop=1030:546:440:494` | Panorama | Próximos cierres: días al cierre y score de 12 de las 14 licitaciones abiertas. |
| `panorama-score.webp` | `licitai-analytics-overview-particular.png`, `crop=1040:510:0:0` | Panorama | Score vs. reclamos de pago y distribución de scores (14 licitaciones, 2 no elegibles aparte). |
| `panorama-calibration.webp` | Fotograma 82 s de la grabación, `crop=1030:603:440:244` | Panorama | Tarjeta «¿Qué tan acertada es la IA?»: 53 % / 47 % / 0 % según 15 evaluaciones y % de postulación por tramo. 14 de las 15 evaluaciones son simuladas; el pie de la captura lo indica. |
| `demo-poster.webp` | Fotograma 26 s de la grabación | Interfaz | Desglose del score de la licitación de Angol. |

## Diagramas

Se implementan como componentes (HTML semántico o SVG inline), igual que en
Flux, en lugar de archivos `.svg`:

- Flujo de procesamiento → capas de `ArchitectureSection`.
- Modelo de datos → `DataModelSection`, derivado de los `CREATE TABLE` y
  `COLUMNAS_NUEVAS` de `core/database_mgr.py`. No hay `FOREIGN KEY`: las dos
  relaciones (por `id_externo`) se dibujan como relaciones lógicas.
- Modelo de scoring → `ScoringSection`, con los pesos y estados de `core/rubrica.py`.

Fuentes técnicas: `docs/licitai/architecture/*.md`, con los diagramas Mermaid
de referencia (flujo, componentes, entidad-relación y estados del score).

## Descartados

- `licitai-analysis-detail.png` (524 × 887): reducida; su texto no se lee.
  El fotograma del video cubre requisitos, faltantes y riesgos.
- `licitai-analytics-overview.png` (350 × 898): reducida; su texto no se lee.
- `code/reporte_autopsia_fase2.md`: es un informe de Flux, no de LicitAI.
