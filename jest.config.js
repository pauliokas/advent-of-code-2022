module.exports = {
  transform: {
    '\\.[jt]s$': 'babel-jest',
    '^.+\\.txt$': '<rootDir>/jest.readTransformer.js',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};
