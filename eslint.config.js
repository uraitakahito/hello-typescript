// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import vitest from 'eslint-plugin-vitest';

const testJestConfig = {
    files: ['{test,test-jest}/**/*.test.{ts,tsx}'],
    languageOptions: {
        globals: {
            ...globals.jest,
        },
    },
};

const testVitestConfig = {
    files: ['{test,test-vitest}/**/*.test.{ts,tsx}'],
    languageOptions: {
        globals: {
            ...vitest.environments.env.globals,
        },
    },
    plugins: {
        vitest: vitest,
    },
    rules: {
        ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
    },
};

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['{src,test,test-jest}/**/*.{ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            '@typescript-eslint/array-type': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-explicit-any': ['off'],
        },
    },
    {
        ignores: ['.Trash*', 'dist', 'node_modules', '*.js'],
    },
    testJestConfig,
    testVitestConfig,
];
