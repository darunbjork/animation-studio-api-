import request from 'supertest';
import { app } from '../src/app';
import mongoose from 'mongoose';

describe('Auth Flow', () => {
  beforeAll(async () => {
    console.log('Auth Flow Test: MONGO_URI:', process.env.MONGO_URI);
    console.log('Auth Flow Test: REDIS_URL:', process.env.REDIS_URL);
    await mongoose.connect(process.env.MONGO_URI || '');
  });

  afterAll(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.connection.close();
  });

  it('should register and login user', async () => {
    const register = await request(app).post('/auth/register').send({
      studioId: '507f1f77bcf86cd799439011',
      email: 'artist@test.com',
      password: 'password123',
      role: 'ARTIST',
    });

    expect(register.status).toBe(201);

    const login = await request(app).post('/auth/login').send({
      email: 'artist@test.com',
      password: 'password123',
    });

    expect(login.body.token).toBeDefined();
  });
});
