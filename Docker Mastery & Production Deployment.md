# Docker Mastery & Production Deployment

This document summarizes the key issues encountered and their solutions during the Docker Mastery & Production Deployment phase (Day 16).

## Issues and Solutions:

### 1. GraphQL Dependency Conflict in Docker Build (`ERESOLVE`)

- **Issue**: The `apollo-server-express` package, used for GraphQL, had a peer dependency conflict with `express@5.x` which the project was using. The `npm ci` command within the Docker build process failed because it couldn't resolve this conflict, and `npm ci` does not support `--legacy-peer-deps` or `--force`.
- **Solution**: Research revealed that `apollo-server-express` is deprecated and incompatible with `express@5.x`. The GraphQL setup was migrated to the modern Apollo Server using `@apollo/server` and `@as-integrations/express5`. This involved:
  - Uninstalling `apollo-server-express`.
  - Installing `@apollo/server`, `@as-integrations/express5`, and `graphql`.
  - Refactoring `src/infra/graphql/server.ts` to use the new Apollo Server integration pattern.

### 2. Missing `gql` Import in `typeDefs.ts` after Apollo Upgrade

- **Issue**: After upgrading Apollo Server, the TypeScript compiler failed within the Docker build process with `TS2305: Module '"@apollo/server"' has no exported member 'gql'` in `src/infra/graphql/typeDefs.ts`.
- **Solution**: The `gql` tag function is no longer exported directly from `@apollo/server`. The `graphql-tag` package provides this functionality. The solution involved installing `graphql-tag` and updating the import in `src/infra/graphql/typeDefs.ts` to use `graphql-tag`.

### 3. Missing `dist` Directory for Worker Dockerfiles

- **Issue**: The `Dockerfile.worker` for the `render-worker` and `pipeline-worker` services failed during the Docker build (`COPY dist ./dist: not found`). This occurred because the `dist` directory (containing compiled TypeScript output) was expected to exist but was not being generated within the worker build context.
- **Solution**: The `npm run build` command was executed on the host machine _before_ initiating `docker compose build`. This ensured that the `dist` directory was present in the project root, allowing the `Dockerfile.worker` to successfully copy the compiled application code.

### 4. Persistent Port `27017` Conflict on Host Machine

- **Issue**: `docker compose up` initially failed because `0.0.0.0:27017` was already allocated by a `com.docke` process (a Docker Desktop component, likely a lingering instance of MongoDB or a pre-configured service) on the host machine. This prevented the Docker Compose MongoDB container from binding its default port.
- **Solution**:
  - The MongoDB host port mapping in `docker-compose.yml` was changed from `27017:27017` to `27018:27017`. This made the Dockerized MongoDB accessible on `localhost:27018` from the host.
  - The persistent `com.docke` process occupying `localhost:27017` was identified and killed (requiring multiple attempts and restarts of Docker Desktop) to ensure the port was clear.

### 5. Incorrect `MONGO_URI` / `REDIS_URL` for Docker Inter-Container Communication

- **Issue**: Application containers (`api`, `render-worker`, `pipeline-worker`) failed to connect to `mongo` and `redis` services within the Docker network, reporting `ECONNREFUSED` errors. The `.env` file incorrectly used `localhost` or incorrect ports (e.g., `27018` for Mongo) in `MONGO_URI` and `REDIS_URL` for inter-container communication.
- **Solution**: The `.env` file was corrected to explicitly use the Docker Compose _service names_ (`mongo` and `redis`) and their _internal container ports_ (`27017` for Mongo, `6379` for Redis) in the connection URIs. Specifically:
  - `MONGO_URI=mongodb://mongo:27017/animation_studio`
  - `REDIS_URL=redis://redis:6379`

### 6. `npm test` MongoDB Connection Timeouts

- **Issue**: When running `npm test` on the host machine, tests attempting to connect to MongoDB timed out. This was due to `jest.setup.js` initially trying to connect to a non-existent `mongodb://mongo:27017/animation_studio` (unresolvable on host) or incorrectly to `localhost:27017` (which conflicted with the local persistent MongoDB instance).
- **Solution**: `jest.setup.js` was configured to unconditionally set `process.env.MONGO_URI` to `mongodb://localhost:27018/animation_studio` (targeting the Dockerized MongoDB via its host-mapped port) and `process.env.REDIS_URL` to `redis://localhost:6379`.

### 7. `npm test` `asset.api.test.ts` Validation Failures (400 Bad Request)

- **Issue**: After resolving connectivity, `tests/asset.api.test.ts` still failed with `400 Bad Request` validation errors during `POST /assets` requests. This was due to:
  - Using `type: "VEHICLE"` in test payloads, which is not a valid enum value for the `Asset` model's `type` field (`CHARACTER`, `PROP`, `ENVIRONMENT`).
  - Incomplete `metadata` objects in test payloads (e.g., missing `previewUrl`), which caused implicit Mongoose schema validation failures.
- **Solution**:
  - All instances of `type: "VEHICLE"` were corrected to `type: "PROP"` (a valid enum value) in `tests/asset.api.test.ts`.
  - All asset creation payloads in `tests/asset.api.test.ts` were updated to include complete `metadata` fields (`polyCount`, `format`, `previewUrl`) to satisfy Mongoose schema expectations.
  - Explicit, optional validation rules for the `metadata` field and its sub-fields were added to `createAssetValidator` in `src/infra/http/validators/asset.validators.ts` to prevent `express-validator` from implicitly failing on unspecified metadata.
  - The `asset.api.test.ts` was refactored to remove the global `beforeEach` and `assetId`, making tests self-contained and adding `_id` assertions for robustness.

---

All these issues were successfully resolved, leading to a fully functional and verifiable Dockerized backend with all tests passing.
