# Test Failures and Resolutions

Throughout the development process, several test failures and TypeScript errors were encountered. These issues were systematically diagnosed and resolved, ensuring the stability and correctness of the application.

## 1. TypeScript `rootDir` Configuration Error

**Failure:**
The TypeScript compiler reported an error indicating that test files located in the `tests/` directory were not part of the `rootDir` defined in `tsconfig.json`. This prevented successful compilation and analysis of the test suite.

**Resolution:**
To resolve this, the `tsconfig.json` file was updated to explicitly exclude the `tests` directory from the TypeScript compilation process. This ensures that the `rootDir` properly covers the application's source files (`src/`) while allowing tests to be managed and compiled separately by Jest with `ts-jest`.

## 2. Missing `.gitignore` Entries

**Failure:**
Critical directories such as `node_modules/` and `dist/` were not being ignored by Git, leading to unnecessary files being tracked in the repository.

**Resolution:**
A `.gitignore` file was created at the project root. The `node_modules/` and `dist/` directories, along with the `.env` file (containing sensitive environment variables), were added to this file to prevent them from being committed to version control.

## 3. Mongoose `pre('save')` Hook Type Error

**Failure:**
An `async` `pre('save')` hook in `src/app/repositories/models/User.ts` generated a TypeScript error (`This expression is not callable.`) related to the `next()` callback. This indicated a type inference issue within the testing environment's TypeScript configuration for Mongoose middleware.

**Resolution:**
The `pre('save')` hook in the `User` model was modified to ensure the `next()` callback is explicitly called. This involved restructuring the conditional logic to always call `next()` at the end of the middleware function, resolving the TypeScript compiler's confusion regarding the `next` function's signature in an asynchronous context.

## 4. `mongoose.connection.db` Undefined in Tests

**Failure:**
The `afterAll` hook in `tests/auth.test.ts` attempted to call `dropDatabase()` on `mongoose.connection.db` without a null check, resulting in a TypeScript error and potential runtime issues if the database connection was not fully established.

**Resolution:**
A conditional check (`if (mongoose.connection.db)`) was added around the `dropDatabase()` call within the `afterAll` hook. This ensures that the operation is only attempted when the database connection object is valid and available.

## 5. `ValidationError` Constructor Argument Mismatch

**Failure:**
When validating requests in `src/infra/http/routes/asset.routes.ts`, the `ValidationError` constructor was invoked with two arguments (`message` and `extractedErrors`). However, the `ValidationError` class initially only accepted a single `message` argument, leading to a TypeScript error.

**Resolution:**
The `src/shared/errors/ValidationError.ts` class was updated. Its constructor was modified to accept an optional `details` object as a second argument, allowing for more comprehensive error reporting that includes specific validation failures.

## 6. Missing `createdBy` Field in Asset Creation

**Failure:**
During the asset creation process via `POST /assets`, the application failed to create assets due to a missing `createdBy` field, which is a required schema property. This manifested as a 500 Internal Server Error in the API tests.

**Resolution:**
The `src/app/controllers/AssetController.ts` file was updated. In the `create` method, the `userId` obtained from `req.user.userId` was explicitly mapped to the `createdBy` field within the asset creation data, ensuring that the required field was correctly populated before persisting the asset.

## 7. Asset Pagination Test Inconsistency

**Failure:**
The `should paginate assets` test in `tests/asset.api.test.ts` failed intermittently, reporting an unexpected number of returned assets (e.g., 8 instead of 10). This was attributed to the asynchronous nature of creating multiple assets within a loop, where subsequent pagination queries were executed before all assets had been fully persisted to the database.

**Resolution:**
The test was modified to use `Promise.all` when creating the batch of assets for pagination testing. This ensures that all asset creation requests are completed and their corresponding documents are saved to the database before the pagination query is executed, guaranteeing consistent and reliable test results.

## 8. `supertest` Promise.all TypeScript Error

**Failure:**
The `should paginate assets` test in `tests/asset.api.test.ts` produced a TypeScript error: `Argument of type 'Test' is not assignable to parameter of type 'never'.` This occurred when passing an array of `supertest` `Test` objects (which are `PromiseLike`) to `Promise.all`, as TypeScript struggled to infer a consistent type for the promises in some contexts.

**Resolution:**
The `assetCreationPromises` array within the `should paginate assets` test was explicitly typed as `Promise<any>[]`. This provided TypeScript with the necessary type information, resolving the assignment error and allowing `Promise.all` to correctly process the `supertest` promises.
