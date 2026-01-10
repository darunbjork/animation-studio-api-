# Animation Studio API

This project is the backend API for a modern animation studio, built with a focus on enterprise-grade architecture and scalability.

---

## Tools and Dependencies

Here is a brief overview of the tools and dependencies used in this project as of Day 1.

### Runtime Dependencies (`dependencies`)

These are the packages required for the application to run in production.

| Package              | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `express`            | The core web framework for building the API endpoints.                      |
| `dotenv`             | Loads environment variables from a `.env` file into `process.env`.          |
| `helmet`             | Secures the Express app by setting various HTTP headers.                    |
| `express-rate-limit` | Limits repeated requests to public APIs and/or endpoints to prevent abuse.  |

<br>

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

<br>

## Configuration Files

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

🎬 **— MongoDB + Authentication (Senior Backend Mode)**

> *“Database design vs React state for animation data”*

You’re officially moving from **“server exists”** → **“system of record exists.”**
Today is where backend engineering truly begins.

---

##  MENTAL MODEL (VERY IMPORTANT)

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

By the end of today, you will have:

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