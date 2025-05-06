/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // ajuste para seu paths
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
