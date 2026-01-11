# Animation Studio API

This project is the backend API for a modern animation studio, built with a focus on enterprise-grade architecture and scalability.

---

🎬 **Senior Backend Engineer Mode Activated**
Welcome to **Foundation & Animation Studio Bridge**.
We’re going to build this **exactly** like a senior engineer would—slow, explicit, and with reasoning behind *every* decision.

You’re not just “setting up a server.”
You’re laying the **structural foundation of a real animation studio backend** that could scale to **1000+ artists, millions of assets, and render farms**.

---

# FOUNDATION

## “Why Animation Studios Need Backend Systems”

Before code, we anchor *why this exists*.

### 🎥 Why animation studios are backend-heavy

Animation studios are **not CRUD apps**. They are:

* Asset factories (huge files, versioning, dependencies)
* Workflow engines (pipeline stages, approvals, renders)
* Collaboration platforms (many artists, same assets)
* Infrastructure systems (queues, background jobs, compute)

Frontend (React) = **interaction layer**
Backend = **source of truth + orchestration brain**

> 💡 Think of the backend as the *production coordinator* of the studio.

---

# WHAT WE BUILD (SCOPE)

This work accomplishes:

✅ Production-grade Express + TypeScript backend
✅ Enterprise folder structure (service / controller / repo)
✅ Security middleware (helmet, rate limiting, env validation)
✅ Health check endpoints (ops-ready)
✅ Docker + docker-compose
✅ Testing infrastructure (Jest + Supertest)
✅ Git workflow (how seniors commit foundations)

This is **Level 0 infrastructure** everything else depends on.

---

# Running the Project

This section provides the commands needed to run, test, and build the application.

| Command | Description | Environment |
| :--- | :--- | :--- |
| `docker-compose up -d` | Starts background services (e.g., Redis) in detached mode. | Development & Production |
| `npm run dev` | Starts the API server with auto-reloading for development. | Development |
| `npm run worker:render` | Starts the render worker with auto-reloading for development. | Development |
| `npm test` | Runs the full automated test suite using Jest. | Development |
| `npx tsc --noEmit` | Performs a static type-check of the entire codebase. | Development |
| `npm run build` | Compiles TypeScript to production-ready JavaScript in the `dist` folder. | Production |
| `npm run start` | Runs the compiled JavaScript application from the `dist` folder. | Production |

---

🎬 **MongoDB + Authentication (Senior Backend Mode)**

> *“Database design vs React state for animation data”*

You’re officially moving from **“server exists”** → **“system of record exists.”**
This is where backend engineering truly begins.

---

## MENTAL MODEL (VERY IMPORTANT)

Before code, let’s reframe how you should should think.

### React State vs Database (Core Shift)

| React State    | Backend Database      |
| -------------- | --------------------- |
| Ephemeral      | Persistent            |
| UI convenience | Legal source of truth |
| Optimistic     | Defensive             |
| User-owned     | Organization-owned    |
| Easy to mutate | Must be auditable     |

> 🎯 In an animation studio, **MongoDB is the studio vault**.
> React is just a *viewer/editor*.

---

# GOALS

This work accomplishes:

✅ MongoDB connected (production-safe pattern)
✅ Multi-tenant **Studio → Users** data model
✅ Authentication with **JWT + refresh tokens (foundation)**
✅ Password hashing (bcrypt)
✅ Role-based identity modeling (Artist, Director, Producer)
✅ Auth middleware (protect APIs like real studios do)
✅ Tests for auth flows

This is **enterprise identity infrastructure**.

---

🎬 **Service Layer Architecture (Senior Backend Mode)**

> *“Backend services vs React components for asset management”*

This is where you **cross the senior threshold**.

If the previous work was *foundation* and *identity*, this is **architecture discipline** — the thing that separates:

> ❌ “It works”
> ✅ “It scales, is testable, and survives teams”

---

## MENTAL MODEL (FROM FIRST PRINCIPLES)

### React Analogy (use this to anchor everything)

| React           | Backend                 |
| --------------- | ----------------------- |
| Component       | Controller              |
| Custom Hook     | Service                 |
| Context / Store | Domain Model            |
| API client      | Repository              |
| Side effects    | Infrastructure adapters |

**Rule:**

> Controllers should be as dumb as JSX.
> Services are where *thinking happens*.

---

# GOALS

This work accomplishes:

✅ Clean **Controller → Service → Repository** flow
✅ First **Asset domain** (core animation concept)
✅ Validation boundaries (HTTP vs business rules)
✅ Multi-tenant asset ownership enforcement
✅ Testable business logic (without HTTP)
✅ A pattern you’ll reuse for every future feature

This is the **spine of the entire platform**.

---

🎬 **Error Handling & Observability (Senior Backend Mode)**

> *“Error boundaries vs backend resilience for render failures”*

