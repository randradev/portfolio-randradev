# FLUX — Arquitectura Actualizada

> Documento generado a partir del estado actual del repositorio (rama `feat/estabilizacion-frontend`, commit `f04004c`).
> Refleja el código tal como está, no el diseño original de `documentacion-gral/arquitectura.md`.

---

## 1. Vista general del sistema (contexto y contenedores)

```mermaid
flowchart LR
    U(["👤 Usuario<br/>(navegador)"])

    subgraph FE["Frontend — React 19 + Vite (localhost:5173)"]
        direction TB
        APP["App.jsx<br/>(enrutador por estado de auth)"]
        AUTHCTX["AuthContext<br/>supabase-js"]
        FLUXCTX["FluxContext<br/>estado de conversaciones + SSE"]
        UI["Dashboard · Sidebar · ChatPanel · ProcessPanel · Widgets"]
        APP --> AUTHCTX
        APP --> FLUXCTX --> UI
    end

    subgraph BE["Backend — FastAPI + LangGraph (localhost:8000)"]
        direction TB
        API["API v1<br/>/chat · /action · /history"]
        GRAPH["Grafo LangGraph<br/>(StateGraph FluxState)"]
        MODS["Módulos de dominio<br/>motores · RAG · seguridad · PDF"]
        INFRA["Capa infra<br/>supabase · gemini · checkpointer"]
        API --> GRAPH --> MODS
        GRAPH --> INFRA
        MODS --> INFRA
        API --> INFRA
    end

    subgraph SB["Supabase"]
        direction TB
        SBAUTH[("Auth<br/>(JWT)")]
        PG[("PostgreSQL<br/>tablas de negocio")]
        VEC[("pgvector<br/>knowledge_base")]
        CKPT[("Tablas checkpoint<br/>LangGraph")]
        STG[("Storage<br/>bucket 'contracts'")]
    end

    subgraph GCP["Google Cloud — Vertex AI (us-central1)"]
        GEM["gemini-3-flash-preview<br/>(chat · structured · generación)"]
        EMB["text-embedding-004"]
    end

    RESEND["✉️ Resend<br/>(email OTP, fallback mock)"]

    U --> APP
    AUTHCTX -- "signIn / signUp / session" --> SBAUTH
    FLUXCTX -- "POST /api/v1/chat (SSE)<br/>Bearer JWT" --> API
    FLUXCTX -- "GET/DELETE /api/v1/history" --> API
    INFRA -- "auth.get_user(token)" --> SBAUTH
    INFRA --> PG
    INFRA --> VEC
    INFRA --> CKPT
    INFRA --> STG
    INFRA --> GEM
    INFRA --> EMB
    MODS --> RESEND
```

---

## 2. Arquitectura en capas del backend

