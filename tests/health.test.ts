jest.unmock('../src/infra/queue/redis'); // Unmock Redis for this specific test file

import request from 'supertest';
import { app } from '../src/app';
import mongoose from 'mongoose'; // Import mongoose
import { redis } from '../src/infra/queue/redis'; // Import the actual redis instance

describe('Health Check', () => {
  beforeAll(async () => {
    // Make beforeAll async
    console.log('Health Check: MONGO_URI:', process.env.MONGO_URI);
    console.log('Health Check: REDIS_URL:', process.env.REDIS_URL);
    await mongoose.connect(process.env.MONGO_URI || ''); // Connect to MongoDB

    // Explicitly wait for Redis to connect and be ready
    await new Promise<void>((resolve) => {
      if (redis.status === 'ready') {
        resolve();
      } else {
        redis.on('ready', () => resolve());
      }
    });
    console.log('Health Check: Redis is ready.');
  });

  afterAll(async () => {
    // Add afterAll to close connections
    await mongoose.connection.close();
    redis.disconnect(); // Disconnect Redis
  });

  it('should return service health', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
});
