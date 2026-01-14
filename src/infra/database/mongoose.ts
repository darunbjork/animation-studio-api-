import mongoose from 'mongoose';
import { env } from '../../config/env';

export async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('🗄️ MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
