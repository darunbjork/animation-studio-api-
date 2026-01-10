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
