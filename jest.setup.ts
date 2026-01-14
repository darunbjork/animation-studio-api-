// jest.setup.js
import mongoose from 'mongoose';
import { connectDatabase } from './src/infra/database/mongoose';
import { redis } from './src/infra/queue/redis';

// Establish connections before any tests run
beforeAll(async () => {
  // Use a longer timeout for the initial connection
  jest.setTimeout(30000);
  await connectDatabase();
});

// Drop the database before each test to ensure a clean state
beforeEach(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
});

// Close connections after all tests have run
afterAll(async () => {
  await mongoose.disconnect();
  await redis.quit();
});

// Mock the bull module for all tests
jest.mock('bull', () => {
  return jest.fn().mockImplementation(() => ({
    add: jest.fn().mockResolvedValue({}),
    process: jest.fn(),
    on: jest.fn(),
  }));
});

// Note: ioredis is not globally mocked here anymore.
// If specific tests need a mocked redis, they can use jest.mock() locally.
// The global setup will use the real redis for connection, and so will the integration tests.
// For unit tests that need a mocked redis, it's better to mock it in the test file itself.
// However, the previous AssetVersionService.spec.ts was passing, so let's see if this change affects it.
// The previous global mock was probably interfering with the integration tests.
