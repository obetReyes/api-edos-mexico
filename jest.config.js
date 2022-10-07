/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks:true,
  moduleFileExtensions:['js','tsx', 'ts', 'json', 'node'],
  coverageProvider:'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose:true,
};