```mermaid
flowchart TB
    subgraph L0["Punto de entrada"]
        MAIN["main.py<br/>FastAPI · CORS · WindowsSelectorEventLoopPolicy<br/>GET /health"]
        CFG["app/config.py<br/>Settings (pydantic-settings, .env)"]
    end

    subgraph L1["Capa API — app/api"]
        DEPS["deps.py<br/>get_current_user → get_verified_user<br/>(JWT Supabase + perfil en tabla users,<br/>403 si BLOCKED_SECURITY)"]
        CHAT["v1/chat.py<br/>POST /chat · POST /action<br/>stream_graph_response() → SSE<br/>_NODE_LABELS · build_node_transition_payload"]
        DOCS["v1/docs.py<br/>GET /history · GET /history/{id}<br/>DELETE /history/{id}"]
    end

    subgraph L2["Capa de Orquestación — app/graph"]
        WF["workflow.py<br/>build_graph() · get_active_graph()<br/>(singleton lazy, compile con checkpointer)"]
        EDG["edges.py<br/>route_after_* (P0–P4)<br/>_RESUME_MAP · _INTENT_MAP · _SUCCESS_MAP"]
        ST["state.py<br/>FluxState (9 namespaces)"]
        CONST["constants.py<br/>CompletedStep · ProductPrefix"]
        subgraph NODES["nodes/"]
            NCOM["common.py<br/>welcome · intent_router · general_response"]
            NCRE["credit.py<br/>11 nodos loan_*"]
            NACC["account.py<br/>10 nodos account_*"]
            NDAP["deposit.py<br/>10 nodos dap_*"]
            NSCH["schemas/<br/>Pydantic de extracción LLM"]
        end
    end

    subgraph L3["Capa de Dominio — app/modules"]
        CE["credit_eng.py<br/>CreditEngine: scoring, riesgo,<br/>cuota francesa, CAE, capacidad 30%"]
        AE["account_eng.py<br/>AccountEngine: elegibilidad,<br/>categoría START/MEDIUM/ADVANCE, línea"]
        DE["dap_eng.py<br/>DapEngine: conversión UF/USD,<br/>IPC, premio por plazo, retorno"]
        CONS["consultant.py<br/>RAG: embeddings → RPC<br/>match_knowledge_base → Gemini"]
        SEC["security.py<br/>generate/validate OTP, intentos,<br/>send_otp_email (Resend), SHA-256"]
        PDF["pdf_factory.py<br/>PDFFactory (ReportLab, SpaceGrotesk)<br/>contrato + hash SHA-256"]
        ECO["eco_service.py<br/>(vacío)"]
    end

    subgraph L4["Capa de Infraestructura — app/infra · app/utils"]
        ISB["supabase.py<br/>users · conversations · messages<br/>financial_applications (semáforos)<br/>storage · block_user_security"]
        IGEM["gemini_client.py<br/>get_chat_model · get_structured_model<br/>get_generation_model · get_embeddings_model"]
        ICK["checkpointer.py<br/>AsyncPostgresSaver + AsyncConnectionPool"]
        ITH["threading.py<br/>get_or_create_thread (propiedad user↔conv)<br/>get_langgraph_config"]
        IEMB["embeddings.py<br/>similarity_search (stub)"]
        LLMU["utils/llm_utils.py<br/>normalize_llm_response"]
    end

    MAIN --> CHAT & DOCS
    MAIN -.-> CFG
    CHAT --> DEPS
    DOCS --> DEPS
    CHAT --> ITH
    CHAT --> WF
    CHAT --> ISB
    DOCS --> ISB
    WF --> EDG & NODES
    WF --> ICK
    EDG --> CONST
    NODES --> ST
    NODES --> CONST
    NCRE --> CE
    NACC --> AE
    NDAP --> DE
    NCRE & NACC & NDAP --> CONS & SEC & PDF
    NODES --> IGEM
    NODES --> ISB
    NODES --> LLMU
    CONS --> IGEM
    CONS --> ISB
    IEMB --> IGEM
    DEPS --> ISB
    ITH --> ISB
```

---

## 3. Grafo de estados LangGraph (workflow completo)

Punto de entrada único: `welcome`. Cada ejecución del grafo corresponde a **un turno** del usuario; las aristas a `END` marcan los puntos donde el grafo se detiene a esperar el siguiente mensaje.