This work focuses on **production survival**.

Most systems don’t fail because of bad features; they fail because **when something breaks, nobody knows why**.

Animation studios face unique challenges:

* Long-running render jobs
* External tools (FFmpeg, render farms)
* Large files
* Async pipelines

This phase builds **backend resilience + visibility** like a real studio platform.

---

## MENTAL MODEL (FIRST PRINCIPLES)

### React vs Backend Failure Handling

| React                 | Backend                 |
| --------------------- | ----------------------- |
| Error Boundary        | Global error middleware |
| Component stack trace | Correlation ID          |
| Console.log           | Structured logging      |
| DevTools              | Metrics + dashboards    |
| UI fallback           | Retry / circuit breaker |

> 🎯 Backend errors must be **machine-readable**, **traceable**, and **actionable**.

---

# GOALS

This work accomplishes:

✅ Unified error contract (no random JSON errors)
✅ Custom domain error hierarchy (render failures ready)
✅ Correlation IDs for tracing requests
✅ Structured logging with Winston
✅ Metrics endpoint (Prometheus-ready)
✅ Health vs readiness distinction
✅ A system that ops teams can debug

This is **senior+ territory**.

---

🎬 **Asset CRUD Mastery (Senior Backend Mode)**

> *“REST APIs vs React hooks for asset management”*

This phase transforms the **architecture** into a **production-ready API surface**. This is where experienced engineers meticulously consider **edge cases, ownership, pagination, and API contracts**.

---

## MENTAL MODEL

### React Hooks vs REST APIs

| React              | Backend                   |
| ------------------ | ------------------------- |
| `useAssets()`      | `GET /assets`             |
| `useCreateAsset()` | `POST /assets`            |
| `useUpdateAsset()` | `PATCH /assets/:id`       |
| `useDeleteAsset()` | `DELETE /assets/:id`      |
| Local filtering    | Server-side pagination    |
| Optimistic UI      | Authorization enforcement |

> 🎯 Backend APIs must assume **hostile input** and **concurrent users**.

---

# GOALS

This work accomplishes:

✅ Full CRUD for assets
✅ Pagination + sorting (enterprise baseline)
✅ Studio ownership enforcement (multi-tenant safety)
✅ Input validation (HTTP boundary)
✅ Consistent REST contracts
✅ API patterns that scale to **millions of assets**

---

🎬 **File Upload System (Senior Backend Mode)**

> *“Large file handling vs frontend uploads”*

This work addresses **production file handling**.

Uploading a 2 MB avatar ❌
Uploading a 5–20 GB animation asset ✅

This phase designs the system **the way real animation studios do it**.

---

## MENTAL MODEL (RESET YOUR BRAIN)

### Frontend vs Backend Responsibility (Critical)

| Frontend     | Backend              |
| ------------ | -------------------- |
| Select file  | Validate & authorize |
| Progress bar | Stream & persist     |
| Retry UX     | Resume / recover     |
| Chunking     | Integrity & storage  |
| Preview      | Pipeline triggers    |

> 🎯 The backend **never loads large files into memory**.
> Experienced engineers treat memory as **radioactive**.

---

# GOALS

This work accomplishes:

✅ Streaming-based file uploads (no memory explosion)
✅ Asset storage abstraction (local today, S3 later)
✅ File metadata tracking in MongoDB
✅ Secure studio-based asset isolation
✅ Upload validation & limits
✅ Pipeline hooks (thumbnail, preview later)

This is **animation-grade backend engineering**.

---

### Implementation Details for File Upload System

This system handles large file uploads efficiently by prioritizing streaming over buffering and abstracting storage.

#### Key Principles

| Principle             | Description                                                                                             | Why it Matters                                                                        |
| :-------------------- | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| **Streaming Uploads** | Files are processed in chunks and written directly to disk/storage, avoiding loading into memory.         | Prevents memory exhaustion, supports large files (GBs), and maintains server responsiveness. |
| **Storage Abstraction** | A `StorageProvider` interface (`src/infra/storage/StorageProvider.ts`) defines how files are saved.     | Allows easy swapping between local storage, S3, GCS, etc., without changing core logic. |
| **Local Disk Implementation** | `LocalStorageProvider.ts` saves files to `uploads/{studioId}/{assetId}/v{version}`.            | Demonstrates streaming: files move from Multer's temp directory to final destination.     |
| **Multer Configuration** | Configured with `dest: path.resolve("tmp")` and a `fileSize` limit (e.g., 10GB).                         | Uses OS's efficient temp file handling; protects against DoS/excessively large uploads.   |
| **Asset Model Extension** | `Asset.ts` (`src/app/repositories/models/Asset.ts`) now includes a `file` object.                   | Stores metadata (`path`, `size`, `mimeType`) about the uploaded file; database stores *pointers*, not blobs. |
| **Upload Service**    | `AssetUploadService.ts` orchestrates the upload: validates, saves via `LocalStorageProvider`, updates asset metadata. | Acts as the entry point for the asset pipeline (thumbnail, transcoding, etc.).            |
| **Upload Controller** | `AssetUploadController.ts` is a thin layer, extracting `req.user`, `req.params`, `req.file` and delegating to the service. | Keeps controller focused on HTTP translation.                                         |
| **Upload Route**      | `asset-upload.routes.ts` defines `POST /assets/:id/upload`, using `authenticate` and `upload.single("file")`. | Secured endpoint for file uploads, processing multipart form data.                    |

