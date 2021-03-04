module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    // https://github.com/zeit/next.js/issues/8663#issue-490553899
    'ts-jest': {
      tsconfig: '<rootDir>/test/tsconfig.jest.json',
    },
  },
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: './coverage/',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/tests/mocks/styleMock.ts',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/tests/mocks/fileMock.ts',
  },
  moduleDirectories: ['node_modules', 'src'],
}
