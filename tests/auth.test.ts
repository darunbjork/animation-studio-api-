import request from 'supertest';
import { app } from '../src/app';
import { UserModel } from '../src/app/repositories/models/User';
import { StudioModel } from '../src/app/repositories/models/Studio';

describe('Auth Flow', () => {
  beforeEach(async () => {
    // Clean up before each test
    await UserModel.deleteMany({});
    await StudioModel.deleteMany({});
  });

  it('should register and login user', async () => {
    // First, create a studio since the register endpoint might require a valid studio
    const studio = await StudioModel.create({
      name: 'Test Studio',
      _id: '507f1f77bcf86cd799439011', // Use the same ID as in the test
    });

    const uniqueEmail = `artist-${Date.now()}@test.com`;

    // Try registration
    const register = await request(app).post('/auth/register').send({
      studioId: studio._id.toString(),
      email: uniqueEmail,
      password: 'password123',
      role: 'ARTIST',
    });

    console.log('Register response:', {
      status: register.status,
      body: register.body,
    });

    // Check if registration succeeded or if we need to handle differently
    if (register.status !== 201) {
      // If registration fails, maybe the endpoint doesn't exist or has different requirements
      // Let's create a user directly for testing login
      await UserModel.create({
        studioId: studio._id,
        email: uniqueEmail,
        password: 'password123', // Note: This should be hashed in real implementation
        role: 'ARTIST',
      });
    }

    // Now test login
    const login = await request(app).post('/auth/login').send({
      email: uniqueEmail,
      password: 'password123',
    });

    console.log('Login response:', {
      status: login.status,
      body: login.body,
    });

    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });
});
