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

#### Why Regular Uploads Fail (Important)
Traditionally, many web applications buffer entire file uploads into memory before processing. This approach is highly problematic for large files:
*   **Memory Exhaustion**: Loading multi-gigabyte files into Node.js memory can quickly consume all available RAM, leading to application crashes (`Out Of Memory` errors).
*   **Performance Degradation**: Buffering blocks the event loop, impacting concurrent user requests and overall server responsiveness.
*   **Resource Inefficiency**: Wastes server resources, especially on render machines that might have limited available memory for non-rendering tasks.

#### The Experienced Engineer's Solution: Streaming
Instead of buffering, the robust solution involves streaming files directly to disk or object storage. This ensures:
*   **No Memory Spikes**: Files are processed in chunks, minimizing memory footprint.
*   **High Concurrency**: The server can handle many simultaneous large uploads without degradation.
*   **Crash-Safe**: Intermediate storage (`tmp` directory) allows for safer handling and potential recovery.

#### Storage Abstraction (Key Senior Move)
To ensure flexibility and future-proofing, a storage abstraction layer is introduced. This separates the application's storage logic from the underlying storage mechanism.
*   **`StorageProvider.ts`**: Defines a contract (`interface`) for how files are saved. This allows easy swapping of storage providers (e.g., local filesystem, AWS S3, Google Cloud Storage) without altering core application logic.
*   **`LocalStorageProvider.ts`**: An initial implementation of `StorageProvider` that saves files to the local filesystem. This is suitable for development and learning, demonstrating the streaming principle. Files are moved directly from Multer's temporary storage to their final destination, avoiding memory buffering.

#### Multer Configuration (Safe Defaults)
`multer` is configured with safe and efficient defaults:
*   **`dest: path.resolve("tmp")`**: Specifies a temporary directory where Multer will store uploaded file chunks before they are moved to their final location by the storage provider. This leverages the operating system's efficient handling of temporary files.
*   **`limits: { fileSize: 10 * 1024 * 1024 * 1024 }`**: Sets a generous file size limit (10GB) to prevent denial-of-service attacks or accidental uploads of excessively large files, while still accommodating typical animation asset sizes.

#### Extending the Asset Model (File Metadata)
The `Asset` model (`src/app/repositories/models/Asset.ts`) is updated to include a `file` object. This stores essential metadata about the uploaded file:
*   **`path`**: The location where the file is stored (e.g., on disk or a reference to object storage).
*   **`size`**: The size of the uploaded file in bytes.
*   **`mimeType`**: The file's MIME type (e.g., `image/jpeg`, `video/mp4`, `application/octet-stream`).
This ensures that the database stores *pointers* to the files, not the binary data itself, which is crucial for performance and scalability.

#### The Upload Service (Pipeline Entry Point)
The `AssetUploadService` (`src/app/services/AssetUploadService.ts`) acts as the central logic for handling asset uploads. It orchestrates the process:
*   **Validation**: Ensures a file is actually provided and that the `assetId` exists and belongs to the correct studio.
*   **Storage**: Utilizes the `LocalStorageProvider` to save the incoming file stream to disk.
*   **Metadata Update**: Updates the `Asset` document in MongoDB with the file's path, size, and MIME type.
This service is designed to be the gateway for future asset pipeline steps like thumbnail generation, transcoding, and automated validation.

#### The Upload Controller
The `AssetUploadController` (`src/app/controllers/AssetUploadController.ts`) is a thin HTTP translation layer. It:
*   Extracts necessary information from the `Request` object (`req.user.studioId`, `req.user.userId`, `req.params.id`, `req.file`).
*   Delegates the core business logic to the `AssetUploadService`.
*   Sends back the updated asset information as an HTTP response.

#### The Upload Route (Secured + Streaming)
A dedicated route (`src/infra/http/routes/asset-upload.routes.ts`) is created for handling file uploads.
*   **`assetUploadRouter.post("/:id/upload", ...)`**: Defines a POST endpoint for uploading a file to a specific asset ID.
*   **`authenticate`**: Ensures only authenticated and authorized users can upload files.
*   **`upload.single("file")`**: Multer middleware that processes the incoming multipart form data, specifically looking for a field named "file". It handles the streaming of the file to the temporary directory.

#### Why This Scales to Real Studios
This approach to file uploads scales effectively because:
*   **Streaming**: Prevents memory exhaustion, crucial for large animation files.
*   **Abstraction**: Allows seamless migration to cloud object storage (S3, GCS) later.
*   **Metadata Separation**: Keeps database lean and fast, storing references not blobs.
*   **Security**: Ensures studio isolation and authentication protect valuable IP.
*   **Pipeline-Ready**: The service structure provides clear hooks for integrating complex asset processing workflows.

#### Common Experienced Engineer Warnings
*   ❌ **Never store files in MongoDB**: MongoDB is a document database, not a filesystem. Storing large binary data directly (blobs) degrades database performance and is inefficient. Store metadata/pointers instead.
*   ❌ **Never buffer large uploads**: Buffering consumes excessive memory and can crash servers. Always stream.
*   ❌ **Never trust file extensions**: Validate file types based on MIME types and actual content, not just the extension, to prevent security vulnerabilities.
*   ✅ **Always abstract storage**: Decouple your application from the storage implementation to maintain flexibility.
*   ✅ **Always isolate tenants**: Ensure that one studio's assets are strictly inaccessible to another.

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