#### Why This Scales to Real Studios

*   **No Memory Spikes**: Handles massive files without crashing the server.
*   **Storage Flexibility**: Easy migration to cloud object storage.
*   **Metadata vs. Blobs**: Keeps MongoDB performant by storing references.
*   **Security**: Studio isolation protects valuable intellectual property.
*   **Pipeline-Ready**: Designed for integration with complex asset processing workflows.

#### Common Experienced Engineer Warnings

*   ❌ Never store files directly in MongoDB.
*   ❌ Never buffer large uploads into server memory.
*   ❌ Never trust file extensions; validate MIME types and content.
*   ✅ Always abstract your storage layer.
*   ✅ Always enforce tenant isolation for assets.

---

🔗 FRONTEND CONNECTION

| Frontend                | Backend               |
| ----------------------- | --------------------- |
| `<input type="file" />` | `multer` stream       |
| Upload progress         | chunked stream        |
| Retry                   | resumable logic later |
| Preview                 | pipeline output       |

Frontend handles **UX**.
Backend handles **truth + safety**.

---

🎬 **Real-Time Collaboration (Senior Backend Mode)**

> *“React real-time vs backend real-time for animation reviews”*

This work introduces **true senior territory**: real-time collaboration.

CRUD and uploads are foundational, but **real-time collaboration** is where systems evolve into *platforms*.

Animation studios *live* in real-time environments:

* Directors comment while artists scrub frames
* Producers approve shots instantly
* Teams across time zones collaborate live

This dynamic collaboration cannot be effectively simulated with traditional polling mechanisms.

---

## MENTAL MODEL (RESET)

### React Real-Time vs Backend Real-Time

| Frontend (React) | Backend (You)          |
| ---------------- | ---------------------- |
| WebSocket client | WebSocket authority    |
| Optimistic UI    | Event ordering & truth |
| Local state      | Shared studio state    |
| useEffect        | Event-driven system    |
| UI updates       | Domain events          |

> 🎯 Backend real-time = **shared source of truth + fan-out**

---

# GOALS

This work accomplishes:

✅ WebSocket server integrated with Express
✅ Studio-scoped real-time rooms
✅ Asset review comments (live)
✅ Approval events (Director → Artists)
✅ Authorization on socket connections
✅ Event-driven mental model (critical for render farms later)

This is **senior-level distributed thinking**.

---

### Implementation Details for Real-Time Collaboration

This system provides collaborative features using WebSocket technology, specifically Socket.IO, integrated with Express.

#### Key Aspects

| Aspect              | Description                                                                                             | Why it Matters                                                                        |
| :------------------ | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| **Socket.IO Choice** | Provides robust features like reconnection handling, room abstraction, and transport fallbacks.              | Crucial for reliable real-time communication in production environments with varying network conditions. |
| **Socket Server**   | `src/infra/realtime/socket.ts` initializes the Socket.IO server and implements authentication middleware. | Ensures only authorized users establish WebSocket connections; user data (`studioId`, `userId`, `role`) attached to `socket.data`. |
| **Server Integration** | `server.ts` uses `http.createServer(app)` to wrap the Express app, allowing Socket.IO to share the same HTTP server. | Efficiently handles both HTTP requests and WebSocket connections on the same port.     |
| **Domain Events**   | Paradigm shifts from requests to events (e.g., `asset:commented`, `asset:approved`).                         | Events reflect changes in application state, driving UI updates and notifications.    |
| **Comment Event**   | `socket.on("asset:comment", ...)` handler emits `asset:commented` to studio-scoped rooms.                | Allows real-time commenting; ensures only relevant users receive updates for their studio. |
| **Approval Event**  | `socket.on("asset:approve", ...)` handler checks user role (DIRECTOR/PRODUCER) before emitting `asset:approved` to studio rooms. | Enforces role-based authorization for real-time events.                               |
| **Persistence Note**| Current focus is on real-time fan-out; comment/approval persistence handled in later phases.           | Real-time communication and data persistence are distinct problems, often decoupled.  |

#### Why This Scales to 1000+ Artists