```mermaid
flowchart TD
    START((START)) --> welcome

    welcome{{"welcome<br/>route_after_welcome<br/>P0 cambio producto · P1 salto por éxito<br/>P2 reanudación · P3 intención · P4 router"}}

    welcome -->|P4 sin señales| intent_router
    welcome -->|"P0/P3 LOAN"| loan_init
    welcome -->|"P0/P3 ACCOUNT"| account_init
    welcome -->|"P0/P3 DAP"| dap_init
    welcome -.->|"P1/P2 reanudación<br/>(cualquier nodo del flujo)"| RESUME["nodos de recolección,<br/>oferta, OTP, motores,<br/>formalización y terminales"]

    intent_router["intent_router<br/>(LLM structured: IntentExtractionSchema)"]
    intent_router -->|LOAN| loan_init
    intent_router -->|ACCOUNT| account_init
    intent_router -->|DAP| dap_init
    intent_router -->|GENERAL| general_response
    general_response["general_response"] --> END1((END))

    %% ───────── CRÉDITO ─────────
    subgraph LOAN["💰 Crédito de Consumo"]
        loan_init["loan_init<br/>(sin LLM)"] --> loan_collecting_profile
        loan_collecting_profile["loan_collecting_profile<br/>renta · antigüedad · estudios"]
        loan_collecting_profile -->|LOAN_PROFILE| loan_collecting_simulation
        loan_collecting_simulation["loan_collecting_simulation<br/>monto · plazo"]
        loan_collecting_simulation -->|LOAN_SIMULATION| loan_risk_engine
        loan_risk_engine[["loan_risk_engine<br/>CreditEngine"]]
        loan_risk_engine -->|RISK_SUCCESS| loan_pre_approved
        loan_risk_engine -->|RISK_REJECTED| loan_rejected_policy
        loan_pre_approved["loan_pre_approved<br/>tarjeta de transparencia"]
        loan_pre_approved -->|acepta| loan_otp_validation
        loan_pre_approved -->|rechaza| loan_closed_by_user
        loan_otp_validation["loan_otp_validation<br/>máx. 3 intentos"]
        loan_otp_validation -->|OTP_SUCCESS| loan_formalization
        loan_otp_validation -->|3 fallos| loan_security_block
        loan_formalization[["loan_formalization<br/>PDF + SHA-256 + Storage"]]
        loan_formalization -->|FORMALIZATION_SUCCESS| loan_completed
        loan_completed(["loan_completed"])
        loan_rejected_policy(["loan_rejected_policy"])
        loan_security_block(["loan_security_block"])
        loan_closed_by_user(["loan_closed_by_user"])
    end

    %% ───────── CUENTA CORRIENTE ─────────
    subgraph ACC["🏦 Cuenta Corriente"]
        account_init["account_init<br/>(sin LLM)"] --> account_collecting_profile
        account_collecting_profile["account_collecting_profile<br/>renta · antigüedad · estudios"]
        account_collecting_profile -->|ACCOUNT_PROFILE| account_evaluation_engine
        account_evaluation_engine[["account_evaluation_engine<br/>AccountEngine"]]
        account_evaluation_engine -->|EVALUATION_SUCCESS| account_pre_approved
        account_evaluation_engine -->|EVALUATION_REJECTED| account_rejected_policy
        account_pre_approved["account_pre_approved"]
        account_pre_approved -->|acepta| account_otp_validation
        account_pre_approved -->|rechaza| account_closed_by_user
        account_otp_validation["account_otp_validation"]
        account_otp_validation -->|OTP_SUCCESS| account_formalization
        account_otp_validation -->|3 fallos| account_security_block
        account_formalization[["account_formalization"]]
        account_formalization -->|FORMALIZATION_SUCCESS| account_completed
        account_completed(["account_completed"])
        account_rejected_policy(["account_rejected_policy"])
        account_security_block(["account_security_block"])
        account_closed_by_user(["account_closed_by_user"])
    end

    %% ───────── DAP ─────────
    subgraph DAP["📈 Depósito a Plazo"]
        dap_init["dap_init<br/>(sin LLM)"] --> dap_collect_data
        dap_collect_data["dap_collect_data<br/>monto · moneda · plazo"]
        dap_collect_data -->|DAP_DATA| dap_investment_engine
        dap_investment_engine[["dap_investment_engine<br/>DapEngine"]]
        dap_investment_engine -->|INVESTMENT_SUCCESS| dap_pre_approved
        dap_investment_engine -->|INVESTMENT_REJECTED| dap_rejected_policy
        dap_pre_approved["dap_pre_approved"]
        dap_pre_approved -->|acepta| dap_otp_validation
        dap_pre_approved -->|rechaza| dap_closed_by_user
        dap_otp_validation["dap_otp_validation"]
        dap_otp_validation -->|OTP_SUCCESS| dap_formalization
        dap_otp_validation -->|3 fallos| dap_security_block
        dap_formalization[["dap_formalization"]]
        dap_formalization -->|FORMALIZATION_SUCCESS| dap_completed
        dap_completed(["dap_completed"])
        dap_rejected_policy(["dap_rejected_policy"])
        dap_security_block(["dap_security_block"])
        dap_closed_by_user(["dap_closed_by_user"])
    end

    WAIT((END<br/>espera turno))
    loan_collecting_profile & loan_collecting_simulation & loan_pre_approved & loan_otp_validation & loan_formalization -.->|incompleto / error| WAIT
    account_collecting_profile & account_pre_approved & account_otp_validation & account_formalization -.-> WAIT
    dap_collect_data & dap_pre_approved & dap_otp_validation & dap_formalization -.-> WAIT

    TERM((END))
    loan_completed & loan_rejected_policy & loan_security_block & loan_closed_by_user --> TERM
    account_completed & account_rejected_policy & account_security_block & account_closed_by_user --> TERM
    dap_completed & dap_rejected_policy & dap_security_block & dap_closed_by_user --> TERM
```

