import { UserModel } from '../src/app/repositories/models/User';
import { StudioModel } from '../src/app/repositories/models/Studio';

describe('Auth Flow', () => {
  afterEach(async () => {
    // Clean up created user and studio
    await UserModel.deleteMany({});
    await StudioModel.deleteMany({});
  });

  it('should register and login user', async () => {
    const uniqueEmail = `artist-${Date.now()}@test.com`;
    const register = await request(app).post('/auth/register').send({
      studioId: '507f1f77bcf86cd799439011',
      email: uniqueEmail,
      password: 'password123',
      role: 'ARTIST',
    });

    expect(register.status).toBe(201);

    const login = await request(app).post('/auth/login').send({
      email: uniqueEmail,
      password: 'password123',
    });

    expect(login.body.token).toBeDefined();
  });
});