*   **Horizontal Scaling**: Supports multiple Socket.IO server instances behind a load balancer.
*   **Sticky Sessions/Redis Adapter**: Ensures consistent client connections and event propagation across servers.
*   **Event Fan-out**: Efficiently broadcasts events to many connected clients.
*   **Studio Isolation**: Ensures events are only delivered to clients within the same studio, preventing data leakage.

#### Common Senior Mistakes (Avoid These)

*   ❌ Broadcasting to everyone (inefficient and insecure).
*   ❌ No authentication on WebSocket connections (critical security flaw).
*   ❌ Using sockets for standard CRUD operations (best handled by REST APIs).
*   ❌ Storing business logic solely in the frontend.
*   ✅ Embrace event-driven backend design.
*   ✅ Utilize scoped rooms for event distribution.
*   ✅ Design stateless WebSocket servers for scalability.

---

🔗 FRONTEND CONNECTION

The frontend (e.g., a React application) integrates with this real-time system:
*   **React Client Example**: The frontend would initialize a Socket.IO client, passing the JWT for authentication. It would then listen for specific events (`asset:commented`, `asset:approved`) to update its UI in real-time.
*   **Frontend Renders State**: The React app focuses on rendering the current state received from the backend events and handles user interactions.
*   **Backend Guarantees Delivery**: The backend is responsible for secure, authorized, and correctly scoped delivery of real-time events.

---

🎬 **Asset Versioning (Senior Backend Mode)**

> *“Git-like versioning for animation assets”*

This work crosses another **major senior boundary**.

CRUD, uploads, and real-time features are foundational, but **without versioning**, an animation studio backend is unusable in real life.

Animation studios **never overwrite assets**.
They **evolve** them.

---

## MENTAL MODEL (CRITICAL SHIFT)

### Think Git — not Dropbox

| Naive System ❌      | Studio System ✅          |
| ------------------- | ------------------------ |
| Replace file        | Create new version       |
| No history          | Full audit trail         |
| No rollback         | Instant rollback         |
| Conflicts overwrite | Conflicts detected       |
| “Who broke this?”   | “Who changed what & why” |

> 🎯 Assets are **immutable snapshots**.
> Versions are **the truth**.

---

# GOALS

This work accomplishes:

✅ Asset version model (immutable)
✅ Version numbering (v1, v2, v3…)
✅ Version-linked file storage
✅ Rollback capability
✅ Version-aware upload pipeline
✅ Audit-ready asset history

This is **real studio-grade asset management**.

---

### Implementation Details for Asset Versioning

#### Key Principles

*   **Never overwrite asset files.** Every change creates a new, immutable version.
*   The `Asset` document becomes a container, and each `AssetVersion` document is a unit of truth.

#### Core Components

| Component                       | Description                                                                                             |
| :------------------------------ | :------------------------------------------------------------------------------------------------------ |
| **`AssetVersion` Model**        | (`src/app/repositories/models/AssetVersion.ts`) Captures immutable snapshots: `assetId`, `version`, `createdBy`, `file` metadata, `changeNote`. Unique index on `{ assetId, version }`. |
| **Update `Asset` Model**        | (`src/app/repositories/models/Asset.ts`) Adds `currentVersion` field, acting as a pointer to the active version. |
| **Version Repository**          | (`src/app/repositories/AssetVersionRepository.ts`) Provides methods like `getLatestVersion`, `create`, `findByAsset`, `findVersion`. |
| **Versioned Upload Service**    | (`src/app/services/AssetVersionService.ts`) Handles new version uploads: determines `nextVersion`, saves file to version-specific path, creates `AssetVersion` record, updates parent `Asset`'s `currentVersion`. |
| **Version Controller**          | (`src/app/controllers/AssetVersionController.ts`) Manages HTTP requests for version uploads (`POST /assets/:id/versions`) and listings (`GET /assets/:id/versions`). |
| **Version Routes**              | (`src/infra/http/routes/asset-version.routes.ts`) Defines secured routes for version creation and retrieval, mounted under `/assets`. |
| **Rollback Feature**            | `AssetService` (`src/app/services/AssetService.ts`) includes `rollbackAsset(assetId, studioId, version)` to update `currentVersion` pointer. History is preserved; state is changed safely. |

#### Why This Scales to Real Studios

*   **Non-Destructive Updates**: Old versions are never lost, ensuring robust recovery and historical analysis.
*   **Full Audit History**: Every change is logged, providing a complete modification trail.
*   **Safe Collaboration**: Artists can work on different versions or revert changes without affecting others' work.
*   **Parallel Workflows**: Supports different branches or experimental versions.
*   **Instant Rollbacks**: Quick reversion to any previous state without complex data migrations.

#### Common Experienced Engineer Warnings