**Leyenda:** `[[ ]]` nodo de servicio automático (motor / formalización, sin espera de input) · `([ ])` nodo terminal · `{{ }}` nodo de ruteo.

### 3.1 Jerarquía de ruteo en `route_after_welcome`

```mermaid
flowchart TD
    A["Entrada al grafo<br/>session.current_node · product_intent · progress"] --> P0
    P0{"P0: current_node ∈ _RESUME_MAP<br/>y product_intent de OTRO producto?"}
    P0 -- Sí --> R0["_INTENT_MAP[nuevo producto]<br/>→ *_init"]
    P0 -- No --> P1
    P1{"P1: current_node ∈ _RESUME_MAP<br/>y hay CompletedStep en progress?"}
    P1 -- Sí --> R1["_SUCCESS_MAP[producto][step]<br/>(validado contra _VALID_DESTINATION_NODES,<br/>si no → intent_router)"]
    P1 -- No --> P2
    P2{"P2: current_node ∈ _RESUME_MAP?"}
    P2 -- Sí --> R2["_RESUME_MAP[current_node]<br/>(reanudar nodo guardado)"]
    P2 -- No --> P3
    P3{"P3: product_intent ∈ LOAN/ACCOUNT/DAP?<br/>(clic en botón)"}
    P3 -- Sí --> R3["_INTENT_MAP → *_init"]
    P3 -- No --> R4["P4: intent_router<br/>(clasificación LLM)"]
```

### 3.2 Patrón interno de un nodo de recolección / oferta / OTP

Todos los nodos conversacionales de los tres productos siguen el mismo patrón (desde los últimos commits, los nodos `*_init` ya **no** llaman al LLM).

```mermaid
flowchart TD
    IN["Mensaje del usuario + FluxState"] --> EXT["Extracción estructurada<br/>get_structured_model(Schema Pydantic)<br/>*ProfileExtraction · *SimExtraction ·<br/>*DecisionExtraction · *OTPExtraction"]
    EXT --> Q{"¿Pregunta transversal<br/>(duda sobre reglas)?"}
    Q -- Sí --> RAG["consultant.get_consultant_response()<br/>RAG sobre knowledge_base"]
    Q -- No --> MERGE["Merge en collecting_data /<br/>validación de reglas de negocio"]
    RAG --> MERGE
    MERGE --> C{"¿Paso completo?"}
    C -- Sí --> OK["progress.* = True<br/>just_completed_step = CompletedStep.X<br/>update_application_semaphores()"]
    C -- No --> MISS["_get_missing_*_fields()<br/>_build_*_generation_context()"]
    OK --> GEN["get_generation_model()<br/>respuesta con personalidad Flux"]
    MISS --> GEN
    GEN --> OUT["return {messages, session, collecting_data, ...}<br/>→ route_after_* decide salto intra-turno o END"]
```

---

