module.exports = {
  clearMocks: true,
  testMatch: ['**/__tests__/**/*.{js,ts}?(x)', '**/*.test.{js,ts}?(x)'],
  modulePathIgnorePatterns: [
    '<rootDir>/packages/*.*/dist/*.*',
    '<rootDir>/packages/*.*/public/*.*',
    '<rootDir>/packages/*.*/.cache/*.*'
  ],
  roots: ['<rootDir>/packages'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!@novnc|@patternfly)'],
  setupFilesAfterEnv: ['<rootDir>/testSetup.ts'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/styleMock.js'
  },
  testEnvironment: 'jsdom'
};
