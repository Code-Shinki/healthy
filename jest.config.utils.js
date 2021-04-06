module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test/utils'],
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
}