*   ❌ Avoid overwriting files (leads to irreversible data loss).
*   ❌ Avoid deleting versions (eliminates audit trails).
*   ❌ Avoid storing versions *inside* the asset document (bloated documents, poor query performance for asset history).
*   ❌ Ensure unique constraints for version integrity.
*   ✅ Embrace immutable versions.
*   ✅ Implement pointer-based rollback.
*   ✅ Isolate file paths for each version.
*   ✅ Design for auditability.

---

🔗 FRONTEND CONNECTION

| Frontend               | Backend                      |
| :--------------------- | :--------------------------- |
| Version dropdown       | `GET /assets/:id/versions`   |
| Upload new file        | `POST /assets/:id/versions`  |
| Rollback button        | `PATCH /assets/:id/rollback` |
| Change notes           | `changeNote` field           |

---

🎬 **Render Queue System (Senior Backend Mode)**

> *“Background processing vs React async patterns”*

This work is a **huge leap** into distributed, asynchronous systems.
HTTP requests should never be blocked by heavy work like rendering. We solve this by building a **job queue**—the core of a render farm.

---

## MENTAL MODEL (CRITICAL SHIFT)

### React Async vs Backend Async

| React           | Backend           |
| --------------- | ----------------- |
| `useEffect`     | Background worker |
| Promise         | Job               |
| Loading spinner | Job state machine |
| Retry button    | Automatic retry   |
| UI thread       | Worker process    |

> 🎯 **Never block HTTP**. Render jobs must live *outside* the request lifecycle.

---

# GOALS

This work accomplishes:

✅ Bull-based render job queue
✅ Redis-backed background workers
✅ Render job domain model
✅ Job lifecycle (queued → processing → completed/failed)
✅ Progress tracking & real-time updates
✅ Automatic retries & failure handling

This is **staff-level backend engineering**.

---

### Implementation Details for Render Queue System

#### Key Principles

*   **API is a dispatcher:** The API's only job is to accept a render request and enqueue it. It responds immediately with `202 Accepted`.
*   **Worker does the work:** A separate, isolated worker process picks up jobs from the queue, preventing any impact on API performance.
*   **Database is the source of truth:** A `RenderJob` model tracks the status, progress, and history of every job, providing an auditable record.
*   **Real-time feedback:** The worker emits progress events over WebSockets, giving the user a live view of the render.

#### Core Components

| Component | Description |
| :--- | :--- |
| **Queue Dependencies** | `bull` for job management; `ioredis` for Redis connection. |
| **`RenderJob` Model** | (`models/RenderJob.ts`) Mongoose schema for `studioId`, `assetId`, `status`, `progress`, `error`. |
| **Render Queue** | (`infra/queue/render.queue.ts`) Bull queue (`render-jobs`) connected to Redis via `env.REDIS_URL`. |
| **`RenderService`** | (`services/RenderService.ts`) Creates `RenderJob` in DB, adds job to queue with retry logic. |
| **`render.worker.ts`** | (`workers/render.worker.ts`) Processes jobs, updates DB, emits `render:progress` socket events. |
| **`RenderController`** | (`controllers/RenderController.ts`) API endpoint to call `RenderService` and start the process. |

#### Common Experienced Engineer Warnings

*   ❌ Never do heavy work in controllers.
*   ❌ Don't block the event loop.
*   ❌ Don't rely on Redis as the only source of truth.
*   ✅ Use background workers for async tasks.
*   ✅ Design for failure with retries and backoff.
*   ✅ Provide real-time UI updates for long-running jobs.

---

🔗 FRONTEND CONNECTION

| Frontend        | Backend          |
| --------------- | ---------------- |
| “Render” button | `POST /assets/:id/render` (returns `202 Accepted`) |
| Progress bar    | WebSocket events (`render:progress`) |
| Status badge    | DB-backed state, updated via WebSocket events |
| Retry button    | Could trigger another `POST /render` for a failed job |

---

🎬 **Asset Pipeline Automation (Senior Backend Mode)**

> *“Automated workflows vs manual processes”*

This connects everything you’ve built into a cohesive, automated **pipeline**. Instead of isolated features, we now have a production system that orchestrates asset processing from upload to render-ready.

---

## MENTAL MODEL (THIS IS KEY)

### Manual vs. Automated Thinking

| Junior / Manual       | Senior / Automated       |
| --------------------- | ------------------------ |
| Upload file           | Upload triggers pipeline |
| Click "generate"      | Thumbnail auto-generated |
| Start render manually | Render auto-enqueued     |
| Check status          | Pipeline state machine   |
| “Did we forget a step?” | System guarantees order  |

> 🎯 A pipeline is a **deterministic sequence of steps**, not just a collection of endpoints.

---

# GOALS

This work accomplishes:

✅ A pipeline state machine for each asset version
✅ Background automation using a dedicated orchestration queue
✅ Placeholders for FFmpeg (video) and Sharp (image) integration
✅ Deterministic, observable, and retry-able workflow steps
✅ Failure isolation (a pipeline step can fail without crashing the system)

