module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  clearMocks: true,
  setupFiles: ['./jest.env.js'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testTimeout: 30000,
};
