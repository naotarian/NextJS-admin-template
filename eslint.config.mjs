import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    // plugins: ['import', 'unused-imports'],
    plugins: {
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports
    },
    rules: {
      // TypeScript 用の未使用変数ルールを有効化
      '@typescript-eslint/no-unused-vars': [
        'warn', // warning として扱う
        {
          vars: 'all', // 全ての変数をチェック
          args: 'none', // 引数は無視
          ignoreRestSiblings: true // 残りの変数は無視
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      // 'space-before-function-paren': ['warn', 'always'],
      // JavaScript 用のルールは無効化
      'no-unused-vars': 'off',
      // import/order ルールの追加
      'import/order': [
        'warn', // warning として扱う
        {
          groups: [
            'builtin', // node "builtin" module
            'external', // "external" module
            'internal', // "internal" module
            ['parent', 'sibling', 'index'], // 左から「親ディレクトリ」、「兄弟ディレクトリ」、「カレントディレクトリ」
            'object', // "object"-imports
            'type' // "type" imports
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'next',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@mui/material/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '**\\.css',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/component/common/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/component/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/lib/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/hooks/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/app/types/common',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/app/components/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/app/**/types',
              group: 'internal',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['react', 'next/**'],
          'newlines-between': 'always', // グループ間に改行を追加
          alphabetize: {
            order: 'asc', // アルファベット順に並べる
            caseInsensitive: true // 大文字と小文字を区別しない
          }
        }
      ],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      // 未使用の import を削除
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
]

export default eslintConfig