## 4. Secuencia de un turno de chat (end-to-end)

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario
    participant FE as FluxContext (React)
    participant API as FastAPI /api/v1/chat
    participant DEP as deps.get_verified_user
    participant TH as infra.threading
    participant SB as Supabase (PG / Auth)
    participant G as LangGraph (compiled_graph)
    participant N as Nodos
    participant LLM as Vertex AI Gemini
    participant MOD as Motores / RAG / PDF / OTP

    U->>FE: escribe mensaje o clic en producto
    FE->>API: POST /chat {message, conversation_id?, product_intent?}<br/>Authorization: Bearer JWT (fetchEventSource)
    API->>DEP: validar token
    DEP->>SB: auth.get_user(token) + get_user_by_email
    SB-->>DEP: perfil (403 si BLOCKED_SECURITY)
    API->>TH: get_or_create_thread(user_id, conversation_id)
    TH->>SB: crea conversación o verifica propiedad (id + user_id)
    TH-->>API: thread_id (= conversation_id)
    API-->>FE: 200 text/event-stream + X-Conversation-Id
    API->>SB: save_message(role=user)
    alt sin product_intent (seguimiento)
        API->>SB: get_conversation_snapshot(thread_id)
        SB-->>API: state_snapshot (session, collecting_data, ...)
    else con product_intent (botón)
        API->>API: reset de session y namespaces
    end
    API->>G: astream(initial_state, config{thread_id})
    loop por cada nodo ejecutado en el turno
        G->>N: ejecutar nodo
        N->>LLM: extracción estructurada / generación
        N->>MOD: motor financiero · RAG · OTP · PDF (según nodo)
        N->>SB: update_application_semaphores()
        N-->>G: delta de estado
        G-->>API: evento {node: output}
        API->>SB: update_conversation_node(current_node, state_snapshot)
        API-->>FE: data: {type:"message", content, node}
        API-->>FE: data: {type:"node_transition", node, label, progress, ...}
    end
    API->>SB: save_message(role=assistant, node_at_time)
    API-->>FE: data: {type:"done", conversation_id}
    FE->>FE: handleStreamEvent → actualiza chat, ProcessPanel y widgets
```

---

## 5. Estado global del grafo — `FluxState` (v2.x, namespaces)

```mermaid
classDiagram
    class FluxState {
        messages : list (add_messages)
        user_data : UserData
        session : SessionData
        preparation_data : PreparationData
        collecting_data : CollectingData
        evaluation_results : EvaluationResults
        offer_data : OfferData
        auth_control : AuthControl
        transparency_data : TransparencyData
        flow_result : FlowResult
    }
    class UserData {
        user_id, full_name, email, rut
        birth_date, user_status, user_category
    }
    class SessionData {
        conversation_id, application_id
        product_intent : LOAN|ACCOUNT|DAP|GENERAL
        current_node, previous_node
        is_transversal_active
        progress : ProgressData
        just_completed_step : volátil 1 turno
    }
    class ProgressData {
        loan : LoanProgress
        account : AccountProgress
        dap : DapProgress
    }
    class PreparationData {
        nombre, rut, mail, edad
    }
    class CollectingData {
        loan_profile : renta, antiguedad, estudios
        loan_sim : monto, plazo
        account_profile : renta, antiguedad, estudios
        dap_params : monto, moneda, plazo
    }
    class EvaluationResults {
        loan_engine : scoring, riesgo, tasa, cuota, CAE, CTC
        account_engine : categoría, upgrade, línea
        dap_engine : tasa periodo, ganancia, retorno
    }
    class OfferData {
        loan / account / dap
        pre_approval_status, timestamp_acceptance
        file_contrato_path, contract_status
        display_data : FinalDisplay
    }
    class AuthControl {
        security_blocked, service_error
        otp_attempts (0-3), otp_generated
        otp_user_input, block_timestamp
    }
    class TransparencyData {
        loan / account / dap (strings formateados)
    }
    class FlowResult {
        status_code : SUCCESS|REJECTED|CLOSED_BY_USER|SECURITY_BLOCKED
        close_reason, product_name, closed_at
    }
    FluxState *-- UserData
    FluxState *-- SessionData
    SessionData *-- ProgressData
    FluxState *-- PreparationData
    FluxState *-- CollectingData
    FluxState *-- EvaluationResults
    FluxState *-- OfferData
    FluxState *-- AuthControl
    FluxState *-- TransparencyData
    FluxState *-- FlowResult