This is **senior → staff-level system design**.

---

### Implementation Details for Asset Pipeline

#### Key Principles

*   **Orchestration, not Execution:** A new `pipelineQueue` is introduced. Its only job is to manage the *sequence* of pipeline steps, not to perform heavy work itself.
*   **Trigger on Upload:** The pipeline is automatically started by the `AssetVersionService` the moment a new version is successfully uploaded.
*   **State Machine in the Database:** A new `AssetPipeline` model tracks the lifecycle of an asset version (`UPLOADED` → `VALIDATING` → `PROCESSING_PREVIEW` → etc.), providing a clear, auditable status.
*   **Workers for Each Step:** The pipeline worker (`pipeline.worker.ts`) walks through the state machine. In a real system, it would dispatch jobs to other specialized workers (e.g., a thumbnail worker, a validation worker). For now, it simulates these steps and then enqueues the final render job.

#### Core Components

| Component | Description |
| :--- | :--- |
| **`AssetPipeline` Model** | (`models/AssetPipeline.ts`) Tracks pipeline `status` and `error` for each `assetId` and `version`. |
| **Pipeline Queue** | (`infra/queue/pipeline.queue.ts`) A new Bull queue (`asset-pipeline`) dedicated to orchestration. |
| **`AssetVersionService`** | (Updated) Now creates an `AssetPipeline` record and adds a job to the `pipelineQueue` on new version upload. |
| **`pipeline.worker.ts`** | (`workers/pipeline.worker.ts`) The core orchestrator. It fetches the pipeline, updates its status through each step, and dispatches jobs to other queues (like the `renderQueue`). |

#### Common Experienced Engineer Warnings

*   ❌ Don't put pipeline orchestration logic in controllers.
*   ❌ Don't run heavyweight processing (like FFmpeg) in an orchestration worker. The orchestrator dispatches; other workers execute.
*   ❌ Avoid manual steps in a production workflow. If it can be automated, it should be.
*   ✅ Use separate queues for different concerns (e.g., pipeline, rendering, transcoding).
*   ✅ Make pipeline steps idempotent and retry-able.

---

🔗 FRONTEND CONNECTION

| Frontend UI      | Backend System         |
| ---------------- | ---------------------- |
| Upload progress  | File upload stream     |
| "Processing..." badge | `pipeline:update` WebSocket event |
| Preview thumbnail | Output of a future thumbnail worker |
| "Ready to Render" status | `RENDER_QUEUED` pipeline state |
| Error message    | `FAILED` pipeline state with error |

Frontend reacts to the state of the backend systems. Backend **guarantees** the process.

---

🎬 **Performance Optimization & Large-Scale File Handling (Senior Backend Mode)**

> *“Large file handling, streaming, and database scaling”*

This section focuses on making the system survive at scale. We're moving from a system that *works* to a system that is performant, stable, and resilient under the pressure of thousands of artists and multi-gigabyte files.

---

## MENTAL MODEL (CORE SHIFT)

### Performance is Not Just Speed

True performance for a backend system means:
- **Predictable Latency:** Responds in a reliable time frame.
- **Bounded Memory Usage:** Never runs out of memory (OOM).
- **Graceful Degradation:** Handles high load without collapsing.
- **Stable Throughput:** Maintains a consistent rate of processing.

> 🎯 A system that is *slightly slower but never crashes* is infinitely better than a fast system that is unstable.

---

# GOALS

This work accomplishes:

✅ Zero-buffering, streaming file downloads with resume support (HTTP Range Requests).
✅ A clear database indexing strategy for performance-critical models.
✅ A pattern for Redis caching on hot data paths.
✅ Backpressure handling in background workers via concurrency control.
✅ A mental model for scaling to real studio size.

This is **thinking in limits, pressure, and failure modes**.

---

### Implementation Details for Scalability

#### Key Principles

*   **Stream Everything:** Large files are never loaded into server memory. The new `AssetDownloadController` streams files directly from storage to the client, handling backpressure automatically. It also supports HTTP Range Requests, allowing clients to pause and resume downloads.
*   **Indexes are Mandatory:** Queries on large collections without indexes will kill database performance. We've added indexes to the `studioId`, `createdAt`, `status`, and `version` fields on our core models (`Asset`, `AssetVersion`, `RenderJob`) to ensure queries are fast and efficient.
*   **Cache Hot Data:** Not all data is worth caching. The new `AssetCacheService` implements a simple read-through cache for asset metadata, a "hot path" that is read frequently. This reduces load on the database. The cache has a short TTL (Time To Live) to ensure data doesn't become too stale.
*   **Control Concurrency:** Uncontrolled background jobs can overwhelm a system. We've introduced a concurrency limit to our queue processors (`render.worker.ts` and `pipeline.worker.ts`) to ensure that only a fixed number of heavy tasks run at the same time on a single worker instance.

