# CI/CD Pipeline & Automated Quality Gates

This document summarizes the changes made to implement the CI/CD Pipeline and Automated Quality Gates for the project.

## Implemented Features:

1.  **Jest Configuration Update:**
    - `jest.config.js` was updated to use `ts-jest` preset, `node` environment, `testMatch` for `**/*.spec.ts` and `**/*.test.ts` files, and `clearMocks: true`.

2.  **Unit Test for Asset Versioning:**
    - A new unit test file, `src/app/services/__tests__/AssetVersionService.spec.ts`, was created to test the `AssetVersionService`'s ability to correctly create the next version number.

3.  **Bull Mocking for Tests:**
    - A mock for the `bull` package was added to `jest.setup.js` to prevent actual queue operations during testing, ensuring fast and reliable CI.

4.  **Integration Test for Health Check:**
    - A new integration test file, `src/app/controllers/__tests__/health.spec.ts`, was created to verify the health check endpoint, including mocking for `redis` and `mongoose` connections.

5.  **Linting and Formatting Scripts:**
    - `lint` (`eslint . --ext .ts`) and `format` (`prettier --check .`) scripts were added to `package.json`.
    - Relevant development dependencies (`eslint`, `prettier`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-config-prettier`, `eslint-plugin-prettier`) were added to `package.json`.
    - Configuration files `.eslintrc.js` and `.prettierrc.js` were created.

6.  **GitHub Actions CI Pipeline:**
    - A CI workflow file, `.github/workflows/ci.yml`, was created to automate builds, linting, formatting, testing, and type-checking on pull requests and pushes to the `main` branch.

These changes ensure that quality is enforced automatically throughout the development lifecycle, preventing bad code from reaching production.