```

---

## 6. Persistencia de estado (doble mecanismo)

```mermaid
flowchart LR
    subgraph TURN["Turno N"]
        A["stream_graph_response()"]
    end
    A -- "1. lectura (si no hay product_intent)" --> SNAP[("conversations.state_snapshot<br/>(JSON) + current_node")]
    SNAP -- "rehidrata session, collecting_data,<br/>evaluation_results, offer_data,<br/>auth_control, transparency_data, messages" --> A
    A -- "2. astream(config thread_id)" --> G["compiled_graph"]
    G <-- "checkpoint por super-step" --> CK[("Tablas LangGraph<br/>AsyncPostgresSaver")]
    G -- "evento por nodo" --> A
    A -- "3. update_conversation_node()<br/>tras cada nodo" --> SNAP
    A -- "save_message() user / assistant" --> MSG[("messages")]
    G -. "nodos: semáforos" .-> FA[("financial_applications<br/>current_node_id · node_status ·<br/>engine_status · document_status")]
```

> El `state_snapshot` en `conversations` es la fuente que el endpoint usa para rehidratar al grafo en cada turno; el checkpointer de LangGraph se mantiene compilado en paralelo con el mismo `thread_id`.

---

## 7. Modelo de datos (Supabase / PostgreSQL — `backend/migrations`)

```mermaid
erDiagram
    user_statuses ||--o{ users : "estado"
    user_categories ||--o{ users : "tramo"
    education_levels ||--o{ users : "estudios"
    users ||--o{ conversations : "posee"
    product_types ||--o{ conversations : "producto"
    conversations ||--o{ messages : "contiene"
    conversations ||--o| financial_applications : "origina"
    users ||--o{ financial_applications : "solicita"
    product_types ||--o{ financial_applications : "tipo"
    application_statuses ||--o{ financial_applications : "estado"
    rejection_reason_codes ||--o{ financial_applications : "motivo"
    financial_applications ||--o| loan_details : "detalle"
    financial_applications ||--o| account_details : "detalle"
    financial_applications ||--o| dap_details : "detalle"
    financial_applications ||--o{ documents : "contratos"
    financial_applications ||--o{ security_otp : "OTP"
    risk_levels ||--o{ loan_details : "riesgo"
    user_categories ||--o{ account_details : "categoría"
    currencies ||--o{ dap_details : "moneda"
    dap_terms ||--o{ dap_details : "plazo"
    document_types ||--o{ documents : "tipo"
    product_types ||--o{ document_types : "por producto"
    economic_indicators ||--o{ economic_history : "valores"

    users {
        uuid id PK
        text email
        text full_name
        text rut
        date birth_date
    }
    conversations {
        uuid id PK
        uuid user_id FK
        text current_node
        jsonb state_snapshot
        bool is_active
    }
    messages {
        uuid id PK
        uuid conversation_id FK
        text role
        text content
        text node_at_time
    }
    financial_applications {
        uuid id PK
        text current_node_id
        text node_status
        text engine_status
        text document_status
    }
    knowledge_base {
        text chunk_id PK
        text product
        text content
        vector embedding
    }
```

> `knowledge_base` y la función RPC `match_knowledge_base` (pgvector) no están en `migrations/`; se pueblan con `backend/scripts/ingest.py` a partir de `documentacion-gral/estrategia-chunking.md`.

### 7.1 Pipeline RAG

```mermaid
flowchart LR
    subgraph OFF["Offline — scripts/ingest.py"]
        MD["estrategia-chunking.md"] --> PARSE["parseo de chunks<br/>(ID, producto, sección)"] --> E1["text-embedding-004"] --> UP[("upsert<br/>knowledge_base")]
    end
    subgraph ON["Online — modules/consultant.py"]
        Q["pregunta del usuario<br/>+ snapshot de contexto (nodo, producto, nombre)"] --> E2["text-embedding-004"]
        E2 --> RPC["RPC match_knowledge_base<br/>top_k=5 · threshold=0.30"]
        RPC --> CHK{"mejor similitud<br/>≥ 0.45?"}
        CHK -- Sí --> PROMPT["prompt: identidad Flux +<br/>contexto + fragmentos"] --> GEN["Gemini (generación)"]
        CHK -- No --> FB["_build_fallback()"]
    end
    UP -.-> RPC
```

### 7.2 Formalización y seguridad (OTP → contrato)

```mermaid
flowchart LR
    PA["*_pre_approved<br/>usuario acepta"] --> OTPN["*_otp_validation"]
    OTPN --> GENOTP["security.generate_otp()<br/>(6 dígitos)"] --> MAIL["security.send_otp_email()<br/>Resend · fallback MOCK por consola"]
    OTPN --> VAL{"validate_otp()<br/>intentos < 3?"}
    VAL -- correcto --> FORM["*_formalization"]
    VAL -- "3 fallos" --> BLK["*_security_block<br/>block_user_security()<br/>users.user_status = BLOCKED_SECURITY"]
    FORM --> PDFF["PDFFactory.create_pdf()<br/>ReportLab + SHA-256"] --> STOR["upload_contract_to_storage()<br/>bucket 'contracts' → URL pública"]
    STOR --> DONE["*_completed<br/>display_data: download_url, security_hash"]
```

---

## 8. Arquitectura del frontend

```mermaid
flowchart TB
    MAIN["main.jsx"] --> AP["AuthProvider (AuthContext)"]
    AP --> APP["App.jsx"]
    APP -->|loading| LOAD["pantalla 'Conectando FLUX'"]
    APP -->|no autenticado| LOGIN["LoginPage"]
    APP -->|registro| REG["RegisterPage"]
    APP -->|autenticado| FP["FluxProvider (FluxContext)<br/>accessToken"]
    FP --> DASH["Dashboard"]

    DASH --> SIDE["Sidebar<br/>historial · nueva conv. · eliminar"]
    DASH --> CHATP["ChatPanel"]
    DASH --> PROC["ProcessPanel<br/>etapas y % de avance"]
    DASH --> CN["ConfigNotice"]
    SIDE --> PSM["ProductSelectorModal"]
    CHATP --> WM["WelcomeMessage"]
    CHATP --> FLF["FluxLoadingFeedback<br/>(Flux Tips)"]
    CHATP --> CW["CreditWidgets"]
    CHATP --> AW["AccountWidgets"]
    CHATP --> DW["DapWidgets"]
    CW --> LOC["LoanOfferCard"] & OTP["OtpInput"] & FC["FlowClosure<br/>(descarga contrato / cierre)"]
    AW --> AOC["AccountOfferCard"] & FC
    DW --> DOC["DapOfferCard"] & FC

    subgraph SRV["services / hooks / constants"]
        SUPA["services/supabase.js<br/>createClient"]
        APIJS["services/api.js<br/>authorizedFetch · history · messages · delete"]
        HK["hooks/useAuth · useFlux"]
        CONSTS["constants/flux.js<br/>NODE_ALIASES · NODE_DETAILS ·<br/>labels e íconos por producto"]
    end

    AP --> SUPA
    FP --> APIJS
    FP -- "fetchEventSource POST /api/v1/chat" --> SSE(["SSE: message · node_transition · done · error"])
    FP --> CONSTS
    DASH --> HK
```

**Acciones de usuario desde widgets** → todas viajan como mensajes de texto por `sendMessage()` → `POST /api/v1/chat`:
- Aceptar / rechazar oferta: `"Acepto la oferta de crédito"` / `"Rechazo la oferta"`.
- OTP: el código ingresado en `OtpInput`.

---