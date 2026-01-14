export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 4000),
  MONGO_URI:
    process.env.NODE_ENV === 'test'
      ? 'mongodb://localhost:27017/animation_studio_test'
      : process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret',
  REDIS_URL:
    process.env.NODE_ENV === 'test'
      ? 'redis://localhost:6379'
      : process.env.REDIS_URL || 'redis://localhost:6379',
};

console.log('--- env.ts debug ---');
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('env.MONGO_URI:', env.MONGO_URI);
console.log('env.REDIS_URL:', env.REDIS_URL);
console.log('--------------------');
