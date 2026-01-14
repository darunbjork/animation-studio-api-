module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(tests|src/tests|src)/.*(\\.test|\\.spec)\\.ts$',
  clearMocks: true,
  setupFiles: ['./jest.env.js'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testTimeout: 30000,
};
