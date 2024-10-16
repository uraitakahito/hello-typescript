import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src'],
    target: 'es2020',
    format: ['cjs', 'esm'],
    sourcemap: true,
    clean: true,
});
