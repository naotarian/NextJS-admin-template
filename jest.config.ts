import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jest-environment-jsdom', // DOM 操作をサポートする環境
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // jest-dom をセットアップ
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './jest.babel.config.js' }], // テスト専用の Babel 設定を使用
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // エイリアスの設定
  },
  testMatch: ['**/__tests__/**/*.test.tsx'], // テストファイルのパターン
  transformIgnorePatterns: ['node_modules/(?!(some-esm-module)/)'], // 必要なら ESM パッケージを除外
  collectCoverage: true, // カバレッジ情報を収集
  coverageDirectory: '<rootDir>/coverage', // カバレッジレポートの保存先
  coverageReporters: ['text', 'lcov'], // カバレッジレポートの形式
};

export default config;
