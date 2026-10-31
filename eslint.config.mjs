// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  //
  // Global ignores
  //
  {
    ignores: ['dist/**', 'eslint.config.mjs', '.Trash-*/**'],
  },

  //
  // Base configurations
  //
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  //
  // TypeScript parser options
  //
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  //
  // Custom rules
  //
  {
    rules: {
      //
      // ランタイム構文の拡張を禁止 (erasable syntax only)
      // TypeScript などのスーパーセット言語固有の新しいランタイム機能によってJavaScript の構文を拡張することは、次のような理由により、よくないことと考えられています。
      // - 最も重要なのは、ランタイム構文の拡張は、JavaScript の新しいバージョンの新しい構文と競合する可能性があることです。
      // - 構文の拡張により、JavaScript に不慣れなプログラマーにとって、どこまでがJavaScriptで、どこからが別の言語かを理解するのが困難になります。
      // - 構文の拡張により、スーパーセット言語のコードを受け取り、JavaScript を出力するトランスパイラーの複雑さが増加します。
      //

      // Parameter Properties の禁止
      //   https://typescript-eslint.io/rules/parameter-properties/
      '@typescript-eslint/parameter-properties': ['error', { prefer: 'class-property' }],

      // Enums, Export Assignment, Decorators の禁止
      //   no-restricted-syntax: https://eslint.org/docs/latest/rules/no-restricted-syntax
      //   Enums: https://www.typescriptlang.org/docs/handbook/enums.html
      //   Export Assignment: https://www.typescriptlang.org/docs/handbook/modules/reference.html#export--and-import--require
      //   Decorators: https://www.typescriptlang.org/docs/handbook/decorators.html
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'Enums are not allowed. Use a union type or a const object instead.',
        },
        {
          selector: 'TSExportAssignment',
          message: 'Export assignment (`export =`) is not allowed. Use ES module export syntax instead.',
        },
        {
          selector: 'Decorator',
          message: 'Legacy experimental decorators are not allowed.',
        },
        //
        // ES モジュールのファイル拡張子を必須化（相対パスの import / export / import()）
        // TypeScript では .ts ファイルを .js 拡張子でインポートするため、.ts / .tsx は禁止
        //
        {
          selector:
            ':matches(ImportDeclaration, ExportNamedDeclaration, ExportAllDeclaration, ImportExpression)[source.value=/^\\.{1,2}(?:\\/|$)/]:not([source.value=/\\.[A-Za-z0-9]+$/])',
          message: 'Relative imports must include the file extension (e.g. `./foo.js`).',
        },
        {
          selector:
            ':matches(ImportDeclaration, ExportNamedDeclaration, ExportAllDeclaration, ImportExpression)[source.value=/^\\.{1,2}\\/.*\\.tsx?$/]',
          message: 'Import TypeScript files with the `.js` extension, not `.ts` / `.tsx`.',
        },
        //
        // 匿名デフォルトエクスポートを禁止
        //
        {
          selector:
            'ExportDefaultDeclaration > :matches(ArrayExpression, ArrowFunctionExpression, CallExpression, ClassDeclaration:not([id]), FunctionDeclaration:not([id]), Literal, NewExpression, ObjectExpression, TemplateLiteral)',
          message: 'Anonymous default exports are not allowed. Export a named declaration instead.',
        },
      ],

      // type-only import に副作用を持たせない
      // import type { Foo } from '...' を import { type Foo } from '...' と書かせない
      '@typescript-eslint/no-import-type-side-effects': 'error',

      // type import は必ず import type を使う
      '@typescript-eslint/consistent-type-imports': 'error',

      // 命名規則 (Google TypeScript Style Guide ベース)
      '@typescript-eslint/naming-convention': [
        'warn',
        // 変数: camelCase
        {
          selector: 'variable',
          format: ['camelCase'],
        },
        // boolean変数: プレフィックス必須
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['camelCase'],
          prefix: ['can', 'did', 'has', 'is', 'must', 'need', 'should', 'will'],
        },
        // enum/enumMember: UPPER_CASE
        {
          selector: ['enum', 'enumMember'],
          format: ['UPPER_CASE'],
        },
        // function: camelCase
        {
          selector: 'function',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // accessor: camelCase
        {
          selector: 'accessor',
          format: ['camelCase'],
        },
        // parameter: camelCase
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // class: PascalCase
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        // typeAlias: PascalCase
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        // typeParameter: PascalCase
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
        },
      ],
    },
  },

  //
  // Override for config files
  //
  {
    files: ['vite.config.*[cmjt]*s', 'vitest.config.*[cmjt]*s'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
);
