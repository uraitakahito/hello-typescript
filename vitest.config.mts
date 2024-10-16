/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        globals: true,
        include: ['{test,test-vitest}/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    },
});
