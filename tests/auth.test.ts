import request from 'supertest';
import { app } from '../src/app';

describe('Auth Flow', () => {
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