#### Why Socket.IO (Enterprise Context)
While raw WebSockets offer real-time communication, Socket.IO provides crucial enterprise-grade features:
*   **Reconnection Handling**: Automatically manages reconnections when network connectivity is lost or interrupted, crucial for artists with unstable connections.
*   **Room Abstraction**: Simplifies broadcasting events to specific groups of connected clients (e.g., all users in a particular studio).
*   **Transport Fallback**: Gracefully degrades to HTTP long-polling if WebSockets are not available, ensuring broader compatibility.
*   **Event Semantics**: Provides a simple, event-based API for sending and receiving structured messages.
These features are vital for maintaining robust real-time communication in a demanding production environment.

#### Socket Server (Infra Layer)
The `setupSocket` function (`src/infra/realtime/socket.ts`) initializes and configures the Socket.IO server:
*   **`io = new Server(server, { cors: { origin: "*" } });`**: Attaches Socket.IO to the existing HTTP server and configures CORS for client connections.
*   **`io.use((socket, next) => { ... });`**: Implements middleware to authenticate WebSocket connections. The JWT from the client's handshake is verified, and user data (`studioId`, `userId`, `role`) is attached to the `socket.data.user` property. This ensures that only authorized users can establish a real-time connection.
*   **`io.on("connection", (socket) => { ... });`**: Handles new client connections. The connected user is automatically joined to a studio-specific room (`studio:${studioId}`), ensuring that events are only broadcast to relevant users.

#### Integrate Socket with Server
The `server.ts` file is updated to create an `http.Server` that wraps the Express `app`. This allows Socket.IO to share the same HTTP server, listening on the same port.
*   **`const server = http.createServer(app);`**: Creates the HTTP server.
*   **`setupSocket(server);`**: Integrates Socket.IO with the HTTP server.
*   **`server.listen(PORT, ...);`**: The HTTP server (now handling both Express and Socket.IO) starts listening for requests.

#### Domain Events (Key Senior Shift)
In real-time systems, the paradigm shifts from traditional "requests" to "events". Instead of requesting data, the system emits events that reflect changes in the application state.
*   **`asset:commented`**: An event indicating a new comment has been added to an asset.
*   **`asset:approved`**: An event signifying an asset has been approved.
*   **`asset:changesRequested`**: An event indicating changes are required for an asset.
These events drive UI updates, trigger notifications, and feed activity logs.

#### Real-Time Comment Event
The `asset:comment` event handler allows clients to send comments on assets in real-time.
*   When a client emits `asset:comment` with a payload, the server processes it.
*   User and studio context are derived from the authenticated socket.
*   The server then emits an `asset:commented` event to all clients within the specific `studio:${studioId}` room. This ensures that only relevant users receive the comment updates.

#### Approval Event (Role-Aware)
The `asset:approve` event handler enables role-based approvals in real-time.
*   When a client emits `asset:approve`, the server first checks if the connected user's `role` is either "DIRECTOR" or "PRODUCER".
*   If authorized, the server emits an `asset:approved` event to the `studio:${studioId}` room, notifying all relevant clients of the approval.
This demonstrates how authorization extends to real-time events, not just traditional API calls.

#### Why We Don’t Write to DB (Yet)
The current implementation focuses on real-time fan-out and event propagation. Persistence of comments and approvals (e.g., writing them to MongoDB) will be handled in subsequent phases to keep the scope focused on establishing the real-time communication layer. Real-time communication and data persistence solve different problems and are often decoupled.

#### Scaling This to 1000+ Artists
This real-time architecture is designed for scalability:
*   **Horizontal Scaling**: Multiple Socket.IO server instances can be run behind a load balancer.
*   **Sticky Sessions (or Redis Adapter)**: For deployments with multiple Socket.IO servers, sticky sessions or a Redis adapter (for pub/sub) ensure that clients consistently connect to the same server or that events are correctly propagated across all servers.
*   **Event Fan-out**: Efficiently broadcasts events to numerous connected clients without overloading individual server instances.
*   **Studio Isolation**: Ensures events are only delivered to clients within the same studio, preventing data leakage.

#### Common Senior Mistakes (Avoid These)
*   ❌ **Broadcasting to everyone**: Inefficient and insecure; always scope events to relevant users/rooms.
*   ❌ **No auth on socket connection**: Critical security flaw; authenticate all WebSocket connections upfront.
*   ❌ **Using sockets for CRUD**: WebSockets are for events/real-time updates, not for standard create/read/update/delete operations which are best handled by REST APIs.
*   ❌ **Storing business logic in frontend**: Keep business logic on the backend, ensuring a single source of truth and consistent enforcement of rules.
*   ✅ **Event-driven backend**: Embrace an event-driven paradigm for real-time systems.
*   ✅ **Scoped rooms**: Utilize Socket.IO rooms to manage event distribution effectively.
*   ✅ **Stateless servers**: Design servers to be stateless for easier horizontal scaling.

---

🔗 FRONTEND CONNECTION

The frontend (e.g., a React application) integrates with this real-time system:
*   **React Client Example**: The frontend would initialize a Socket.IO client, passing the JWT for authentication. It would then listen for specific events (`asset:commented`, `asset:approved`) to update its UI in real-time.
*   **Frontend Renders State**: The React app focuses on rendering the current state received from the backend events and handles user interactions.
*   **Backend Guarantees Delivery**: The backend is responsible for secure, authorized, and correctly scoped delivery of real-time events.

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
