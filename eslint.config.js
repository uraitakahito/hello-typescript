// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

const testJestConfig = {
    files: ['{test,test-jest}/**/*.test.{ts,tsx}'],
    languageOptions: {
        globals: {
            ...globals.jest,
        },
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
];
