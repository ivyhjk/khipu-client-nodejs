import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  verbose: true,

  // roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'ts'],
  testRegex: 'src/__tests__/.*\\.spec\\.ts$',
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/src/__tests__/tsconfig.json'
        // ts-jest configuration goes here
      }
    ]
  }

  // preset: 'ts-jest',
  // testPathIgnorePatterns: [
  //   '/node_modules/',
  //   '/dist/'
  // ]
  // globals: {
  //   'ts-jest': {
  //     tsconfig: '<rootDir>/src/__tests__/tsconfig.json',
  //     diagnostics: false
  //   }
  // }
};

export default config;
