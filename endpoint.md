# API Endpoints and Features Tested

This document summarizes the API endpoints and key features successfully demonstrated and tested within the animation studio backend system.

## API Endpoints Tested:

### 1. **User Registration** (`/auth/register`)
- **Method**: POST
- **Request**: Created a new `ARTIST` user with studio association.
- **Response**: `201 Created`.
- **Data sent**: email, password, role (`ARTIST`), `studioId`.

### 2. **User Login** (`/auth/login`)
- **Method**: POST
- **Request**: Authenticated with email/password.
- **Response**: `200 OK` with a JWT token.
- **Token obtained**: This token is subsequently used for authenticated requests.

### 3. **Asset Creation** (`/assets`)
- **Method**: POST
- **Headers**: Authorization with Bearer token.
- **Request**: Created a `CHARACTER` type asset with associated metadata.
- **Response**: `201 Created` with the newly created asset's ID (e.g., `69623e551d110ff4e1ce985f`).

### 4. **File Upload** (`/assets/{id}/upload`)
- **Method**: POST via `curl` command.
- **Uploaded**: A `character.fbx` file (simulating a 3D character model).
- **Result**: The file was successfully uploaded and its metadata associated with the specified asset.

## Key Features Demonstrated:

1.  **Full Authentication Flow**: Demonstrated user registration, login, and token-based authorization for securing API access.
2.  **Asset Management**: Implemented the ability to create digital assets and store their associated metadata.
3.  **File Upload System**: Successfully uploaded actual file data (e.g., a 3D model file) to the backend.
4.  **Studio-based Organization**: Ensured all resources (users, assets) are securely tied to a specific studio ID, enabling multi-tenancy.

## Technical Details:
- **Backend**: Node.js/Express server running on `localhost:4000`.
- **Authentication**: JWT (JSON Web Tokens) for stateless, secure authorization.
- **File Storage**: Local filesystem-based storage, with files organized into studio-specific directories.
- **Database**: MongoDB, used for persistent storage of application data and asset metadata.

## Successful File Upload Details:
- **File**: `character.fbx`.
- **Size**: 38 bytes (example size for testing).
- **Storage Path**: `/Users/darunbjork/Documents/backend-projects/animation-studio-api/uploads/60d0fe4f53115d787a7d7f7e/character.fbx` (example path).
- **MIME Type**: `application/octet-stream`.
- **Asset Updated**: The corresponding asset's metadata was updated to include the file path and details.

The system is functioning correctly, with all tested endpoints returning appropriate status codes and the file upload functionality working as designed.
