import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    build: {
        lib: {
            entry: 'src/preload.ts',
            formats: ['cjs'],
            fileName: () => 'preload.js',
        },
        emptyOutDir: false,
        outDir: '.vite/build',
    },
    resolve: {
        alias: {
            '@': '/src/', // 添加别名
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    }
})
