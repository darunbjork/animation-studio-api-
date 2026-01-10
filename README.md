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

## Tools and Dependencies

Here is a brief overview of the tools and dependencies used in this project.

### Runtime Dependencies (`dependencies`)

These are the packages required for the application to run in production.

| Package              | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `express`            | The core web framework for building the API endpoints.                      |
| `dotenv`             | Loads environment variables from a `.env` file into `process.env`.          |
| `helmet`             | Secures the Express app by setting various HTTP headers.                    |
| `express-rate-limit` | Limits repeated requests to public APIs and/or endpoints to prevent abuse.  |

### Development Dependencies (`devDependencies`)

These are the packages used only for development and testing, not for the production application.

| Package          | Description                                                                     |
| ---------------- | ------------------------------------------------------------------------------- |
| `typescript`     | A superset of JavaScript that adds static types, improving code quality.        |
| `ts-node-dev`    | Runs the TypeScript application and automatically restarts it when files change. |
| `@types/node`    | Provides TypeScript type definitions for the Node.js runtime.                  |
| `@types/express` | Provides TypeScript type definitions for the Express framework.                 |
| `jest`           | A testing framework for writing and running tests.                              |
| `ts-jest`        | A Jest transformer that allows you to test TypeScript code.                     |
| `@types/jest`    | Provides TypeScript type definitions for the Jest testing framework.            |
| `supertest`      | A library for testing HTTP endpoints, used for integration tests.               |

### Configuration Files

These files configure the behavior of the tools we use.

| File                 | Description                                                              |
| -------------------- | ------------------------------------------------------------------------ |
| `tsconfig.json`      | Configures the TypeScript compiler (`tsc`) with rules for compiling our code. |
| `jest.config.js`     | Configures the Jest testing framework, telling it how to find and run tests.  |
| `.gitignore`         | Tells Git which files and folders to ignore (e.g., `node_modules`, `dist`). |
| `Dockerfile`         | Contains instructions for building a Docker image of our application.     |
| `docker-compose.yml` | Defines and runs our multi-container Docker application.                 |
| `.env`               | Stores environment-specific variables like the `PORT`.                   |

---

🎬 **MongoDB + Authentication (Senior Backend Mode)**

> *“Database design vs React state for animation data”*

You’re officially moving from **“server exists”** → **“system of record exists.”**
This is where backend engineering truly begins.

---

## MENTAL MODEL (VERY IMPORTANT)

Before code, let’s reframe how you should think.

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

## New Tools, Dependencies, and Configuration

### Runtime Dependencies (`dependencies`)

| Package        | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| `mongoose`     | An Object Data Modeling (ODM) library for MongoDB and Node.js.    |
| `bcrypt`       | A library for hashing passwords securely.                         |
| `jsonwebtoken` | Implements JSON Web Tokens (JWT) for secure authentication.       |

### Development Dependencies (`devDependencies`)

| Package             | Description                                                           |
| ------------------- | --------------------------------------------------------------------- |
| `@types/bcrypt`     | Provides TypeScript type definitions for the `bcrypt` library.        |
| `@types/jsonwebtoken` | Provides TypeScript type definitions for the `jsonwebtoken` library. |

### Configuration and New Files

| File/Variable          | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `MONGO_URI` (in `.env`) | The connection string for the MongoDB database.                             |
| `JWT_SECRET` (in `.env`)| A secret key used to sign and verify JSON Web Tokens.                       |
| `src/infra/database/mongoose.ts` | Handles the connection to the MongoDB database.                           |
| `src/app/repositories/models/Studio.ts` | Defines the Mongoose schema and model for a Studio.                       |
| `src/app/repositories/models/User.ts`   | Defines the Mongoose schema and model for a User, including password hashing. |
| `src/app/services/AuthService.ts`     | Contains the business logic for user registration and login.              |
| `src/app/controllers/AuthController.ts` | Handles HTTP requests related to authentication.                          |
| `src/infra/http/routes/auth.routes.ts` | Defines the API routes for authentication.                                |
| `src/shared/middlewares/auth.ts`      | Middleware to authenticate requests using JWT.                            |
| `tests/auth.test.ts`                 | Contains tests for the authentication flow.                               |

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

## New Tools, Dependencies, and Configuration

### New Files

| File/Variable          | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `src/app/repositories/models/Asset.ts`  | Defines the Mongoose schema and model for an Asset.                       |
| `src/app/repositories/AssetRepository.ts` | Abstracts the data access logic for Assets.                               |
| `src/app/services/AssetService.ts`      | Contains the business logic for asset creation and retrieval.             |
| `src/app/controllers/AssetController.ts`  | Handles HTTP requests related to assets.                                  |
| `src/infra/http/routes/asset.routes.ts` | Defines the API routes for assets, protected by authentication.           |
| `tests/asset.service.test.ts`         | Contains service-level tests for the asset business logic.                |