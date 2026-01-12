// jest.setup.js

// Set environment variables for tests to connect to Dockerized services
process.env.MONGO_URI = 'mongodb://localhost:27018/animation_studio';
process.env.REDIS_URL = 'redis://localhost:6379';


// Mock the ioredis module
jest.mock("./src/infra/queue/redis", () => {
  const mockRedis = {
    get: jest.fn().mockResolvedValue(null), // By default, cache miss
    set: jest.fn().mockResolvedValue("OK"),
    del: jest.fn().mockResolvedValue(1), // Successfully deleted one key
    scanStream: jest.fn().mockImplementation(() => {
      const EventEmitter = require('events');
      const stream = new EventEmitter();
      // Immediately emit 'end' to simulate no keys found, or an empty scan
      process.nextTick(() => stream.emit('end'));
      return stream;
    }),
    pipeline: jest.fn().mockImplementation(() => ({
      del: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([
        [null, 1] // Mock successful deletion of one key
      ]),
    })),
  };
  return { redis: mockRedis };
});

// Mock AssetCacheService if it's causing issues.
// For now, let's focus on redis directly.
