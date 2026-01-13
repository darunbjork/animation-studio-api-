import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../repositories/models/User';
import { AppError } from '../../shared/errors/AppError';
import { env } from '../../config/env';

export class AuthService {
  static async register(data: {
    studioId: string;
    email: string;
    password: string;
    role: string;
  }) {
    const userExists = await UserModel.findOne({ email: data.email });
    if (userExists) {
      throw new AppError('User already exists', 409);
    }

    const user = await UserModel.create(data);
    return user;
  }

  static async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new AppError('Invalid credentials', 401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new AppError('Invalid credentials', 401);

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        studioId: user.studioId,
        scopes: [
          'assets:read',
          'assets:write',
          'assets:delete',
          'assets:approve',
        ], // Example scopes
      },
      env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return { token };
  }
}
