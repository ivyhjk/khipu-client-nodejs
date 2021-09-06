module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/src/__tests__/tsconfig.json',
      diagnostics: false
    }
  }
};
