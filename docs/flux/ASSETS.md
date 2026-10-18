# Flux — Índice de recursos del caso de estudio

Registro de procedencia, contenido demostrado y revisión de privacidad de los
recursos publicados en `/proyectos/flux` (`FLUX-CASE-STUDY.md` §8).

**Originales (fuera del repositorio):** `Desktop/FLUX/portfolio-evidencia/originales/`
(copiados y verificados por SHA-256 el 2026-10-19). Las grabaciones completas
siguen en `Videos/Captures/`. No se suben al repositorio.

**Código de referencia:** repositorio local `flux-project`, rama
`feat/estabilizacion-frontend`, commit `f04004c` (2026-05-11). GitHub `main`
(`f080615`) aún no incluye DAP; pendiente de actualizar por el autor.

**Datos visibles:** el titular «AXLTL Audiovisual» y el RUT `12804183-4` son
ficticios (confirmado por el autor).

## Procesado común

- Recorte de la interfaz del navegador (pestañas, URL, marcadores y perfil):
  `crop=1920:916:0:122` en video, `crop=1920:918:0:122` en capturas. Elimina
  también la URL de Supabase Storage que aparecía al abrir los contratos.
- Videos: H.264, 1440 px de ancho, CRF 28, `+faststart`, sin pista de audio
  (la original estaba en silencio, −91 dB). Velocidad y duración originales,
  sin cortes internos.
- Imágenes: WebP. Las capturas de consola, sin pérdida.

## Videos — `public/media/projects/flux/videos/`

| Archivo | Origen | Duración | Qué demuestra |
|---|---|---|---|
| `credit-flow.mp4` | `credit-flow-demo.mp4`, grabación del 2026-10-17 | 74,7 s | Crédito de consumo en la interfaz: perfil, simulación, tarjeta de oferta (2.000.000 CLP, 12 cuotas, 2,00 % mensual, CAE 26,82 %), aceptación, OTP y contrato PDF. |
| `dap-flow.mp4` | `dap-flow.mp4`, grabación del 2026-10-17 | 63,2 s | Depósito a plazo: 500 USD a 300 días, tasa del período 7,000 %, ganancia 35 USD, aceptación, OTP y contrato PDF. Cifras coherentes con `DapEngine`. |
| `rag-account.mp4` | `rag-queries.mp4`, grabación del 2026-10-17 | 61,4 s | Dos preguntas informativas durante la recolección de datos de Cuenta Corriente, respondidas sin abandonar el paso. |

## Imágenes — `app/assets/projects/flux/`

| Archivo | Origen | Qué demuestra |
|---|---|---|
| `rag-cae-console.webp` | Fotograma (60 s) de `flux-project - Antigravity - credit.py 2026-05-04 20-58-21.mp4`, recortado al turno 4 | Consola de `simulate_conversation.py` (rama `feat/fase2-dev1-credito-otp`): «¿Qué es el CAE?» clasificado como `PREGUNTA`, 5 fragmentos recuperados para `LOAN` (tope `top_k=5`), similitud del mejor fragmento 0,4808 y respuesta contextualizada. Recorte autorizado por el autor; excluye nombre completo, RUT, fecha de nacimiento, correo e ID de proyecto GCP. |
| `credit-cae-ui.webp` | `credit-flow.png`, 2026-10-17 | La misma pregunta del CAE respondida en la interfaz con el valor calculado por el motor (26,82 %). |
| `rag-account-console.webp` | `rag-console.PNG`, 2026-10-17 | Consola del backend: preguntas de Cuenta Corriente, 5 fragmentos para `ACCOUNT`, similitudes 0,662 y 0,528. Incluye el UUID de una conversación local de prueba. |
| `contract-dap.webp` | `contract-pdf.png`, 2026-10-17 | Contrato DAP generado con ReportLab y hash SHA-256 de los datos del contrato. Datos del titular ficticios. |
| `credit-flow-poster.webp` | Fotograma 48 s de `credit-flow.mp4` | Tarjeta de oferta de crédito. |
| `dap-flow-poster.webp` | Fotograma 36 s de `dap-flow.mp4` | Tarjeta de oferta DAP. |
| `rag-account-poster.webp` | Fotograma 36 s de `rag-account.mp4` | Primera respuesta RAG de Cuenta Corriente. |

## Advertencias para los textos de la página

La propia evidencia contiene textos de la interfaz que no deben repetirse como
claims del portfolio; acompañarlos con un pie que los aclare:

- «tu crédito está aprobado» y «Monto aprobado»: es una pre-aprobación simulada
  por el motor, no un crédito real.
- «Documento firmado electrónicamente» / «Verificación digital» en el PDF: el
  SHA-256 se calcula sobre el JSON de los datos del contrato
  (`pdf_factory._generate_sha256`); es un sello de integridad, no una firma
  electrónica con validez legal.
- Flux Tip «encriptación SHA-256» (visible en algunos tramos de los videos):
  SHA-256 es una función hash, no cifrado.
- «5 chunks»: coincide con el tope configurado `DEFAULT_TOP_K = 5`; no es una
  métrica de calidad. La similitud no es un porcentaje de precisión.

## Descartados

- `dap-flow.png`: duplicado byte a byte de `credit-flow.png`. Sustituido por el
  póster de `dap-flow.mp4`.
- Resto de la grabación del 2026-05-04 (incluido el bloqueo OTP tras 3
  intentos): muestra datos personales reales. No se publica.
