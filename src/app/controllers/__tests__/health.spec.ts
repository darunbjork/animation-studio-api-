import request from 'supertest';
import { app } from '../../../app';

// Mock mongoose specifically for this test file
jest.mock('mongoose', () => {
  // Get the actual mongoose module
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose, // Keep all original exports
    connection: {
      ...actualMongoose.connection, // Keep original connection properties
      readyState: 1, // Override only readyState
    },
  };
});

jest.mock('../../../infra/queue/redis', () => ({
  redis: {
    status: 'ready',
  },
}));

describe('Health check', () => {
  it('returns healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
});
