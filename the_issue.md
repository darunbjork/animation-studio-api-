# Day 18 CI/CD Pipeline & Automated Quality Gates - Issue Resolution Summary

This document summarizes the issues encountered and their resolutions during the setup and debugging of the Day 18 CI/CD pipeline and automated quality gates.

## Initial Problem Statement
The GitHub Actions CI pipeline and local `npm test` runs were failing.

## Root Causes and Resolutions

1.  **MongoDB Connection Issues (localhost:27017 vs localhost:27018 vs mongo:27017):**
    *   **Problem:** Tests failed to connect to MongoDB, reporting `getaddrinfo ENOTFOUND mongo` or `ECONNREFUSED`. This was due to inconsistencies in port mappings between `ci.yml` (localhost:27018), `docker-compose.yml` (initially localhost:27018, then changed to localhost:27017 based on user input, and then back to localhost:27018 to align with CI), and how `MONGO_URI` was resolved. The `dotenv.config()` call in `src/config/env.ts` was also interfering by loading environment variables too early.
    *   **Resolution:**
        *   **`docker-compose.yml`:** Standardized MongoDB exposure to `localhost:27018` to match the CI environment.
        *   **`src/config/env.ts`:** Removed conditional logic for `NODE_ENV === 'test'` and instead made `MONGO_URI` and `REDIS_URL` always rely on `process.env` (with fallbacks). This allowed CI to inject its own `MONGO_URI` (localhost:27018) and local runs to use the `MONGO_URI` passed via the test command or from a `.env` file.
        *   **`package.json`'s `test` script:** Explicitly set `NODE_ENV=test`, `MONGO_URI='mongodb://localhost:27018/animation_studio_test'`, and `REDIS_URL='redis://localhost:6379'` for local test runs. This ensures the correct test environment variables are consistently applied.
        *   **`src/server.ts`:** Moved `dotenv.config()` from `src/config/env.ts` to `src/server.ts` to prevent conflicts with test environment setup.

2.  **Test Environment Setup & Cleanup:**
    *   **Problem:** Tests were timing out or failing due to improper database connection management and lack of test isolation. Individual test files (`tests/auth.test.ts`, `tests/asset.api.test.ts`) were handling their own `beforeAll`/`afterAll` for connections and database dropping.
    *   **Resolution:**
        *   **`jest.setup.ts`:** Implemented global `beforeAll` (connect), `beforeEach` (drop database for isolation), and `afterAll` (disconnect) hooks.
        *   Removed redundant local `beforeAll`/`afterAll` from individual test files.
        *   **`src/infra/database/mongoose.ts`:** Changed `process.exit(1)` to `throw error` to allow Jest to gracefully handle connection failures without crashing the test runner.

3.  **TypeScript Compilation Errors (`tsc --noEmit`):**
    *   **Problem:** `tsc --noEmit` failed with `TS2304: Cannot find name '...'` errors in test files, even though Jest ran successfully. This was due to `tsc` not correctly resolving module imports and type definitions.
    *   **Resolution:**
        *   **`tsconfig.json`:**
            *   Ensured `esModuleInterop: true`, `strict: true`, `skipLibCheck: true`, `forceConsistentCasingInFileNames: true`, `noImplicitAny: true`, `resolveJsonModule: true`, `allowSyntheticDefaultImports: true`, and `types: ["jest", "node"]` were correctly configured.
            *   Refined the `include` array to specifically target only `.ts` files: `["src/**/*", "tests/**/*", "jest.setup.ts"]`.
        *   **`typescript` version:** Downgraded `typescript` to `5.5.3` (a version known to be compatible with `ts-jest` and `@typescript-eslint`).

4.  **Test File Discovery Issues (Jest `testMatch`):**
    *   **Problem:** Jest was not discovering all test files (`tests/auth.test.ts`, `tests/health.test.ts`, `src/tests/asset.api.test.ts`) despite correct `testMatch` patterns.
    *   **Resolution:**
        *   **`jest.config.js`:** Replaced `testMatch` with a more robust `testRegex` pattern: `'(tests|src/tests|src)/.*(\.test|\.spec)\.ts$'`. This ensured all test files were correctly discovered.

5.  **Linting/Formatting Issues:**
    *   **Problem:** The CI pipeline was failing due to Prettier formatting issues in `tsconfig.json`. Unused `mongoose` imports were also causing lint warnings.
    *   **Resolution:**
        *   Ran `npx prettier --write tsconfig.json` to fix formatting.
        *   Removed unused `mongoose` imports from `src/tests/asset.api.test.ts` and `tests/auth.test.ts`.

After these comprehensive fixes, all local tests pass, `tsc --noEmit` runs without errors, and linting/formatting checks are clean. The CI pipeline should now also pass.
