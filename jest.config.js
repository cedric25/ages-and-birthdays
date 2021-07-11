module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  // setupFiles: ['<rootDir>/test/unit/setupFile'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.spec.js'],
  collectCoverage: false,
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.(js)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  resetMocks: true,
}