#### Core Components

| Component | Description |
| :--- | :--- |
| **`AssetDownloadController`** | (`controllers/AssetDownloadController.ts`) Streams a specific asset version to the client, with support for HTTP Range Requests. |
| **Model Indexes** | (`models/*.ts`) Added `.index()` calls to Mongoose schemas for performance-critical query paths. |
| **`AssetCacheService`** | (`services/AssetCacheService.ts`) A read-through cache using Redis to store and retrieve asset metadata, reducing DB load. |
| **Worker Concurrency** | (`workers/*.ts`) The `.process()` method for Bull queues is now given a concurrency factor to limit parallel job execution. |


#### Common Experienced Engineer Warnings

*   ❌ Never load a large file into memory with `fs.readFile`. Always stream.
*   ❌ Deploying to production without database indexes is a recipe for disaster.
*   ❌ Over-caching is dangerous. Caching write-paths or authorization logic can lead to bugs and security holes.
*   ❌ Running CPU-heavy tasks on the main API process will block the event loop and crash your service.
*   ✅ Control worker concurrency to protect your system from load spikes.

---

🔗 FRONTEND CONNECTION

| Frontend Feature | Backend Technique      |
| ---------------- | ---------------------- |
| Resumable Download | Streaming + HTTP Range Requests |
| Infinite Scroll / Pagination | Bounded, indexed DB queries |
| Fast Asset Loading | Redis Caching        |
| Stable UI under Load | Worker Isolation & Backpressure |

---

## Tools and Dependencies

Here is a brief overview of all tools and dependencies used in this project.

### Runtime Dependencies (`dependencies`)

These are the packages required for the application to run in production.

| Package              | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `express`            | The core web framework for building the API endpoints.                      |
| `dotenv`             | Loads environment variables from a `.env` file into `process.env`.          |
| `helmet`             | Secures the Express app by setting various HTTP headers.                    |
| `express-rate-limit` | Limits repeated requests to public APIs and/or endpoints to prevent abuse.  |
| `mongoose`           | An Object Data Modeling (ODM) library for MongoDB and Node.js.              |
| `bcrypt`             | A library for hashing passwords securely.                                   |
| `jsonwebtoken`       | Implements JSON Web Tokens (JWT) for secure authentication.                 |
| `winston`            | A versatile logging library for Node.js.                                    |
| `prom-client`        | A Prometheus client for Node.js, enabling metric collection.                |
| `express-validator`  | A middleware for Express.js that provides validation and sanitization features. |
| `multer`             | A middleware for handling `multipart/form-data`, primarily for file uploads. |
| `socket.io`          | Enables real-time, bidirectional, event-based communication between client and server. |

### Development Dependencies (`devDependencies`)

These are the packages used only for development and testing, not for the production application.

| Package                   | Description                                                               |
| ------------------------- | ------------------------------------------------------------------------- |
| `typescript`              | A superset of JavaScript that adds static types, improving code quality.  |
| `ts-node-dev`             | Runs the TypeScript application and automatically restarts it when files change. |
| `@types/node`             | Provides TypeScript type definitions for the Node.js runtime.            |
| `@types/express`          | Provides TypeScript type definitions for the Express framework.           |
| `jest`                    | A testing framework for writing and running tests.                        |
| `ts-jest`                 | A Jest transformer that allows you to test TypeScript code.               |
| `@types/jest`             | Provides TypeScript type definitions for the Jest testing framework.      |
| `supertest`               | A library for testing HTTP endpoints, used for integration tests.         |
| `@types/bcrypt`           | Provides TypeScript type definitions for the `bcrypt` library.            |
| `@types/jsonwebtoken`     | Provides TypeScript type definitions for the `jsonwebtoken` library.      |
| `@types/express-validator`| Provides TypeScript type definitions for the `express-validator` library. |
| `@types/multer`           | Provides TypeScript type definitions for the `multer` library.            |

### Configuration and New Files

These files configure the behavior of the tools we use or are new files introduced in the project.

| File/Variable                         | Description                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------- |
| `tsconfig.json`                       | Configures the TypeScript compiler (`tsc`) with rules for compiling our code. |
| `jest.config.js`                      | Configures the Jest testing framework, telling it how to find and run tests.  |
| `.gitignore`                          | Tells Git which files and folders to ignore (e.g., `node_modules`, `dist`). |
| `Dockerfile`                          | Contains instructions for building a Docker image of our application.     |
| `docker-compose.yml`                  | Defines and runs our multi-container Docker application.                 |
| `.env`                                | Stores environment-specific variables like the `PORT`, `MONGO_URI`, and `JWT_SECRET`.                   |
| `MONGO_URI` (in `.env`)               | The connection string for the MongoDB database.                             |
| `JWT_SECRET` (in `.env`)              | A secret key used to sign and verify JSON Web Tokens.                       |
| `src/infra/database/mongoose.ts`      | Handles the connection to the MongoDB database.                           |
| `src/app/repositories/models/Studio.ts` | Defines the Mongoose schema and model for a Studio.                       |
| `src/app/repositories/models/User.ts`   | Defines the Mongoose schema and model for a User, including password hashing. |
| `src/app/services/AuthService.ts`     | Contains the business logic for user registration and login.              |
| `src/app/controllers/AuthController.ts` | Handles HTTP requests related to authentication.                          |
| `src/infra/http/routes/auth.routes.ts` | Defines the API routes for authentication.                                |
| `src/shared/middlewares/auth.ts`      | Middleware to authenticate requests using JWT.                            |
| `tests/auth.test.ts`                  | Contains tests for the authentication flow.                               |
| `src/app/repositories/models/Asset.ts`  | Defines the Mongoose schema and model for an Asset.                       |
| `src/app/repositories/AssetRepository.ts` | Abstracts the data access logic for Assets.                               |
| `src/app/services/AssetService.ts`      | Contains the business logic for asset creation and retrieval.             |
| `src/app/controllers/AssetController.ts`  | Handles HTTP requests related to assets.                                  |
| `src/infra/http/routes/asset.routes.ts` | Defines the API routes for assets, protected by authentication.           |
| `tests/asset.service.test.ts`         | Contains service-level tests for the asset business logic.                |
| `src/shared/errors/DomainError.ts`    | Defines an abstract base class for custom domain-specific errors.         |
| `src/shared/errors/ValidationError.ts`| Represents validation-related errors (e.g., missing required fields).     |
| `src/shared/errors/AuthorizationError.ts`| Represents authorization-related errors (e.g., insufficient permissions). |
| `src/shared/errors/RenderError.ts`    | Represents errors specific to rendering failures.                         |
| `src/shared/middlewares/correlationId.ts` | Assigns a unique correlation ID to each incoming request for tracing.     |
| `src/infra/logging/logger.ts`         | Configures Winston for structured logging across the application.         |
| `src/shared/middlewares/requestLogger.ts` | Logs details of incoming HTTP requests, including their correlation ID.   |
| `src/infra/metrics/metrics.ts`        | Configures Prometheus metrics collection, including HTTP request counts.  |
| `src/infra/http/metrics.ts`           | Exposes an HTTP endpoint (`/metrics`) for Prometheus to scrape metrics.   |
| `/ready` endpoint (in `health.ts`)    | An endpoint indicating the application is ready to handle requests (beyond just being alive). |
| `src/infra/http/validators/asset.validators.ts` | Defines validation rules for asset-related HTTP requests.                   |
| `tests/asset.api.test.ts`             | Contains comprehensive API tests for asset CRUD operations, including pagination and ownership checks. |
| `src/infra/storage/StorageProvider.ts`| Defines an interface for abstracting file storage operations.             |
| `src/infra/storage/LocalStorageProvider.ts` | Provides a local filesystem implementation of the `StorageProvider` interface. |
| `src/infra/http/upload.ts`            | Configures Multer for handling multipart file uploads, specifying destination and limits. |
| `src/app/services/AssetUploadService.ts`| Handles the business logic for uploading assets, interacting with storage and asset repository. |
| `src/app/controllers/AssetUploadController.ts` | Manages HTTP requests for asset uploads.                                  |
| `src/infra/http/routes/asset-upload.routes.ts` | Defines the API routes for asset uploads.                                 |
| `src/infra/realtime/socket.ts`        | Initializes and configures the Socket.IO server for real-time communication, including authentication and event handling. |
| `src/app/repositories/models/AssetVersion.ts` | Defines the Mongoose schema and model for an Asset Version, capturing immutable snapshots. |
| `src/app/repositories/AssetVersionRepository.ts` | Provides data access methods specifically for AssetVersion documents, such as retrieving latest version. |
| `src/app/services/AssetVersionService.ts` | Handles the business logic for creating new asset versions during uploads, managing versioning logic. |
| `src/app/controllers/AssetVersionController.ts` | Manages HTTP requests related to asset versions, including uploads and listing. |
| `src/infra/http/routes/asset-version.routes.ts` | Defines the API routes for asset versioning operations.                   |

### Generating Secrets

To generate a secure `JWT_SECRET` for your `.env` file, you can use the following command:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4 — Create the file (this must succeed first)

Run this exact command in your terminal:
```bash
echo "This is a dummy character model data." > character.fbx
```
Then confirm the file exists:
```bash
ls -l character.fbx
```
If you see the file listed, you're good.
If you don’t see it, you’re probably in the wrong directory — just tell me what OS you’re on and I’ll guide you.